# The main python file that will be run to run the project

from Week import Week
from dimod import DiscreteQuadraticModel, ExactDQMSolver
from dwave.system import LeapHybridDQMSampler

# TODO: Define functions that initialize week and DQM
# TODO: Define a "Good" calendar/how do we build an objective function for a calendar?
# TODO: Define functions that add constraints to the DQM

def get_sampler():
    sampler = ExactDQMSolver() # CPU
    # sampler = LeapHybridDQMSampler() # QPU

    return sampler


if __name__ == "__main__":

    sampler = get_sampler()
    week = Week(time_step=15)

    # Booking timeslots
    for i in range(7):
        for time in week[i].get_timeslots():
            if 0 <= time < 830:
                week[i].book_timeslot("Sleep", time)

    week[1].book_timeslot("MATH 235", 1030)
    week[1].book_timeslot("MATH 235", 1045)
    week[1].book_timeslot("MATH 235", 1100)
    week[3].book_timeslot("MATH 235", 1030)
    week[3].book_timeslot("MATH 235", 1045)
    week[3].book_timeslot("MATH 235", 1100)
    week[5].book_timeslot("MATH 235", 1030)
    week[5].book_timeslot("MATH 235", 1045)
    week[5].book_timeslot("MATH 235", 1100)

    print(week[1].get_next_time(2345))

    print(week)
