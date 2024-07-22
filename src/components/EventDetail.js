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
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`${apiUrl}events/${id}/`);
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
        const response = await axios.get(`${apiUrl}teams/?event=${id}`);
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
      await axios.post(`${apiUrl}events/${id}/signup/`, {}, {
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
        },
      });
      setIsSignedUp(true);
      const updatedEvent = await axios.get(`${apiUrl}events/${id}/`);
      setEvent(updatedEvent.data);
    } catch (err) {
      console.error('Error signing up for event:', err.response?.data || err.message);
      setError('Error signing up for event.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const renderPlayerDetails = (player) => (
    <div key={player.id} className="border border-gray-300 rounded-lg p-4 bg-gray-100">
      <Link to={`/players/${player.id}`} className="text-xl font-bold text-blue-600 hover:underline">{player.name}</Link>
      <ul className="list-none p-0">
        {event.game === 'League of Legends' || event.game === 'Combination' ? (
          <>
            <li className="mb-2">League Rank: {player.leaguerank}</li>
            <li className="mb-2">League Role: {player.leaguerole}</li>
            <li className="mb-2">League Secondary Role: {player.leaguesecondaryrole}</li>
          </>
        ) : null}
        {event.game === 'Starcraft' || event.game === 'Combination' ? (
          <>
            <li className="mb-2">Starcraft Race: {player.starcraftrace}</li>
            <li className="mb-2">Starcraft Rank: {player.starcraftrank}</li>
          </>
        ) : null}
        {event.game === 'Counterstrike 2' || event.game === 'Combination' ? (
          <li className="mb-2">CS2 Elo: {player.cs2elo}</li>
        ) : null}
      </ul>
    </div>
  );

  const renderPlayerName = (player) => (
    <li key={player.id} className="mb-2">
      <Link to={`/players/${player.id}`} className="text-xl font-bold text-blue-600 hover:underline">{player.name}</Link>
    </li>
  );

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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {event.players.map(user => (
            user.players.map(player => renderPlayerDetails(player))
          ))}
        </div>
      ) : (
        <p>No players signed up yet.</p>
      )}

      <h2>Teams</h2>
      {teams.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {teams.filter(team => team.event === parseInt(id)).map(team => (
            <div key={team.id} className="border border-gray-300 rounded-lg p-4 bg-white shadow-md">
              <h3 className="team-name text-2xl font-semibold mb-4">{team.name}</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                {team.players.map(user => (
                  user.players.map(player => renderPlayerName(player))
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <p>No teams available.</p>
      )}
    </div>
  );
};

export default EventDetail;
