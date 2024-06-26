import os
import sys
import requests
import subprocess
from django.http import JsonResponse



from django.conf import settings

settings.configure(DEBUG=True)

def generate_schedule_view():
  try:
    # Run the script to generate the schedule
    project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    main_script = os.path.join(project_root, 'src', 'main.py')
  
    result = subprocess.run(['python', main_script], capture_output=True, text=True)
    schedule_output = result.stdout  # Access the captured string

    # Return JSON response with the schedule
    return JsonResponse({'schedule': schedule_output}), schedule_output
  except Exception as e:
    return JsonResponse({'error': str(e)})
    
response = generate_schedule_view()

print(response)
