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
        console.error('Error fetching events:', err.response?.data);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="h-full p-6 bg-gray-700 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-center mb-6">Current Season</h1>
      <div className="flex flex-col justify-between">
  {events.length > 0 ? (
    events.map((event) => (
      <div key={event.id} className="mb-4">
        <h2 className="text-2xl font-bold mb-2 text-blue-600">
          <Link to={`/events/${event.id}`} className="underline">{event.name}</Link>
        </h2>
        <p>Date: {new Date(event.date).toLocaleDateString()}</p>
        <p>Game: {event.game}</p>
        <p className="mt-4">Description: {event.description || <span className="text-gray-300 italic">To be added</span>}</p>
        <p className="mt-2">Additional Information: {event.additional_info || <span className="text-gray-300 italic">To be added</span>}</p>
        <p className="mt-2">Matcherino Link: {event.matcherino_link ? (
          <a href={event.matcherino_link} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">{event.matcherino_link}</a>
        ) : (
          <span className="text-gray-300 italic">To be added</span>
        )}</p>
      </div>
    ))
  ) : (
    <p className="text-center text-gray-600">No events available.</p>
  )}
</div>

    </div>
  );
};

export default Cseason;
