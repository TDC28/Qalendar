import React, { useState, useEffect } from 'react';
import { Input, Button } from '@nextui-org/react';


interface EventType {
  id: number;
  title: string;
  day: string;
  start_time: string;
  end_time: string;
}

function EventsTab() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [newEvent, setNewEvent] = useState<EventType>({
    id: 0,
    title: '',
    day: '',
    start_time: '',
    end_time: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/events/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json() as Promise<EventType[]>;
      })
      .then(data => {
        setEvents(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
        setError('Error fetching events');
        setLoading(false);
      });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEvent({
      ...newEvent,
      [name]: name === 'day' ? parseInt(value) : value,
    });
  };

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    const { id, ...eventData } = newEvent;

    fetch('http://127.0.0.1:8000/api/events/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
    })
      .then(response => response.json())
      .then(data => {
        setEvents([...events, data]);
        setNewEvent({ id: 0, title: '', day: '', start_time: '', end_time: '' });
        setMessage('Event added successfully!');
      })
      .catch(error => {
        console.error('Error adding event:', error);
        setMessage('Error adding event.');
      });
  };
  

  return (
    <div>
      <h2 className="text-2xl">Manage Events</h2>

      {/* Add Event Form */}
      <div className="my-4">
        <h3 className="text-xl mb-2">Add New Event</h3>
        <form onSubmit={handleAddEvent}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Event Title"
              name="title"
              value={newEvent.title}
              onChange={handleInputChange}
              required
            />
            <Input
              label="Day"
              name="day"
              type="number"
              value={newEvent.day}
              onChange={handleInputChange}
              required
            />
            <Input
              label="Start Time"
              name="start_time"
              value={newEvent.start_time}
              onChange={handleInputChange}
              required
            />
            <Input
              label="End Time"
              name="end_time"
              value={newEvent.end_time}
              onChange={handleInputChange}
              required
            />
          </div>
          <Button type="submit" className="mt-4">
            Add Event
          </Button>
        </form>
        {message && <p className="mt-2 text-green-600">{message}</p>}
      </div>


      {/* Events List */}
      {loading ? (
        <p>Loading events...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <ul>
          {events.map(event => (
            <li key={event.id}>
              <p>
                {event.title} - Day {event.day}, {event.start_time} - {event.end_time}
              </p>
              {/* Edit and Delete buttons will go here */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default EventsTab;
