from dimod import ConstrainedQuadraticModel, BinaryQuadraticModel, Binary, quicksum
from dwave.system import LeapHybridCQMSampler
from Qalendar import Qalendar

week = Qalendar(15)
sampler = LeapHybridCQMSampler()

# Predefined activities
predefined_activities = [
    ("Sleep", 0, 800),
    ("Breakfast", 800, 900),
    ("Lunch", 1200, 1300),
    ("Dinner", 1800, 1900),
    ("Leetcode", 2000, 2045),
]

# Add predefined activities for all days
for day_id in range(7):
    for activity, start, end in predefined_activities:
        week[day_id].add_activity(activity, start, end)

# Other activities
week[1].add_activity("Math Lecture", 1000, 1100)
week[1].add_activity("CS Lecture", 1400, 1500)
week[2].add_activity("Phys Lecture", 1400, 1600)
week[3].add_activity("Math Lecture", 1000, 1100)
week[3].add_activity("CS Lecture", 1400, 1500)
week[4].add_activity("Phys Lecture", 1400, 1600)
week[5].add_activity("Math Lecture", 1000, 1100)
week[5].add_activity("CS Lecture", 1400, 1500)

# New activities to schedule
activities = ["Math Homework", "CS Homework", "Phys Homework", "Bike", "Gym"]

x = {}
cqm = ConstrainedQuadraticModel()
obj = BinaryQuadraticModel(vartype="BINARY")

# Initiating variables
for day in range(7):
    for time in week[day].get_available_timeslots():
        for activity_id in range(len(activities)):
            x[(f"{day}_{time}", activity_id)] = Binary(f"{day}_{time}_{activity_id}")

# Preferences
for day in range(7):
    for time in week[day].get_available_timeslots():
        if 1200 <= time < 1800:
            obj += -x[f"{day}_{time}", 1]  # CS afternoon
        if 1800 <= time < 2400:
            obj += -x[f"{day}_{time}", 3]  # Bike evening

cqm.set_objective(obj)

# No double booking
for day in range(7):
    for time in week[day].get_available_timeslots():
        cqm.add_constraint(
            quicksum(
                x[(f"{day}_{time}", activity_id)]
                for activity_id in range(len(activities))
            )
            <= 1,
            label=f"No double booking {day} {time}",
        )

time_constraints = {
    "Math Homework": 7,
    "CS Homework": 9,
    "Phys Homework": 10,
    "Bike": 5,
    "Gym": 3,
}

for activity_id, (activity, time_constraint) in enumerate(time_constraints.items()):
    cqm.add_constraint(
        quicksum(
            x[(f"{day}_{time}", activity_id)]
            for day in range(7)
            for time in week[day].get_available_timeslots()
        )
        == time_constraint * int(60 / week.time_step),
        label=f"{activity} time constraint",
    )

sampleset = sampler.sample_cqm(cqm)


def fill_calendar(sampleset):
    keys = [key for key, value in sampleset.first.sample.items() if value == 1]

    for key in keys:
        day, time, activity = map(int, key.split("_"))
        week[day].book_timeslot(activities[activity], time)


print(sampleset)
fill_calendar(sampleset)
print(week)

# from dwave.system import LeapHybridDQMSampler # Eventually this should move in with the main class maybe
# from Qalendar import Qalendar
#
# sampler = LeapHybridDQMSampler()
# calendar = Qalendar(15)
#
# # Book regular activities in the calendar manually
# for day_id in range(7):
#     calendar[day_id].add_activity("Sleep", 0, 800)
#     calendar[day_id].add_activity("Breakfast", 800, 900)
#     calendar[day_id].add_activity("Lunch", 1200, 1300)
#     calendar[day_id].add_activity("Dinner", 1800, 1900)
#     calendar[day_id].add_activity("Leetcode", 2000, 2045)
#
# calendar[1].add_activity("Math Lecture", 1000, 1100)
# calendar[1].add_activity("CS Lecture", 1400, 1500)
# calendar[2].add_activity("Phys Lecture", 1400, 1600)
# calendar[3].add_activity("Math Lecture", 1000, 1100)
# calendar[3].add_activity("CS Lecture", 1400, 1500)
# calendar[4].add_activity("Phys Lecture", 1400, 1600)
# calendar[5].add_activity("Math Lecture", 1000, 1100)
# calendar[5].add_activity("CS Lecture", 1400, 1500)
#
# # TODO: Make this into a dict in Qalendar
# activities = ["Math Homework", "CS Homework", "Phys Homework", "Bike", "Gym"]
# calendar.activities = activities
# calendar.prepare_dqm() # NOTE: Run this everytime after the manual calendar entries are specified
#
# calendar.add_time_preference("CS Homework", "Afternoon") # Preferably doing CS in the afternoons
# calendar.add_time_preference("Bike", "Evening")
#
# calendar.add_time_constraint("Bike", 5) # 4 hours of bike
# calendar.add_time_constraint("Gym", 3)
# calendar.add_time_constraint("CS Homework", 9)
# calendar.add_time_constraint("Math Homework", 7)
# calendar.add_time_constraint("Phys Homework", 10)
#
# # TODO: Implement this into a function in Qalendar
# sampleset = sampler.sample_dqm(calendar.dqm)
#
# # New function that processes results, may rename later but it does the job right now
# calendar.process_results(sampleset)
#
#
# print(sampleset.first)
# print(calendar)
#
