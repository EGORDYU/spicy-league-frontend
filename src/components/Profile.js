import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import AuthContext from '../AuthContext';

const Profile = () => {
  const { authTokens, user } = useContext(AuthContext);
  const { userId } = useParams(); // This should actually be playerId
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isOwner, setIsOwner] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    starcraftrank: '',
    starcraftrace: '',
    leaguerank: '',
    leaguerole: '',
    leaguesecondaryrole: '',
    cs2elo: '',
    profimage: '',
  });

  const starcraftRanks = [
    'bronze', 'silver', 'gold', 'platinum', 'diamond', 'master', 'grandmaster', 'n/a'
  ];

  const starcraftRaces = [
    'terran', 'zerg', 'protoss', 'n/a'
  ];

  const leagueRanks = [
    'iron', 'bronze', 'silver', 'gold', 'platinum', 'emerald', 'diamond', 'master', 'grandmaster', 'challenger', 'n/a'
  ];

  const leagueRoles = [
    'top', 'jungle', 'mid', 'adc', 'support', 'fill', 'n/a'
  ];

  const cs2EloChoices = Array.from({ length: 31 }, (_, i) => i * 1000);

  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        if (!authTokens) {
          setError('No token found');
          setLoading(false);
          return;
        }
        const response = await axios.get(`http://127.0.0.1:8000/api/players/${userId}/`, {
          headers: {
            Authorization: `Bearer ${authTokens.access}`,
          },
        });
        console.log('Fetch Player Response:', response.data); // Log the response for debugging
        if (!response.data) {
          setError('No player data found');
          setLoading(false);
          return;
        }
        setPlayer(response.data);
        setFormData(response.data);
        setIsOwner(response.data.user === user.user_id);
        console.log('Player User ID:', response.data.user); // Log the player owner's ID
        console.log('Current User ID:', user.user_id); // Log the current user's ID
        setLoading(false);
      } catch (err) {
        console.error('Error fetching player data:', err.response); // Log the detailed error
        if (err.response) {
          if (err.response.status === 403) {
            setError('You do not have permission to access this profile.');
          } else {
            setError(`Error fetching player data: ${err.response.status} - ${err.response.data.detail}`);
          }
        } else {
          setError('Error fetching player data.');
        }
        setLoading(false);
      }
    };

    fetchPlayer();
  }, [authTokens, userId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://127.0.0.1:8000/api/players/${player.id}/`, formData, {
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
        },
      });
      setError('');
      alert('Profile updated successfully!');
    } catch (err) {
      console.error('Error updating profile:', err.response); // Log the detailed error
      if (err.response) {
        setError(`Error updating profile: ${err.response.status} - ${err.response.data.detail}`);
      } else {
        setError('Error updating profile.');
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>{isOwner ? 'Edit Profile' : 'View Profile'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} readOnly={!isOwner} />
        </div>
        <div>
          <label>Starcraft Rank:</label>
          <select name="starcraftrank" value={formData.starcraftrank} onChange={handleChange} disabled={!isOwner}>
            {starcraftRanks.map(rank => (
              <option key={rank} value={rank}>{rank}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Starcraft Race:</label>
          <select name="starcraftrace" value={formData.starcraftrace} onChange={handleChange} disabled={!isOwner}>
            {starcraftRaces.map(race => (
              <option key={race} value={race}>{race}</option>
            ))}
          </select>
        </div>
        <div>
          <label>League Rank:</label>
          <select name="leaguerank" value={formData.leaguerank} onChange={handleChange} disabled={!isOwner}>
            {leagueRanks.map(rank => (
              <option key={rank} value={rank}>{rank}</option>
            ))}
          </select>
        </div>
        <div>
          <label>League Role:</label>
          <select name="leaguerole" value={formData.leaguerole} onChange={handleChange} disabled={!isOwner}>
            {leagueRoles.map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
        </div>
        <div>
          <label>League Secondary Role:</label>
          <select name="leaguesecondaryrole" value={formData.leaguesecondaryrole} onChange={handleChange} disabled={!isOwner}>
            {leagueRoles.map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
        </div>
        <div>
          <label>CS2 Elo:</label>
          <select name="cs2elo" value={formData.cs2elo} onChange={handleChange} disabled={!isOwner}>
            {cs2EloChoices.map(elo => (
              <option key={elo} value={elo}>{elo}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Profile Image URL:</label>
          <input type="text" name="profimage" value="https://t4.ftcdn.net/jpg/00/64/67/27/360_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg" onChange={handleChange} readOnly={!isOwner} />
        </div>
        {isOwner && <button type="submit">Save</button>}
      </form>
    </div>
  );
};

export default Profile;
