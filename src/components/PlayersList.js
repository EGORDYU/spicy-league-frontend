// src/components/PlayersList.js
import React from 'react';
import { Link } from 'react-router-dom';
import players from '../data'; // Adjust the path as needed

const PlayersList = () => {
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
