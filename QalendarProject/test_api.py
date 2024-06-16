import requests

response = requests.get('http://127.0.0.1:8000/api/generate_schedule/')
if response.status_code == 200:
    data = response.json()
    if 'schedule' in data:
        print("Schedule output:")
        print(data['schedule'])
    else:
        print("Error:", data.get('error', 'Unknown error'))
else:
    print(f"Failed to fetch schedule. Status code: {response.status_code}")