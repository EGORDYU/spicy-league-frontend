import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Cseason = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/events/');
        setEvents(response.data);
      } catch (err) {
        console.error('Error fetching events:', err.response.data);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      <h1>Current Events</h1>
      <div>
        {events.length > 0 ? (
          events.map((event) => (
            <div key={event.id}>
              <h2>
                <Link to={`/events/${event.id}`}>{event.name}</Link>
              </h2>
              <p>Date: {event.date}</p>
              <p>Game: {event.game}</p>
            </div>
          ))
        ) : (
          <p>No events available.</p>
        )}
      </div>
    </div>
  );
};

export default Cseason;
