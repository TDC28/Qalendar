from django.db import models
import random
import string
# Create your models here.
class Activity(models.Model):
    title = models.CharField(max_length=200)
    time_constraint = models.CharField(max_length=4)
    preference = models.CharField(max_length=8, default="None", blank=True)

    def __str_(self):
        return self.title



#create a class for events that are fixed to a specific time
class Event(models.Model):
    title = models.CharField(max_length=200)
    day = models.IntegerField()
    start_time = models.CharField(max_length=4)
    end_time = models.CharField(max_length=4)

    def __str__(self):
        return self.title