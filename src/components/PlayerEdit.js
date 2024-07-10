// src/components/PlayerEdit.js
import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../AuthContext';

const PlayerEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { authTokens } = useContext(AuthContext);
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/players/${id}/`, {
          headers: {
            Authorization: `Bearer ${authTokens.access}`
          }
        });
        setPlayer(response.data);
      } catch (error) {
        console.error('Error fetching player:', error);
      }
    };

    fetchPlayer();
  }, [id, authTokens]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/players/${id}/`, player, {
        headers: {
          Authorization: `Bearer ${authTokens.access}`
        }
      });
      navigate(`/players/${id}`);
    } catch (error) {
      console.error('Error updating player:', error);
    }
  };

  const handleChange = (e) => {
    setPlayer({
      ...player,
      [e.target.name]: e.target.value
    });
  };

  if (!player) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input type="text" name="name" value={player.name} onChange={handleChange} />
      </div>
      <div>
        <label>Starcraft Rank</label>
        <select name="starcraftrank" value={player.starcraftrank} onChange={handleChange}>
          <option value="bronze">Bronze</option>
          <option value="silver">Silver</option>
          <option value="gold">Gold</option>
          <option value="platinum">Platinum</option>
          <option value="diamond">Diamond</option>
          <option value="master">Master</option>
          <option value="grandmaster">Grandmaster</option>
          <option value="n/a">N/A</option>
        </select>
      </div>
      <div>
        <label>Starcraft Race</label>
        <select name="starcraftrace" value={player.starcraftrace} onChange={handleChange}>
          <option value="terran">Terran</option>
          <option value="zerg">Zerg</option>
          <option value="protoss">Protoss</option>
          <option value="n/a">N/A</option>
        </select>
      </div>
      <div>
        <label>League Rank</label>
        <select name="leaguerank" value={player.leaguerank} onChange={handleChange}>
          <option value="iron">Iron</option>
          <option value="bronze">Bronze</option>
          <option value="silver">Silver</option>
          <option value="gold">Gold</option>
          <option value="platinum">Platinum</option>
          <option value="emerald">Emerald</option>
          <option value="diamond">Diamond</option>
          <option value="master">Master</option>
          <option value="grandmaster">Grandmaster</option>
          <option value="challenger">Challenger</option>
          <option value="n/a">N/A</option>
        </select>
      </div>
      <div>
        <label>League Role</label>
        <select name="leaguerole" value={player.leaguerole} onChange={handleChange}>
          <option value="top">Top</option>
          <option value="jungle">Jungle</option>
          <option value="mid">Mid</option>
          <option value="adc">ADC</option>
          <option value="support">Support</option>
          <option value="fill">Fill</option>
          <option value="n/a">N/A</option>
        </select>
      </div>
      <div>
        <label>League Secondary Role</label>
        <select name="leaguesecondaryrole" value={player.leaguesecondaryrole} onChange={handleChange}>
          <option value="top">Top</option>
          <option value="jungle">Jungle</option>
          <option value="mid">Mid</option>
          <option value="adc">ADC</option>
          <option value="support">Support</option>
          <option value="fill">Fill</option>
          <option value="n/a">N/A</option>
        </select>
      </div>
      <div>
        <label>CS2 Elo</label>
        <select name="cs2elo" value={player.cs2elo} onChange={handleChange}>
          {[...Array(31).keys()].map(i => (
            <option key={i} value={i * 1000}>{i * 1000}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Profile Image URL</label>
        <input type="text" name="profimage" value={player.profimage} onChange={handleChange} />
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

export default PlayerEdit;
