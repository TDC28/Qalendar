from django.http import JsonResponse
from django.shortcuts import render, HttpResponse
from django.http import JsonResponse
from rest_framework import generics

from .models import Activity, Event
from .serializers import EventSerializer

import subprocess
import os
import sys
import logging


# Create your views here.
def home(request):
    return render(request, "home.html")



class EventListCreate(generics.ListCreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

class EventDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

def schedule_view(request):
    events = Event.objects.all()  # Fetch events from the database
    event_list = [{
        'title': event.title,
        'day': event.day,
        'start_time': event.start_time,
        'end_time': event.end_time
    } for event in events]
    return JsonResponse(event_list, safe=False)

# Set up logging
logging.basicConfig(level=logging.DEBUG)

def generate_schedule_view(request):
    try:
        # Print the Python executable and installed packages
        logging.debug(f"Python executable: {sys.executable}")
        logging.debug(f"Installed packages: {subprocess.run([sys.executable, '-m', 'pip', 'freeze'], capture_output=True, text=True).stdout}")
        
        # Construct the path to main.py
        project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        main_script = os.path.join(project_root, 'src', 'main.py')
        
        logging.debug(f"Running script: {main_script}")
        
        # Run the main.py script and capture its output
        result = subprocess.run([sys.executable, main_script], capture_output=True, text=True)
        
        logging.debug(f"Result stdout: {result.stdout}")
        logging.debug(f"Result stderr: {result.stderr}")
        
        schedule_output = result.stdout
        
        if result.returncode != 0:
            logging.error(f"Script error: {result.stderr}")
            return JsonResponse({'error': result.stderr})
        
        return JsonResponse({'schedule': schedule_output})
    except Exception as e:
        logging.error(f"Error: {str(e)}")
        return JsonResponse({'error': str(e)})


def schedule_page(request):
    return render(request, 'schedule.html')  # Render a template for the schedule page
