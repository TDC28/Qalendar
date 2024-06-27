from dwave.system import LeapHybridCQMSampler
from Week import Week
from dimod import (
    Binary,
    BinaryQuadraticModel,
    ConstrainedQuadraticModel,
    quicksum,
)


class Qalendar:
    """
    Qalendar is a class that represents a week and provides methods to add your current schedule,
    specify new appointments wanted to be added to the calendar with time preferences, and methods to
    optimize the calendar by sending a job to D-Wave's hybrid solvers.

    Attributes:
        week (Week): A Week object containing methods to add .
        time_step (int): The time step used in the week.
        cqm (ConstrainedQuadraticModel): The quadratic model to optimize.
        variables (dict): Dictionary containing all the variables in the CQM.
    """

    def __init__(self, time_step: int) -> None:
        self.week = Week(time_step)
        self.time_step = time_step

        self.cqm = ConstrainedQuadraticModel()
        self.variables = {}

    def __repr__(self) -> str:
        return str(self.week)

    def __getitem__(self, key):
        return self.week[key]

    def initialize_variables(self, activities: dict):
        """
        Initializes variables for the CQM and stores them in variables dict.
        """
        for day in range(7):
            for time in self[day].get_available_timeslots():
                for activity_id in activities:
                    self.variables[(f"{day}_{time}", activity_id)] = Binary(
                        f"{day}_{time}_{activity_id}"
                    )

    def optimize(self, activities: dict):
        """
        Builds the CQM for the calendar, then runs the CQM and updates the calendar.
        """
        # Initializing variables
        # for day in range(7):
        #     for time in self[day].get_available_timeslots():
        #         for activity_id in activities:
        #             self.variables[(f"{day}_{time}", activity_id)] = Binary(
        #                 f"{day}_{time}_{activity_id}"
        #             )

        # Preferences
        obj = BinaryQuadraticModel(vartype="BINARY")
        choices = {
            "Morning": (0, 1200),
            "Afternoon": (1300, 1700),
            "Evening": (1700, 2100),
            "Night": (2100, 2400),
        }

        for activity_id in activities:
            preference = activities[activity_id]["preference"]

            if preference is None:
                continue

            for day in range(7):
                for time in self[day].get_available_timeslots():
                    if choices[preference][0] <= time < choices[preference][1]:
                        obj += -self.variables[(f"{day}_{time}", activity_id)]

        # 110, 011, 111 patterns preferred 
        for day in range(7):
            for time in self[day].get_available_timeslots():
                ntime = self.get_next_time(time)
                nntime = self.get_next_time(ntime)

                if (
                    ntime not in self[day].get_available_timeslots()
                    or nntime not in self[day].get_available_timeslots()
                ):
                    continue
                for activity_id in activities:
                    obj += (
                        -self.variables[(f"{day}_{time}", activity_id)]
                        * self.variables[(f"{day}_{ntime}", activity_id)]
                        - self.variables[(f"{day}_{ntime}", activity_id)]
                        * self.variables[(f"{day}_{nntime}", activity_id)]
                    )

        self.cqm.set_objective(obj)

        # No duplicate booking and limit how long can be spent doing the same activity  TODO: Make this customizable for each activity
        # Maximum 5 hours
        k = 5 * int(60 / (4 * self.time_step))
        for day in range(7):
            for time in self[day].get_available_timeslots():
                self.cqm.add_constraint(
                    quicksum(
                        self.variables[(f"{day}_{time}", activity_id)]
                        for activity_id in activities
                    )
                    <= 1,
                    label=f"No double booking {day} {time}",
                )

                add_constraints = True
                i = 0
                next_time = time

                while i < k:
                    if (
                        self.get_next_time(next_time)
                        not in self[day].get_available_timeslots()
                    ):
                        add_constraints = False
                        break

                    i += 1
                    next_time = self.get_next_time(next_time)

                if add_constraints:
                    for activity_id in activities:
                        self.cqm.add_constraint(
                            quicksum(
                                self.variables[
                                    (
                                        f"{day}_{self.get_ith_future_time(time, i)}",
                                        activity_id,
                                    )
                                ]
                                for i in range(k)
                            )
                            <= k - 1,
                            label=f"too_many_consecutive,{activity_id},{day}_{time}",
                        )

        # Time constraints
        for activity_id in activities:
            self.cqm.add_constraint(
                quicksum(
                    self.variables[(f"{day}_{time}", activity_id)]
                    for day in range(7)
                    for time in self[day].get_available_timeslots()
                )
                == activities[activity_id]["time_constraint"]
                * int(60 / self.time_step),
                label=f"{activities[activity_id]['name']} time constraint",
            )

        # Run the CQM and update calendar
        sampler = LeapHybridCQMSampler()
        sampleset = sampler.sample_cqm(self.cqm).filter(lambda d: d.is_feasible)

        keys = [key for key, value in sampleset.first.sample.items() if value == 1]

        for key in keys:
            day, time, activity_id = map(int, key.split("_"))
            self[day].book_timeslot(activities[activity_id]["name"], time)

        return None

    def get_next_time(self, time: int) -> int:
        hours = time // 100
        minutes = time % 100 + self.time_step

        if minutes >= 60:
            minutes -= 60
            hours += 1

        return (hours * 100 + minutes) % 2400

    def get_ith_future_time(self, time: int, i: int) -> int:
        while i > 0:
            time = self.get_next_time(time)
            i -= 1

        return time
