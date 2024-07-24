import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import AuthContext from '../AuthContext';

const Profile = () => {
  const { authTokens, user } = useContext(AuthContext);
  const { userId } = useParams(); // This should actually be playerId
  const apiUrl = process.env.REACT_APP_API_URL;
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
    doodadlevel: '', // Added doodadlevel
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

  const doodadLevels = [
    'new', 'experienced', 'expert'
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
        const response = await axios.get(`${apiUrl}players/${userId}/`, {
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
      await axios.put(`${apiUrl}players/${player.id}/`, formData, {
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
    <div className="max-w-4xl mx-auto p-6 bg-gray-700 shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-6">{isOwner ? 'Edit Profile' : 'View Profile'}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name:</label>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            readOnly={!isOwner} 
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Starcraft Rank:</label>
          <select 
            name="starcraftrank" 
            value={formData.starcraftrank} 
            onChange={handleChange} 
            disabled={!isOwner} 
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-500"
          >
            {starcraftRanks.map(rank => (
              <option key={rank} value={rank}>{rank}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Starcraft Race:</label>
          <select 
            name="starcraftrace" 
            value={formData.starcraftrace} 
            onChange={handleChange} 
            disabled={!isOwner} 
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-500"
          >
            {starcraftRaces.map(race => (
              <option key={race} value={race}>{race}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">League Rank:</label>
          <select 
            name="leaguerank" 
            value={formData.leaguerank} 
            onChange={handleChange} 
            disabled={!isOwner} 
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-500"
          >
            {leagueRanks.map(rank => (
              <option key={rank} value={rank}>{rank}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">League Role:</label>
          <select 
            name="leaguerole" 
            value={formData.leaguerole} 
            onChange={handleChange} 
            disabled={!isOwner} 
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-500"
          >
            {leagueRoles.map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">League Secondary Role:</label>
          <select 
            name="leaguesecondaryrole" 
            value={formData.leaguesecondaryrole} 
            onChange={handleChange} 
            disabled={!isOwner} 
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-500"
          >
            {leagueRoles.map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">CS2 Elo:</label>
          <select 
            name="cs2elo" 
            value={formData.cs2elo} 
            onChange={handleChange} 
            disabled={!isOwner} 
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-500"
          >
            {cs2EloChoices.map(elo => (
              <option key={elo} value={elo}>{elo}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Doodad Hunter Skill Level:</label>
          <select 
            name="doodadlevel" 
            value={formData.doodadlevel} 
            onChange={handleChange} 
            disabled={!isOwner} 
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-500"
          >
            {doodadLevels.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Profile Image URL:</label>
          <input 
            type="text" 
            name="profimage" 
            value={formData.profimage} 
            onChange={handleChange} 
            readOnly={!isOwner} 
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-500"
          />
        </div>
        {isOwner && <button type="submit" className="mt-4 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Save</button>}
      </form>
    </div>
  );
};

export default Profile;
