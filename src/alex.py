from dimod import DiscreteQuadraticModel
from dwave.system import LeapHybridDQMSampler
from Week import Week

# One day example
week = Week(time_step=15)

# Add some stuff to the calendar
week[0].add_activity("Sleep", 0, 800)
week[0].add_activity("Breakfast", 800, 900)
week[0].add_activity("Lunch", 1200, 1300)
week[0].add_activity("Supper", 1700, 1800)
week[0].add_activity("Leetcode", 1930, 2000)

dqm = DiscreteQuadraticModel()
activities = ["Math", "CS", "Physics", "Earth"]
variables = {}

for time in week[0].get_available_timeslots():
    variable = dqm.add_variable(
        len(activities) + 1, label=f"0_{time}"
    )  # Labels of form "day_time"

# I want 1 hour of each activity - This block will eventually need to be implemented into a function because this will be very important
for activity_index in range(len(activities)):
    terms = []
    for time in week[0].get_available_timeslots():
        terms.append((f"0_{time}", activity_index + 1, 1)) # the + 1 for activity index is to reserve 0 for empty. Example, an activity index of 2 would represent Physics and not CS. See line 47.

    dqm.add_linear_equality_constraint(
        terms=terms,
        lagrange_multiplier=2,
        constant=-int(60 / week[0].time_step),
    )


sampler = LeapHybridDQMSampler()
sampleset = sampler.sample_dqm(dqm)

print(sampleset.first)

for key in sampleset.first.sample.items():
    time = int(key[0][2:])
    activity = int(key[1]) # if activity = 0, leave timeslot empty

    if activity != 0:
        week[0].book_timeslot(activities[activity-1], time) # -1 to shift back to regular activities index. See line 28.

print(week[0])


# for i in range(2):
#     for time in week[i].get_timeslots():
#         if 0 <= time < 1830:
#             week[i].book_timeslot("Sleep", time)
#
# for i in range(2):
#     for time in week[i].get_timeslots():
#         if week[i].get_activity(time) == "Empty":
#             _ = dqm.add_variable(len(activities), label=f"{i}_{time}")
#
# dqm.set_quadratic("0_1900", "0_1920", {(0, 2): -1.5}) # Corresponds to preference in doing Math at 19:00 and then Gym at 19:20
# print(dqm.get_quadratic("0_1900", "0_1920", array=True))
#
#
# print(dqm.variables)
# print(week)
#
# sampleset = sampler.sample_dqm(dqm)
# print(sampleset)
