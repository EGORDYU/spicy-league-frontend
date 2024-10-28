import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../AuthContext';
import axios from 'axios';
import LobbyCard from './LobbyCard';



const CustomsList = () => {
  const { user } = useContext(AuthContext);
  const [lobbies, setLobbies] = useState([]);
  const [showForm, setShowForm] = useState(false); // Toggle for form visibility
  const [name, setName] = useState('');
  const [game, setGame] = useState('');
  const [maxPlayers, setMaxPlayers] = useState(10);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchLobbies = async () => {
      try {
        const token = localStorage.getItem('authTokens') 
          ? JSON.parse(localStorage.getItem('authTokens')).access 
          : null;

        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const response = await axios.get(`${apiUrl}custom-lobbies/`, { headers });
        setLobbies(response.data);
      } catch (error) {
        console.error('Error fetching lobbies:', error.response?.data || error.message);
      }
    };

    fetchLobbies();
  }, [apiUrl]);

  const handleToggleForm = () => {
    setShowForm(!showForm); // Toggle the form visibility
  };

  const handleCreateLobby = async () => {
    if (!user) return;
    const response = await axios.post(`${apiUrl}custom-lobbies/`, {
      name,
      game,
      max_players: maxPlayers,
      creator: user.id,
    });
    setLobbies([...lobbies, response.data]); // Update lobby list with the new lobby
    setShowForm(false); // Hide the form after creating a lobby
    setName(''); // Reset form fields
    setGame('');
    setMaxPlayers(10);
  };

  return (
    <div className="p-6 bg-gray-700 text-white">
      <h1 className="text-3xl mb-4">Custom Lobbies</h1>
      
      {/* Plus button to show/hide the form */}
      {user ? (
        <button
          onClick={handleToggleForm}
          className="mb-4 px-4 py-2 bg-blue-600 rounded-full hover:bg-blue-500 text-white text-2xl font-bold"
        >
          +
        </button>
      ) : (
        <p className="mb-4 text-red-400">Please log in to create a new lobby.</p>
      )}

      {/* Conditionally render the create lobby form */}
      {showForm && user && (
        <div className="mb-4 p-4 bg-gray-800 rounded">
          <h2 className="text-2xl mb-2">Create a New Custom Lobby</h2>
          <label className="block mb-2">Lobby Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mb-4 p-2 w-full bg-gray-800 border border-gray-600 rounded"
          />
          <label className="block mb-2">Game</label>
          <input
            type="text"
            value={game}
            onChange={(e) => setGame(e.target.value)}
            className="mb-4 p-2 w-full bg-gray-800 border border-gray-600 rounded"
          />
          <label className="block mb-2">Max Players</label>
          <input
            type="number"
            value={maxPlayers}
            onChange={(e) => setMaxPlayers(e.target.value)}
            className="mb-4 p-2 w-full bg-gray-800 border border-gray-600 rounded"
            min="2"
            max="10"
          />
          <button
            onClick={handleCreateLobby}
            className="px-4 py-2 bg-green-600 rounded hover:bg-green-500"
          >
            Create Lobby
          </button>
        </div>
      )}

      {/* List of existing lobbies */}
      <ul>
        {lobbies.map((lobby) => (
          <LobbyCard key={lobby.id} lobby={lobby} />
        ))}
      </ul>
    </div>
  );
};

export default CustomsList;
