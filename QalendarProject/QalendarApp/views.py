from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.core.mail import send_mail
from django.http import JsonResponse
from django.conf import settings
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

def about(request):
    return render(request, 'about.html')

def contacts(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        message = request.POST.get('message')
        
        # Compose the email
        subject = f"Contact Form Submission from {name}"
        email_message = f"Name: {name}\nEmail: {email}\n\nMessage:\n{message}"
        recipient_list = ['jsmith@uwaterloo.ca']  # Add the recipient email here
        
        # Send the email
        send_mail(subject, email_message, settings.EMAIL_HOST_USER, recipient_list)
        
        return render(request, 'contacts.html', {'success': True})
    
    return render(request, 'contacts.html')


class EventListCreate(generics.ListCreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

class EventDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer


def clear_events_view(request):
    if request.method == 'POST':
        Event.objects.all().delete()
        return JsonResponse({'message': 'All events have been deleted.'})
    return JsonResponse({'error': 'Invalid request method.'}, status=400)

def clear_events():
    Event.objects.all().delete()

def schedule_view(request):
    events = Event.objects.all()
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
