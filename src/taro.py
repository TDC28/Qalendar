from dimod import DiscreteQuadraticModel, ExactDQMSolver 
from dwave.system import LeapHybridDQMSampler
from Week import Week
from Qalendar import Qalendar




# dqm = DiscreteQuadraticModel()
# sampler = ExactDQMSolver
# week = Week(time_step=20)
# activities = ["Math", "Physics", "Gym", "Bike"]

# for i in range(2):
#     for time in week[i].get_timeslots():
#         if 0 <= time < 2200 or 2300 < time:
#             week[i].book_timeslot("Sleep", time)

# for i in range(2):
#     for time in week[i].get_timeslots():
#         if week[i].get_activity(time) == "Empty":
#             _ = dqm.add_variable(len(activities), label=f"{i}_{time}")

# dqm.set_quadratic("0_2240", "0_2300", {(0, 2): -1.5}) # Corresponds to preference in doing Math at 21:30 and then Gym at 22:00
# print(dqm.get_quadratic("0_2240", "0_2300", array=True))


# print(dqm.variables)
# print(week)


# #WARNING: Do not run on CPU when there are more than 10 variables. With i variables the possibilities are summmation e^i. source: Trust me
# sampleset = sampler.sample_dqm(sampler, dqm)
# print(sampleset)
sampler = LeapHybridDQMSampler()
week = Week(time_step=15)

week[0].add_activity("Sleep", 0, 800)
week[0].add_activity("Breakfast", 830, 900)
week[0].add_activity("Lunch", 1200, 1300)
week[0].add_activity("Supper", 1700, 1800)
week[0].add_activity("Leetcode", 1930, 2000)

dqm = DiscreteQuadraticModel()
activities = ["Math", "CS", "Physics"]


for time in week[0].get_available_timeslots():
    variable = dqm.add_variable(
        len(activities) + 1, label=f"0_{time}"
    )  # Labels of form "day_time"

for time in week[0].get_available_timeslots():
    if time >= 1800:
        dqm.set_linear_case(f"0_{time}", case=2, bias=-5)

for activity_index in range(len(activities)):
    terms = []
    for time in week[0].get_available_timeslots():
        terms.append(
            (f"0_{time}", activity_index + 1, 1)
        )  # the + 1 for activity index is to reserve 0 for empty. Example, an activity index of 2 would represent Physics and not CS. See line 47.

    dqm.add_linear_equality_constraint(
        terms=terms,
        lagrange_multiplier=2,
        constant=-int(60 / week[0].time_step),
    )


print(week[0].get_available_timeslots())
sampler = LeapHybridDQMSampler()
sampleset = sampler.sample_dqm(dqm)

for key in sampleset.first.sample.items():
    # print(key)
    time = int(key[0][2:])
    activity = int(key[1])  # if activity = 0, leave timeslot empty

    if activity != 0:
        week[0].book_timeslot(
            activities[activity - 1], time
        )  # -1 to shift back to regular activities index. See line 28.







#Max consecutive sessions of one activity.
#No k consecutive timesteps of one activity.

k = 5 #Max consective sessions of one activity

for e in employees:
    for s in range(len(shifts) - k + 1):
        cqm.add_constraint(
            quicksum([x[e, shifts[s + i]] for i in range(k)]) <= k - 1,
            label=f"too_many_consecutive,{e},{shifts[s]}",
        )