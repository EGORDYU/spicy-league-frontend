// src/components/PlayerDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPlayer } from '../api';

const PlayerDetail = () => {
    const { id } = useParams();
    const [player, setPlayer] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPlayer(id)
            .then(response => {
                setPlayer(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching player:', error);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!player) {
        return <div>Player not found</div>;
    }

    return (
        <div>
            <h1>{player.name} </h1>
            <img src={player.profimage} alt="Player description"/>
            <p>StarCraft Rank: {player.starcraftrank}</p>
            <p>StarCraft Race: {player.starcraftrace}</p>
            <p>League Rank: {player.leaguerank}</p>
            <p>League Role: {player.leaguerole}</p>
            <p>League Secondary Role: {player.leaguesecondaryrole}</p>
            <p>CS2 Elo: {player.cs2elo}</p>
        </div>
    );
};

export default PlayerDetail;
