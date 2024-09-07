import json
from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.core.mail import send_mail
from django.http import JsonResponse
from django.conf import settings
from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Activity, Event
from .serializers import EventSerializer, ActivitySerializer

import subprocess
import os
import sys
import logging


# Create your views here.
def home(request):
    return render(request, "home.html")


def about(request):
    return render(request, "about.html")


@api_view(["POST"])
def contact(request):
    if request.method == "POST":
        name = request.data.get("name")
        email = request.data.get("email")
        message = request.data.get("message")

        subject = f"Qalendar contact submission from {name}"
        body = f"Name:{name}\nEmail: {email}\n\nMessage:\n{message}"
        recipient_list = ["aboutot@uwaterloo.ca", "mtatsuno@uwaterloo.ca"]

        send_mail(subject, body, settings.EMAIL_HOST_USER, recipient_list)

        return Response(
            {"status": "Your message was sent successfully. Thank you!"},
            status=status.HTTP_200_OK,
        )


# def contacts(request):
#     if request.method == "POST":
#         name = request.POST.get("name")
#         email = request.POST.get("email")
#         message = request.POST.get("message")
#
#         # Compose the email
#         subject = f"Contact Form Submission from {name}"
#         email_message = f"Name: {name}\nEmail: {email}\n\nMessage:\n{message}"
#         recipient_list = ["aboutot@uwaterloo.ca"]  # Add the recipient email here
#
#         # Send the email
#         send_mail(subject, email_message, settings.EMAIL_HOST_USER, recipient_list)
#
#         return render(request, "contacts.html", {"success": True})
#
#     return render(request, "contacts.html")


class ActivityListCreate(generics.ListCreateAPIView):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer


class ActivityDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer


class EventListCreate(generics.ListCreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer


class EventDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer


def clear_events_view(request):
    if request.method == "POST":
        Event.objects.all().delete()
        return JsonResponse({"message": "All events have been deleted."})
    return JsonResponse({"error": "Invalid request method."}, status=400)


def clear_events():
    Event.objects.all().delete()


def clear_activities_view(request):
    if request.method == "POST":
        Activity.objects.all().delete()
        return JsonResponse({"message": "All activities have been deleted."})
    return JsonResponse({"error": "Invalid request method."}, status=400)


def clear_activities():
    Activity.objects.all().delete()


def schedule_view(request):
    events = Event.objects.all()
    event_list = [
        {
            "title": event.title,
            "day": event.day,
            "start_time": event.start_time,
            "end_time": event.end_time,
        }
        for event in events
    ]
    return JsonResponse(event_list, safe=False)


# Set up logging
logging.basicConfig(level=logging.DEBUG)


def generate_schedule_view(request):
    try:
        # Construct the path to main.py
        project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        main_script = os.path.join(project_root, "src", "main.py")

        logging.debug(f"Running script: {main_script}")

        # Run the main.py script and capture its output
        result = subprocess.run(
            [sys.executable, main_script], capture_output=True, text=True
        )

        schedule_output = result.stdout

        if result.returncode != 0:
            logging.error(f"Script error: {result.stderr}")
            return JsonResponse({"error": result.stderr})

        return JsonResponse({"schedule": schedule_output})
    except Exception as e:
        return JsonResponse({"error": str(e)})


# New version for React
# Todo: Make generate_schedule usable for React
def generate_schedule(request):
    project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    main_script = os.path.join(project_root, "src", "main.py")

    result = subprocess.run(
        [sys.executable, main_script], capture_output=True, text=True
    )
    logging.debug(f"Running script")
    # Assuming the script prints a valid JSON string
    try:
        schedule = json.loads(result.stdout)
    except json.JSONDecodeError:
        return JsonResponse({"error": "Failed to parse schedule data"}, status=500)

    return JsonResponse({"schedule": schedule})


def schedule_page(request):
    return render(request, "schedule.html")  # Render a template for the schedule page
