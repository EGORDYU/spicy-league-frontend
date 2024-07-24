import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Cseason = () => {
  const [events, setEvents] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${apiUrl}events/`);
        setEvents(response.data);
      } catch (err) {
        console.error('Error fetching events:', err.response.data);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-10">Current Events</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.length > 0 ? (
            events.map((event) => (
              <div key={event.id} className="bg-gray-500 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h2 className="text-2xl font-bold mb-2 text-blue-600">
                  <Link to={`/events/${event.id}`}>{event.name}</Link>
                </h2>
                <p className="">Date: {new Date(event.date).toLocaleDateString()}</p>
                <p className="">Game: {event.game}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">No events available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cseason;
