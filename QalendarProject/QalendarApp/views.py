from django.http import JsonResponse
from django.shortcuts import render, HttpResponse
from django.http import JsonResponse
from rest_framework import generics

from .models import Activity, Event
from .serializers import EventSerializer

import subprocess
import os


import django





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

def generate_schedule_view(request):
    try:
        # Run the script to generate the schedule, currently for main.py
        project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        main_script = os.path.join(project_root, 'src', 'main.py')
        
        
        result = subprocess.run(['python', main_script], capture_output=True, text=True)
        schedule_output = result.stdout
        return JsonResponse({'schedule': schedule_output})
    except Exception as e:
        return JsonResponse({'error': str(e)})


def schedule_page(request):
    return render(request, 'schedule.html')  # Render a template for the schedule page


# if __name__ == '__main__':
#     from django.conf import settings
#     settings.configure(DEBUG=True)
# #     os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'QalendarProject.settings')
    
# #     # Step 2: Set up Django.
# #     django.setup()

# #     project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# #     print(project_root)
#     print("Hello, World!")