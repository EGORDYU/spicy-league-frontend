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

  const renderRaceIcon = (race) => {
    switch (race) {
      case 'zerg':
        return <img src="/images/zerg-icon.png" alt="Zerg" className="inline-block w-6 h-6 ml-2" />;
      case 'terran':
        return <img src="/images/terran-icon.png" alt="Terran" className="inline-block w-6 h-6 ml-2" />;
      case 'protoss':
        return <img src="/images/protoss-icon.png" alt="Protoss" className="inline-block w-6 h-6 ml-2" />;
      default:
        return null;
    }
  };

  const renderSc2RankIcon = (sc2rank) => {
    switch(sc2rank){
      case 'bronze':
        return <img src="/images/sc2bronze-icon.png" alt="Bronze" className="inline-block w-6 h-6 ml-2" />
      case 'silver':
        return <img src="/images/sc2silver-icon.png" alt="Silver" className="inline-block w-6 h-6 ml-2" />
      case 'gold':
        return <img src="/images/sc2gold-icon.png" alt="Gold" className="inline-block w-6 h-6 ml-2" />
      case 'platinum':
        return <img src="/images/sc2platinum-icon.png" alt="Platinum" className="inline-block w-6 h-6 ml-2" />
      case 'diamond':
        return <img src="/images/sc2diamond-icon.png" alt="Diamond" className="inline-block w-6 h-6 ml-2" />
      case 'master':
        return <img src="/images/sc2master-icon.png" alt="Master" className="inline-block w-6 h-6 ml-2" />
      case 'grandmaster':
        return <img src="/images/sc2grandmaster-icon.png" alt="Grandmaster" className="inline-block w-6 h-6 ml-2" />
    }
  }

  const renderLeagueRank = (leaguerank) => {
    switch(leaguerank){
      case 'iron':
        return <img src="/images/loliron-icon.png" alt="Iron" className="inline-block w-6 h-6 ml-2" />
      case 'bronze':
        return <img src="/images/lolbronze-icon.png" alt="Bronze" className="inline-block w-6 h-6 ml-2" />
      case 'silver':
        return <img src="/images/lolsilver-icon.png" alt="Silver" className="inline-block w-6 h-6 ml-2" />
      case 'gold':
        return <img src="/images/lolgold-icon.png" alt="Gold" className="inline-block w-6 h-6 ml-2" />
      case 'platinum':
        return <img src="/images/lolplatinum-icon.png" alt="Platinum" className="inline-block w-6 h-6 ml-2" />
      case 'emerald':
        return <img src="/images/lolemerald-icon.png" alt="Emerald" className="inline-block w-6 h-6 ml-2" />
      case 'diamond':
        return <img src="/images/loldiamond-icon.png" alt="Diamond" className="inline-block w-6 h-6 ml-2" />
      case 'master':
        return <img src="/images/lolmaster-icon.png" alt="Master" className="inline-block w-6 h-6 ml-2" />
      case 'grandmaster':
        return <img src="/images/lolgrandmaster-icon.png" alt="Grandmaster" className="inline-block w-6 h-6 ml-2" />
      case 'challenger':
        return <img src="/images/lolchallenger-icon.png" alt="Challenger" className="inline-block w-6 h-6 ml-2" />
    }
  }

  const renderLeagueRole = (leaguerole) => {
    switch(leaguerole){
      case 'top':
        return <img src="/images/loltop-icon.png" alt="Top" className="inline-block w-6 h-6 ml-2" />
      case 'jungle':
        return <img src="/images/loljungle-icon.png" alt="Jungle" className="inline-block w-6 h-6 ml-2" />
      case 'mid':
        return <img src="/images/lolmid-icon.png" alt="Mid" className="inline-block w-6 h-6 ml-2" />
      case 'adc':
        return <img src="/images/loladc-icon.png" alt="Adc" className="inline-block w-6 h-6 ml-2" />
      case 'support':
        return <img src="/images/lolsupport-icon.png" alt="Support" className="inline-block w-6 h-6 ml-2" />
      case 'fill':
        return <img src="/images/lolfill-icon.png" alt="Fill" className="inline-block w-6 h-6 ml-2" />

    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex items-center mb-6">
        <img src={player.profimage} alt={player.name} className="w-24 h-24 rounded-full mr-4" />
        <h1 className="text-3xl font-bold">{player.name}</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-100 p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-2">League of Legends</h2>
          <p>Rank: {player.leaguerank} {renderLeagueRank(player.leaguerank)}</p>
          <p>Role: {player.leaguerole} {renderLeagueRole(player.leaguerole)}</p>
          <p>Secondary Role: {player.leaguesecondaryrole} {renderLeagueRole(player.leaguesecondaryrole)}</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-2">Starcraft 2</h2>
          <p>Rank: {player.starcraftrank} {renderSc2RankIcon(player.starcraftrank)}</p>
          <p>Race: {player.starcraftrace} {renderRaceIcon(player.starcraftrace)}</p>
        </div>
        <div className="bg-red-100 p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-2">Counter-Strike 2</h2>
          <p>Elo: {player.cs2elo}</p>
        </div>
      </div>
      {/* {player.is_owner && <Link to={`/players/edit/${player.id}`} className="text-blue-500 hover:underline mt-4 inline-block">Edit</Link>} */}
    </div>
  );
};

export default PlayerDetail;
