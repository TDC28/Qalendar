from Qalendar import Qalendar
from Day import Day
from Week import Week

import requests
import os
import sys
import time

#Define the base URL for the API (check myapp/urls.py)
BASE_URL_EVENTS = 'http://127.0.0.1:8000/events/'
BASE_URL_ACTIVITIES = 'http://127.0.0.1:8000/activities/'

def fetch_events():
    try:
        response = requests.get(BASE_URL_EVENTS)
        response.raise_for_status()  # Raise an error for bad status codes
        events = response.json()  # Convert the JSON response to a Python list/dictionary
        return events
    except requests.exceptions.RequestException as e:
        print(f"Error fetching events: {e}")
        return []
    
def fetch_activities():
    try:
        response = requests.get(BASE_URL_ACTIVITIES)
        response.raise_for_status()  # Raise an error for bad status codes
        activities = response.json()  # Convert the JSON response to a Python list/dictionary
        return activities
    except requests.exceptions.RequestException as e:
        print(f"Error fetching activities: {e}")
        return []

def generate_schedule():
    # return "Hello, World!"
    # Fetch events from the REST API
    events = fetch_events()
    activities = fetch_activities()
    # Process the events
    fixed_activities = []
    flexible_activities = []
    activities_dict = {}

    for event in events:
        title = event['title']
        day = event['day']
        start_time = event['start_time']
        end_time = event['end_time']

        # Determine whether the event is fixed or flexible based on your criteria
        # For example, you can use the description or another field to decide
        
        #if "fixed" in description.lower():
        fixed_activities.append({
            'title': title,
            'day': day,
            'start_time': start_time,
            'end_time': end_time,
        })
    

    for activity in activities:
        title = activity['title']
        time_constraint = activity['time_constraint']
        preference = activity['preference']

        # Determine whether the activity is fixed or flexible based on your criteria
        # For example, you can use the description or another field to decide
        # if "flexible" in description.lower():
        flexible_activities.append({
            'title': title,
            'time_constraint': time_constraint,
            'preference': preference,

        })
    # Example initialization of your classes (you need to adjust this based on your actual implementation)
    qalendar = Qalendar(time_step=15)

    # Add fixed activities
    for activity in fixed_activities:
        qalendar[activity['day']].add_activity(activity['title'], int(activity['start_time']), int(activity['end_time']))

    for i in range(len(flexible_activities)):
        activities_dict[i] = {"name": flexible_activities[i]['title'], "time_constraint": float(flexible_activities[i]['time_constraint']), "preference": flexible_activities[i]['preference']}
    # Add flexible activities
    # for activity in flexible_activities:
    #     qalendar.add_flexible_activity(activity['title'], activity['description'])  # Modify this based on your Qalendar class implementation

    for day_id in range(7):
        qalendar[day_id].add_activity("Sleep", 0, 800)
        qalendar[day_id].add_activity("Breakfast", 800, 830)
        qalendar[day_id].add_activity("Lunch", 1200, 1300)
        qalendar[day_id].add_activity("Dinner", 1800, 1900)
        # qalendar[day_id].add_activity("Leetcode", 2000, 2045)


    # activities = {
    #     0: {"name": "Math Homework", "time_constraint": 8, "preference": None},
    #     1: {"name": "CS Homework", "time_constraint": 10, "preference": "Afternoon"},
    #     2: {"name": "Phys Homework", "time_constraint": 12, "preference": None},
    #     3: {"name": "Bike", "time_constraint": 6, "preference": "Evening"},
    #     4: {"name": "Gym", "time_constraint": 3, "preference": None},
    #     5: {"name": "Earth Homework", "time_constraint": 7, "preference": None},
    # }    
   

    #Run optimizer

    qalendar.initialize_variables(activities=activities_dict)
    qalendar.optimize(activities=activities_dict)

    # Return the string representation of the schedule
    # return repr(qalendar)
    return qalendar

if __name__ == "__main__":
    # make sure to print schedule
    schedule = generate_schedule()
    print(schedule)




    # events = fetch_events()
    # print(events)





