from Qalendar import Qalendar

week = Qalendar(time_step=15) # 15 Minute intervals

# Add regular appointments/activities using 24 hour time format i.e. 800 = 8:00 AM, 1330 = 1:30 PM
for day in range(7):
    week[day].add_activity(activity="Sleep", start=0, end=800)
    week[day].add_activity(activity="Breakfast", start=800, end=830)
    week[day].add_activity(activity="Lunch", start=1200, end=1300)
    week[day].add_activity(activity="Dinner", start=1800, end=1900)
    week[day].add_activity(activity="Leetcode", start=2000, end=2045)

# Other appointments
week[1].add_activity("Math Lecture", 1000, 1100)
week[1].add_activity("CS Lecture", 1400, 1500)
week[2].add_activity("Phys Lecture", 1400, 1600)
week[3].add_activity("Math Lecture", 1000, 1100)
week[3].add_activity("CS Lecture", 1400, 1500)
week[4].add_activity("Phys Lecture", 1400, 1600)
week[5].add_activity("Math Lecture", 1000, 1100)
week[5].add_activity("CS Lecture", 1400, 1500)

# Other activities and preferences
activities = {
    0: {"name": "Math Homework", "time_constraint": 8, "preference": None}, # 8 hours of Math homework with no preference
    1: {"name": "CS Homework", "time_constraint": 10, "preference": "Afternoon"},
    2: {"name": "Phys Homework", "time_constraint": 12, "preference": None},
    3: {"name": "Bike", "time_constraint": 6, "preference": "Evening"},
    4: {"name": "Gym", "time_constraint": 3, "preference": None},
    5: {"name": "Earth Sci Homework", "time_constraint": 7, "preference": None},
}

week.initialize_variables(activities)
week.optimize(activities)
print(week) # Prints the output calendar
