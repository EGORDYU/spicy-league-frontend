// src/components/PlayersList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PlayersList = () => {
  const [players, setPlayers] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get(`${apiUrl}players/`);
        setPlayers(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching players:', error);
      }
    };

    fetchPlayers();
  }, []);

  return (
    <div>
      <h1>Players List</h1>
      <ul>
        {players.map(player => (
          <li key={player.id}>
            <Link to={`/players/${player.id}`}>{player.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlayersList;
