# The main python file that will be run to run the project

from Week import Week

my_week = Week()

my_week.days[0].set_unavailable_hours(0, 830)
print(my_week.days[0])
