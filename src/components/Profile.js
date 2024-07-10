import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import AuthContext from '../AuthContext';

const Profile = () => {
  const { authTokens } = useContext(AuthContext);
  const { userId } = useParams(); // This should actually be playerId
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    starcraftrank: '',
    starcraftrace: '',
    leaguerank: '',
    leaguesecondaryrole: '',
    cs2elo: '',
    profimage: '',
  });

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
        console.log('Fetch Player Response:', response); // Log the response for debugging
        if (!response.data) {
          setError('No player data found');
          setLoading(false);
          return;
        }
        setPlayer(response.data);
        setFormData(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching player data:', err.response); // Log the detailed error
        if (err.response) {
          setError(`Error fetching player data: ${err.response.status} - ${err.response.data.detail}`);
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
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div>
          <label>Starcraft Rank:</label>
          <input type="text" name="starcraftrank" value={formData.starcraftrank} onChange={handleChange} />
        </div>
        <div>
          <label>Starcraft Race:</label>
          <input type="text" name="starcraftrace" value={formData.starcraftrace} onChange={handleChange} />
        </div>
        <div>
          <label>League Rank:</label>
          <input type="text" name="leaguesecondaryrole" value={formData.leaguesecondaryrole} onChange={handleChange} />
        </div>
        <div>
          <label>CS2 Elo:</label>
          <input type="number" name="cs2elo" value={formData.cs2elo} onChange={handleChange} />
        </div>
        <div>
          <label>Profile Image URL:</label>
          <input type="text" name="profimage" value={formData.profimage} onChange={handleChange} />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default Profile;