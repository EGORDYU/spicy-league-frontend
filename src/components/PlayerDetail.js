import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const PlayerDetail = () => {
  const { id } = useParams();
  const [player, setPlayer] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;
  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        const response = await axios.get(`${apiUrl}players/${id}/`);
        console.log('Player data:', response.data); // Debugging line
        setPlayer(response.data);
      } catch (error) {
        console.error('Error fetching player:', error);
      }
    };

    fetchPlayer();
  }, [id]);

  if (!player) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{player.name}</h1>
      <p>Starcraft Rank: {player.starcraftrank}</p>
      <p>Starcraft Race: {player.starcraftrace}</p>
      <p>League Rank: {player.leaguerank}</p>
      <p>League Role: {player.leaguerole}</p>
      <p>League Secondary Role: {player.leaguesecondaryrole}</p>
      <p>CS2 Elo: {player.cs2elo}</p>
      <p>Profile Image: <img src={player.profimage} alt={player.name} width="100" /></p>
      {/* {player.is_owner && <Link to={`/players/edit/${player.id}`}>Edit</Link>} */}
    </div>
  );
};

export default PlayerDetail;
