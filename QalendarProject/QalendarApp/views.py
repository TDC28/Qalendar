from django.shortcuts import render, HttpResponse
from django.http import JsonResponse
from rest_framework import generics

from .models import Activity, Event
from .serializers import EventSerializer



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

def schedule_page(request):
    return render(request, 'schedule.html')  # Render a template for the schedule page

