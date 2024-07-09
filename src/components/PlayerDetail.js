// src/components/PlayerDetail.js
import React from 'react';
import { useParams } from 'react-router-dom';
import players from '../data';


const PlayerDetail = () => {
  const { id } = useParams();
  const player = players.find(player => player.id === parseInt(id));

  if (!player) {
    return <h2>Player not found</h2>;
  }

  return (
    <div>
      <h1>{player.name}</h1>
      <p>Age: {player.age}</p>
      <p>Team: {player.team}</p>
    </div>
  );
};

export default PlayerDetail;
