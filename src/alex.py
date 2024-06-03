from dimod import DiscreteQuadraticModel 
from dwave.system import LeapHybridDQMSampler
from Week import Week

dqm = DiscreteQuadraticModel()
week = Week(time_step=20)
activities = ["Math", "Physics", "Gym", "Bike"]
sampler = LeapHybridDQMSampler()

for day in range(7):
    week[day].add_activity("Math", 1400, 1800)

print(week)


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
