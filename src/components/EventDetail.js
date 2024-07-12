// src/components/EventDetail.js
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
  const [teams, setTeams] = useState([]);

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

    const fetchTeams = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/teams/?event=${id}`);
        setTeams(response.data);
      } catch (err) {
        console.error('Error fetching teams:', err.response?.data || err.message);
        setError('Error fetching teams.');
      }
    };

    fetchEvent();
    fetchTeams();
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

  <h2>Teams</h2>
  {teams.length > 0 ? (
    teams.map(team => (
      <div key={team.id}>
        <h3>{team.name}</h3>
        <ul>
          {team.players.map(user => (
            user.players.map(player => (
              <li key={player.id}>
                <Link to={`/players/${player.id}`}>{player.name}</Link>
                {console.log(player)}
              </li>
            ))
          ))}
        </ul>
      </div>
    ))
  ) : (
    <p>No teams available.</p>
  )}
    </div>
  );
};

export default EventDetail;
