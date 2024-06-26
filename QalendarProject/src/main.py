from Qalendar import Qalendar
from Day import Day
from Week import Week

import requests
import os
import sys

#Define the base URL for the API (check myapp/urls.py)
BASE_URL = 'http://127.0.0.1:8000/events/'

def fetch_events():
    try:
        response = requests.get(BASE_URL)
        response.raise_for_status()  # Raise an error for bad status codes
        events = response.json()  # Convert the JSON response to a Python list/dictionary
        return events
    except requests.exceptions.RequestException as e:
        print(f"Error fetching events: {e}")
        return []
    
def generate_schedule():
    # Fetch events from the REST API
    events = fetch_events()
    
    
def generate_schedule():
    # return "Hello, World!"
    # Fetch events from the REST API
    events = fetch_events()

    # Process the events
    fixed_activities = []
    flexible_activities = []

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
        # else:
        #     flexible_activities.append({
        #         'title': title,
        #         'date': date,
        #         'description': description
        #     })

    # Example initialization of your classes (you need to adjust this based on your actual implementation)
    qalendar = Qalendar(time_step=15)

    # Add fixed activities
    for activity in fixed_activities:
        qalendar[activity['day']].add_activity(activity['title'], int(activity['start_time']), int(activity['end_time']))

    # Add flexible activities
    # for activity in flexible_activities:
    #     qalendar.add_flexible_activity(activity['title'], activity['description'])  # Modify this based on your Qalendar class implementation
    activities = {
        0: {"name": "Math Homework", "time_constraint": 8, "preference": None},
        1: {"name": "CS Homework", "time_constraint": 10, "preference": "Afternoon"},
        2: {"name": "Phys Homework", "time_constraint": 12, "preference": None},
        3: {"name": "Bike", "time_constraint": 6, "preference": "Evening"},
        4: {"name": "Gym", "time_constraint": 3, "preference": None},
        5: {"name": "Earth Homework", "time_constraint": 7, "preference": None},
    }    
    # Run your optimizer
    qalendar.initialize_variables(activities)
    qalendar.optimize(activities)

    # Return the string representation of the schedule
    return repr(qalendar)

if __name__ == "__main__":
    # make sure to print schedule
    schedule = generate_schedule()
    print(schedule)





