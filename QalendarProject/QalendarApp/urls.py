from django.urls import path
from . import views
from .views import EventListCreate, EventDetail, schedule_view, schedule_page


urlpatterns  =  [
    path("", views.home, name="home"),
    path('events/', EventListCreate.as_view(), name='event-list-create'),
    path('events/<int:pk>/', EventDetail.as_view(), name='event-detail'),
    path('api/schedule/', schedule_view, name='schedule_view'),
    path('schedule/', schedule_page, name='schedule_page'),
]
