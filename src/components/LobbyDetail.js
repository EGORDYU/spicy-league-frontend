import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const LobbyDetail = () => {
  const { id } = useParams();
  const [lobby, setLobby] = useState(null);
  const [team1, setTeam1] = useState([]);
  const [team2, setTeam2] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchLobby = async () => {
      try {
        const token = localStorage.getItem('authTokens')
          ? JSON.parse(localStorage.getItem('authTokens')).access
          : null;

        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const response = await axios.get(`${apiUrl}custom-lobbies/${id}/`, { headers });
        const lobbyData = response.data;

        setLobby(lobbyData);
        initializeTeams(lobbyData.current_players, lobbyData.max_players);
      } catch (error) {
        console.error('Error fetching lobby details:', error.response?.data || error.message);
      }
    };

    fetchLobby();
  }, [id, apiUrl]);

  const initializeTeams = (players, maxPlayers) => {
    const halfPlayers = Math.ceil(maxPlayers / 2);
    const team1Initial = [];
    const team2Initial = [];

    players.forEach((player, index) => {
      if (index % 2 === 0) {
        team1Initial.push(player);
      } else {
        team2Initial.push(player);
      }
    });

    while (team1Initial.length < halfPlayers) team1Initial.push('Empty Slot');
    while (team2Initial.length < maxPlayers - halfPlayers) team2Initial.push('Empty Slot');

    setTeam1(team1Initial);
    setTeam2(team2Initial);
  };

  // Checking if the logged-in user is the lobby creator
  const authData = JSON.parse(localStorage.getItem('authTokens') || '{}');
  const isOwner = lobby && lobby.creator_username === authData.username;


  const movePlayer = (player, fromTeam, toTeam, setFromTeam, setToTeam) => {
    if (player === 'Empty Slot') return;

    setFromTeam((prevTeam) => prevTeam.map((p) => (p === player ? 'Empty Slot' : p)));
    setToTeam((prevTeam) => {
      const updatedTeam = [...prevTeam];
      const emptyIndex = updatedTeam.indexOf('Empty Slot');
      if (emptyIndex !== -1) {
        updatedTeam[emptyIndex] = player;
      }
      return updatedTeam;
    });
  };

  const renderPlayerSlot = (player, fromTeam, toTeam, setFromTeam, setToTeam) => (
    <div className="flex items-center justify-between border border-gray-500 rounded p-2 bg-gray-800 text-center">
      <span>{typeof player === 'string' ? player : player.username}</span>
      {/* Only show Move button if the user is the owner and player slot isn't empty */}
    
        <button
          onClick={() => movePlayer(player, fromTeam, toTeam, setFromTeam, setToTeam)}
          className="ml-2 px-2 py-1 text-sm bg-blue-500 hover:bg-blue-700 text-white rounded"
        >
          Move
        </button>
      
    </div>
  );

  if (!lobby) return <p>Loading...</p>;

  return (
    <div className="p-6 bg-gray-700 text-white rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-4xl font-semibold mb-4">{lobby.name}</h2>
      <p><strong>Game:</strong> {lobby.game}</p>
      <p><strong>Created by:</strong> {lobby.creator_username}</p>
      <p><strong>Status:</strong> {lobby.is_open ? 'Open' : 'Closed'}</p>
      <p><strong>Created At:</strong> {new Date(lobby.created_at).toLocaleString()}</p>

      <div className="flex justify-between mt-8">
        {/* Team 1 Column */}
        <div className="flex flex-col space-y-2 w-1/2 pr-2">
          <h3 className="text-2xl mb-2 text-center">Team 1</h3>
          {team1.map((player, i) => (
            <div key={`team1-slot-${i}`}>
              {renderPlayerSlot(player, team1, team2, setTeam1, setTeam2)}
            </div>
          ))}
        </div>

        {/* Team 2 Column */}
        <div className="flex flex-col space-y-2 w-1/2 pl-2">
          <h3 className="text-2xl mb-2 text-center">Team 2</h3>
          {team2.map((player, i) => (
            <div key={`team2-slot-${i}`}>
              {renderPlayerSlot(player, team2, team1, setTeam2, setTeam1)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LobbyDetail;
