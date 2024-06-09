from Qalendar import Qalendar

week = Qalendar(time_step=15)

for day_id in range(7):
    week[day_id].add_activity("Sleep", 0, 800)
    week[day_id].add_activity("Breakfast", 800, 830)
    week[day_id].add_activity("Lunch", 1200, 1300)
    week[day_id].add_activity("Dinner", 1800, 1900)
    week[day_id].add_activity("Leetcode", 2000, 2045)

# Other activities
week[1].add_activity("Math Lecture", 1000, 1100)
week[1].add_activity("CS Lecture", 1400, 1500)
week[2].add_activity("Phys Lecture", 1400, 1600)
week[3].add_activity("Math Lecture", 1000, 1100)
week[3].add_activity("CS Lecture", 1400, 1500)
week[4].add_activity("Phys Lecture", 1400, 1600)
week[5].add_activity("Math Lecture", 1000, 1100)
week[5].add_activity("CS Lecture", 1400, 1500)


activities = {
    0: {"name": "Math Homework", "time_constraint": 8, "preference": None},
    1: {"name": "CS Homework", "time_constraint": 10, "preference": "Afternoon"},
    2: {"name": "Phys Homework", "time_constraint": 12, "preference": None},
    3: {"name": "Bike", "time_constraint": 6, "preference": "Evening"},
    4: {"name": "Gym", "time_constraint": 3, "preference": None},
    5: {"name": "Earth Homework", "time_constraint": 7, "preference": None},
}

week.initialize_variables(activities)
week.optimize(activities)
print(week)
