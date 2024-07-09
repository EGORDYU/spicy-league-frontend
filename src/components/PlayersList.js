// src/components/PlayersList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchPlayers } from '../api';

const PlayersList = () => {
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        fetchPlayers()
            .then(response => setPlayers(response.data))
            .catch(error => console.error('Error fetching players:', error));
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
