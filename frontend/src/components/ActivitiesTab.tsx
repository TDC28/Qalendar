import React, { useState, useEffect } from 'react';

interface ActivityType {
  id: number;
  title: string;
  time_constraint: string;
  preference: string;
}

function ActivitiesTab() {
  const [activities, setActivities] = useState<ActivityType[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/activities/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setActivities(data))
      .catch(error => {
        console.error('Error fetching activities:', error);
        setError('Error fetching activities');
      });
  }, []);

  return (
    <div>
      <h2 className="text-2xl">Manage Activities</h2>
      {error && <p className="text-red-500">{error}</p>}
      <ul>
        {activities.map(activity => (
          <li key={activity.id}>
            <p>{activity.title} - {activity.time_constraint}, Preference: {activity.preference}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ActivitiesTab;
