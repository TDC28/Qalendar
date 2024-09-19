from django.contrib import admin
from django.urls import path, include
from . import views
from .views import (
    EventListCreate,
    EventDetail,
    ActivityListCreate,
    ActivityDetail,
    schedule_view,
    schedule_page,
    AddEventView
)

# Previous URL patterns

urlpatterns = [
    path("", views.home, name="home"),
    path("about/", views.about, name="about"),
    # path("contacts/", views.contacts, name="contacts"),
    path("api/events/", EventListCreate.as_view(), name="event-list-create"),
    path("events/<int:pk>/", EventDetail.as_view(), name="event-detail"),
    path("api/activities/", ActivityListCreate.as_view(), name="activity-list-create"),
    path("activities/<int:pk>/", ActivityDetail.as_view(), name="activity-detail"),
    path("api/schedule/", schedule_view, name="schedule_view"),
    path("schedule/", schedule_page, name="schedule_page"),
    # path("generate_schedule/", generate_schedule_view, name="generate_schedule_view"),
    path("clear_events/", views.clear_events_view, name="clear-events"),
    path("clear_activities/", views.clear_activities_view, name="clear-activities"),
    path("api/generate-schedule/", views.generate_schedule, name="generate-schedule"),


    # Stuff added for the React frontend
    path("add_event/", AddEventView.as_view, name="add-event"),
]
