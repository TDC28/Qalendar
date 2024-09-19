import React, { useState, useEffect } from 'react';

interface EventType {
  id: number;
  title: string;
  day: number;
  start_time: string;
  end_time: string;
}

function EventsTab() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

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

  return (
    <div>
      <h2 className="text-2xl">Manage Events</h2>
      {loading ? (
        <p>Loading events...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <ul>
          {events.map(event => (
            <li key={event.id}>
              <p>
                {event.title} - Day {event.day}, {event.start_time} -{' '}
                {event.end_time}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default EventsTab;
