import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../AuthContext';

const EventDetail = () => {
  const { id } = useParams();
  const { authTokens } = useContext(AuthContext);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSignedUp, setIsSignedUp] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/events/${id}/`);
        setEvent(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching event:', err.response?.data || err.message);
        setError('Error fetching event.');
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleSignup = async () => {
    if (!authTokens) {
      setError('You need to be logged in to sign up for an event.');
      return;
    }
    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/events/${id}/signup/`, {}, {
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
        },
      });
      setIsSignedUp(true);
      // Fetch event again to update the list of signed-up players
      const updatedEvent = await axios.get(`http://127.0.0.1:8000/api/events/${id}/`);
      setEvent(updatedEvent.data);
    } catch (err) {
      console.error('Error signing up for event:', err.response?.data || err.message);
      setError('Error signing up for event.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>{event.name}</h1>
      <p>Date: {event.date}</p>
      <p>Game: {event.game}</p>
      <p>Team Size: {event.teamsize}</p>
      <button onClick={handleSignup} disabled={isSignedUp}>
        {isSignedUp ? 'Signed Up' : 'Sign Up'}
      </button>

      <h2>Signed up players</h2>
      {event.players.length > 0 ? (
        <ul>
          {event.players.map(user => (
            user.players.map(player => (
              <li key={player.id}>
                <Link to={`/players/${player.id}`}>{player.name}</Link>
              </li>
            ))
          ))}
        </ul>
      ) : (
        <p>No players signed up yet.</p>
      )}
    </div>
  );
};

export default EventDetail;
