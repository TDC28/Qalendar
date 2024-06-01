# The main python file that will be run to run the project

from Week import Week

my_week = Week(15)

# Booking timeslots
for i in range(7):
    for time in my_week[i].get_timeslots():
        if 0 <= time < 830:
            my_week[i].book_timeslot("Sleep", time)

print(my_week)
help(my_week[0])
