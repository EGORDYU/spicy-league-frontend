import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PlayersList = () => {
  const [players, setPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get(`${apiUrl}players/`);
        setPlayers(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching players:', error);
      }
    };

    fetchPlayers();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredPlayers = players.filter(player =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Players List</h1>
        <input
          type="text"
          placeholder="Search players"
          value={searchTerm}
          onChange={handleSearchChange}
          className="p-2 border border-gray-300 rounded-lg bg-gray-500"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-10 gap-4">
        {filteredPlayers.map(player => (
          <div key={player.id} className="border border-gray-300 rounded-lg p-4 bg-gray-500 text-center flame-border">
            <Link to={`/players/${player.id}`} className="block">
              <img src={player.profimage} alt={player.name} className="w-full h-auto rounded mb-2" />
              <span className="text-lg font-bold text-white underline">{player.name}</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayersList;
