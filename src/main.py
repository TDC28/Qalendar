# NOTE: THIS CODE IS BROKEN

from dwave.system import LeapHybridDQMSampler # Eventually this should move in with the main class maybe
from Qalendar import Qalendar

sampler = LeapHybridDQMSampler()
calendar = Qalendar(15)

# Book regular activities in the calendar manually
for day_id in range(7):
    calendar[day_id].add_activity("Sleep", 0, 800)
    calendar[day_id].add_activity("Breakfast", 800, 900)
    calendar[day_id].add_activity("Lunch", 1200, 1300)
    calendar[day_id].add_activity("Dinner", 1800, 1900)
    calendar[day_id].add_activity("Leetcode", 2000, 2045)

calendar[1].add_activity("Math Lecture", 1000, 1100)
calendar[1].add_activity("CS Lecture", 1400, 1500)
calendar[2].add_activity("Phys Lecture", 1400, 1600)
calendar[3].add_activity("Math Lecture", 1000, 1100)
calendar[3].add_activity("CS Lecture", 1400, 1500)
calendar[4].add_activity("Phys Lecture", 1400, 1600)
calendar[5].add_activity("Math Lecture", 1000, 1100)
calendar[5].add_activity("CS Lecture", 1400, 1500)

activities = ["Math Homework", "CS Homework", "Phys Homework", "Bike", "Gym"]
calendar.activities = activities
calendar.prepare_dqm()

# Penalizing small groups of activities - this is bad do not do this
for activity_id in range(1, len(activities)+1):
    for day_id in range(7):
        timeslots = calendar[day_id].get_available_timeslots()

        for time in timeslots:
            next_time = calendar.get_next_time(time)
            if next_time in timeslots:
                calendar.dqm.set_quadratic_case(f"{day_id}_{time}", activity_id, f"{day_id}_{next_time}", activity_id, -2)

            else:
                calendar.dqm.set_linear_case(f"{day_id}_{time}", activity_id, 1)

calendar.add_time_preference("CS Homework", "Afternoon") # Preferably doing CS in the afternoons
calendar.add_time_preference("Bike", "Evening")

calendar.add_time_constraint("Bike", 5) # 5 hours of bike
calendar.add_time_constraint("Gym", 3)
calendar.add_time_constraint("CS Homework", 9)
calendar.add_time_constraint("Math Homework", 7)
calendar.add_time_constraint("Phys Homework", 10)

sampleset = sampler.sample_dqm(calendar.dqm)

calendar.process_results(sampleset)


print(sampleset.first)
print(calendar)

