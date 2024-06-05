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

# TODO: Make this into a dict in Qalendar 
activities = ["Math Homework", "CS Homework", "Phys Homework", "Bike", "Gym"]
calendar.activities = activities
calendar.prepare_dqm() # NOTE: Run this everytime after the manual calendar entries are specified

calendar.add_time_preference("CS Homework", "Afternoon") # Preferably doing CS in the afternoons
calendar.add_time_preference("Bike", "Evening")

calendar.add_time_constraint("Bike", 5) # 4 hours of bike
calendar.add_time_constraint("Gym", 3)
calendar.add_time_constraint("CS Homework", 9)
calendar.add_time_constraint("Math Homework", 7)
calendar.add_time_constraint("Phys Homework", 10)

# TODO: Implement this into a function in Qalendar
sampleset = sampler.sample_dqm(calendar.dqm)

# TODO: Implement this into a function in Qalendar
# Translates DQM results into calendar
for key in sampleset.first.sample.items():
    time = int(key[0][2:])
    day = int(key[0][0])
    activity_id = int(key[1])

    if activity_id != 0:
        calendar[day].book_timeslot(calendar.activities[activity_id-1], time)

print(sampleset.first)
print(calendar)

