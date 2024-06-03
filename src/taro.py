from dimod import DiscreteQuadraticModel, ExactDQMSolver 
from dwave.system import LeapHybridDQMSampler
from Week import Week

from dimod import Sampler



dqm = DiscreteQuadraticModel()
sampler = ExactDQMSolver
week = Week(time_step=20)
activities = ["Math", "Physics", "Gym", "Bike"]

for i in range(2):
    for time in week[i].get_timeslots():
        if 0 <= time < 2100 or 2300 < time:
            week[i].book_timeslot("Sleep", time)

for i in range(2):
    for time in week[i].get_timeslots():
        if week[i].get_activity(time) == "Empty":
            _ = dqm.add_variable(len(activities), label=f"{i}_{time}")

dqm.set_quadratic("0_2120", "0_2200", {(0, 2): -1.5}) # Corresponds to preference in doing Math at 21:30 and then Gym at 22:00
print(dqm.get_quadratic("0_2120", "0_2200", array=True))


print(dqm.variables)
print(week)


#WARNING: Do not run on CPU when there are more than 10 variables. With i variables the possibilities are summmation e^i. source: Trust me
# sampleset = sampler.sample_dqm(sampler, dqm)
# print(sampleset)