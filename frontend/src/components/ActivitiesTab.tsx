import React, { useState, useEffect } from 'react';
import { Input, Button } from '@nextui-org/react';

interface ActivityType {
  id: number;
  title: string;
  time_constraint: string;
  preference: string;
}

function ActivitiesTab() {
  const [activities, setActivities] = useState<ActivityType[]>([]);
  const [newActivity, setNewActivity] = useState<ActivityType>({
    id: 0,
    title: '',
    time_constraint: '',
    preference: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewActivity({
      ...newActivity,
      [name]: name === 'day' ? parseInt(value) : value,
    });
  };

  const handleAddActivity = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    const { id, ...eventData } = newActivity;

    fetch('http://127.0.0.1:8000/api/activities/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
    })
      .then(response => response.json())
      .then(data => {
        setActivities([...activities, data]);
        setNewActivity({ id: 0, title: '', time_constraint: '', preference: '' });
        setMessage('Activity added successfully!');
      })
      .catch(error => {
        console.error('Error adding activity:', error);
        setMessage('Error adding activity.');
      });
  };

  return (
    <div>
      <h2 className="text-2xl mb-2">Manage Activities</h2>
      
      {/* Add Activity Form */}
      <div className="my-4">
        <h3 className="text-xl">Add Activity</h3>
        <form onSubmit={handleAddActivity}>
          <div className="mb-4">
            <Input
              label="Activity Title"
              placeholder="Enter activity title"
              value={newActivity.title}
              onChange={handleInputChange}
              required
            />
            <Input
              label="Time Constraint"
              placeholder="Enter time constraint"
              value={newActivity.time_constraint}
              onChange={handleInputChange}
              required
            />
            <Input
              label="Preference"
              placeholder="Enter preference"
              value={newActivity.preference}
              onChange={handleInputChange}
              required
            />
          </div>

           {/* <div className="flex flex-col">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={newActivity.title}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="time_constraint">Time Constraint</label>
            <input
              type="text"
              id="time_constraint"
              name="time_constraint"
              value={newActivity.time_constraint}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="preference">Preference</label>
            <input
              type="text"
              id="preference"
              name="preference"
              value={newActivity.preference}
              onChange={handleInputChange}
            />
          </div> */}
          <Button type="submit" className="mt-4">
            Add Activity
          </Button>        
        </form>
        {message && <p>{message}</p>}
      </div>
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
