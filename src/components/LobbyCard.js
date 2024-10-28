// LobbyCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const LobbyCard = ({ lobby }) => {
  return (
    <Link to={`/customs/${lobby.id}`} className="block border border-gray-300 rounded-lg p-4 shadow-md bg-gray-700 text-white hover:bg-gray-600 transition">
      <h3 className="text-2xl font-semibold mb-2">{lobby.name}</h3>
      <p><strong>Game:</strong> {lobby.game}</p>
      <p><strong>Created by:</strong> {lobby.creator_username}</p>
      <p><strong>Players:</strong> {lobby.current_players_count} / {lobby.max_players}</p>
      <p><strong>Status:</strong> {lobby.is_open ? 'Open' : 'Closed'}</p>
    </Link>
  );
};

export default LobbyCard;
