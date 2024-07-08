from django.urls import path
from . import views
from .views import EventListCreate, EventDetail, ActivityListCreate, ActivityDetail, schedule_view, schedule_page, generate_schedule_view


urlpatterns  =  [
    path("", views.home, name="home"),
    path('about/', views.about, name='about'),
    path('contacts/', views.contacts, name='contacts'),
    path('events/', EventListCreate.as_view(), name='event-list-create'),
    path('events/<int:pk>/', EventDetail.as_view(), name='event-detail'),
    path('activities/', ActivityListCreate.as_view(), name='activity-list-create'),
    path('activities/<int:pk>/', ActivityDetail.as_view(), name='activity-detail'),
    path('api/schedule/', schedule_view, name='schedule_view'),
    path('schedule/', schedule_page, name='schedule_page'),
    path('generate_schedule/', generate_schedule_view, name='generate_schedule_view'),
    path('clear_events/', views.clear_events_view, name='clear-events'),
    path('clear_activities/', views.clear_activities_view, name='clear-activities'),
]
