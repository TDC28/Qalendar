# Generated by Django 5.0.6 on 2024-07-08 03:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('QalendarApp', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='activity',
            name='preference',
            field=models.CharField(blank=True, default='None', max_length=8),
        ),
    ]