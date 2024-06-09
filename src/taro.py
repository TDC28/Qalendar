from dimod import quicksum
from Qalendar import Qalendar

week = Qalendar(time_step=15)  # Keep this number lower than 60



#Max consecutive sessions of one activity.
#No k consecutive timesteps of one activity.

k = 5 #Max consective sessions of one activity
time_step = 15
# for e in employees:
#     for s in range(len(shifts) - k + 1):
#         cqm.add_constraint(
#             quicksum([x[e, shifts[s + i]] for i in range(k)]) <= k - 1,
#             label=f"too_many_consecutive,{e},{shifts[s]}",
#         )
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
    0: {"name": "Math Homework", "time_constraint": 7, "preference": None},
    1: {"name": "CS Homework", "time_constraint": 9, "preference": "Afternoon"},
    2: {"name": "Phys Homework", "time_constraint": 10, "preference": None},
    3: {"name": "Bike", "time_constraint": 5, "preference": "Evening"},
    4: {"name": "Gym", "time_constraint": 3, "preference": None},
}

week.initialize_variables(activities)
week.optimize(activities)
for day in range(7):
    for time in week[day].get_available_timeslots():


        if (
            time not in week[day].get_available_timeslots()
        ):
            continue
        add_contraints = True
        i = 0
        next_time = time
        
        while i < k:
            if week.get_next_time(next_time) not in week[day].get_available_timeslots():
                add_contraints = False
                break
        
            i += 1
            next_time = week.get_next_time(next_time)
        if add_contraints:
            for activity_id in activities:
                week.cqm.add_constraint(
                    quicksum(
                        week.variables[(f"{day}_{week.get_next_time(time)}", activity_id)] for j in range(0, i))
                        <= k - 1,
                        label=f"too_many_consecutive,{activity_id},{day}_{time}"
                    )
print(week)