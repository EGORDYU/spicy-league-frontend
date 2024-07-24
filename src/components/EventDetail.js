import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../AuthContext';

const EventDetail = () => {
  const { id } = useParams();
  const { authTokens } = useContext(AuthContext);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [teams, setTeams] = useState([]);
  const [sortCriteria, setSortCriteria] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`${apiUrl}events/${id}/`);
        setEvent(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching event:', err.response?.data || err.message);
        setError('Error fetching event.');
        setLoading(false);
      }
    };

    const fetchTeams = async () => {
      try {
        const response = await axios.get(`${apiUrl}teams/?event=${id}`);
        setTeams(response.data);
      } catch (err) {
        console.error('Error fetching teams:', err.response?.data || err.message);
        setError('Error fetching teams.');
      }
    };

    fetchEvent();
    fetchTeams();
  }, [id]);

  useEffect(() => {
    console.log('Sort criteria changed:', sortCriteria);
  }, [sortCriteria]);

  const handleSignup = async () => {
    if (!authTokens) {
      setError('You need to be logged in to sign up for an event.');
      return;
    }
    try {
      await axios.post(`${apiUrl}events/${id}/signup/`, {}, {
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
        },
      });
      setIsSignedUp(true);
      const updatedEvent = await axios.get(`${apiUrl}events/${id}/`);
      setEvent(updatedEvent.data);
    } catch (err) {
      console.error('Error signing up for event:', err.response?.data || err.message);
      setError('Error signing up for event.');
    }
  };

  const cancelSignup = async () => {
    if (!authTokens) {
      setError('You need to be logged in to cancel signup for an event.');
      return;
    }
    try {
      await axios.post(`${apiUrl}events/${id}/cancel_signup/`, {}, {
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
        },
      });
      setIsSignedUp(false);
      const updatedEvent = await axios.get(`${apiUrl}events/${id}/`);
      setEvent(updatedEvent.data);
    } catch (err) {
      console.error('Error canceling signup for event:', err.response?.data || err.message);
      setError('Error canceling signup for event.');
    }
  };
  

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const renderRaceIcon = (race) => {
    switch (race) {
      case 'zerg':
        return <img src="/images/zerg-icon.png" alt="Zerg" className="inline-block w-4 h-4 ml-2" />;
      case 'terran':
        return <img src="/images/terran-icon.png" alt="Terran" className="inline-block w-4 h-4 ml-2" />;
      case 'protoss':
        return <img src="/images/protoss-icon.png" alt="Protoss" className="inline-block w-4 h-4 ml-2" />;
      default:
        return null;
    }
  };

  const renderSc2RankIcon = (sc2rank) => {
    switch (sc2rank) {
      case 'bronze':
        return <img src="/images/sc2bronze-icon.png" alt="Bronze" className="inline-block w-4 h-4 ml-2" />;
      case 'silver':
        return <img src="/images/sc2silver-icon.png" alt="Silver" className="inline-block w-4 h-4 ml-2" />;
      case 'gold':
        return <img src="/images/sc2gold-icon.png" alt="Gold" className="inline-block w-4 h-4 ml-2" />;
      case 'platinum':
        return <img src="/images/sc2platinum-icon.png" alt="Platinum" className="inline-block w-4 h-4 ml-2" />;
      case 'diamond':
        return <img src="/images/sc2diamond-icon.png" alt="Diamond" className="inline-block w-4 h-4 ml-2" />;
      case 'master':
        return <img src="/images/sc2master-icon.png" alt="Master" className="inline-block w-4 h-4 ml-2" />;
      case 'grandmaster':
        return <img src="/images/sc2grandmaster-icon.png" alt="Grandmaster" className="inline-block w-4 h-4 ml-2" />;
      default:
        return null;
    }
  };

  const renderLeagueRank = (leaguerank) => {
    switch (leaguerank) {
      case 'iron':
        return <img src="/images/loliron-icon.png" alt="Iron" className="inline-block w-4 h-4 ml-2" />;
      case 'bronze':
        return <img src="/images/lolbronze-icon.png" alt="Bronze" className="inline-block w-4 h-4 ml-2" />;
      case 'silver':
        return <img src="/images/lolsilver-icon.png" alt="Silver" className="inline-block w-4 h-4 ml-2" />;
      case 'gold':
        return <img src="/images/lolgold-icon.png" alt="Gold" className="inline-block w-4 h-4 ml-2" />;
      case 'platinum':
        return <img src="/images/lolplatinum-icon.png" alt="Platinum" className="inline-block w-4 h-4 ml-2" />;
      case 'emerald':
        return <img src="/images/lolemerald-icon.png" alt="Emerald" className="inline-block w-4 h-4 ml-2" />;
      case 'diamond':
        return <img src="/images/loldiamond-icon.png" alt="Diamond" className="inline-block w-4 h-4 ml-2" />;
      case 'master':
        return <img src="/images/lolmaster-icon.png" alt="Master" className="inline-block w-4 h-4 ml-2" />;
      case 'grandmaster':
        return <img src="/images/lolgrandmaster-icon.png" alt="Grandmaster" className="inline-block w-4 h-4 ml-2" />;
      case 'challenger':
        return <img src="/images/lolchallenger-icon.png" alt="Challenger" className="inline-block w-4 h-4 ml-2" />;
      default:
        return null;
    }
  };

  const renderLeagueRole = (leaguerole) => {
    switch (leaguerole) {
      case 'top':
        return <img src="/images/loltop-icon.png" alt="Top" className="inline-block w-4 h-4 ml-2" />;
      case 'jungle':
        return <img src="/images/loljungle-icon.png" alt="Jungle" className="inline-block w-4 h-4 ml-2" />;
      case 'mid':
        return <img src="/images/lolmid-icon.png" alt="Mid" className="inline-block w-4 h-4 ml-2" />;
      case 'adc':
        return <img src="/images/loladc-icon.png" alt="Adc" className="inline-block w-4 h-4 ml-2" />;
      case 'support':
        return <img src="/images/lolsupport-icon.png" alt="Support" className="inline-block w-4 h-4 ml-2" />;
      case 'fill':
        return <img src="/images/lolfill-icon.png" alt="Fill" className="inline-block w-4 h-4 ml-2" />;
      default:
        return null;
    }
  };

  // Sorting function
  const sortPlayers = (players) => {
    if (!sortCriteria) return players;
  
    if (sortCriteria === 'league_rank') {
      console.log('Sorting by league rank');
      return players.slice().sort((a, b) => {
        const ranks = ['challenger', 'grandmaster', 'master', 'diamond', 'emerald', 'platinum', 'gold', 'silver', 'bronze', 'iron', 'n/a'];
        const rankA = a.leaguerank ? a.leaguerank.toLowerCase() : 'n/a';
        const rankB = b.leaguerank ? b.leaguerank.toLowerCase() : 'n/a';
        return ranks.indexOf(rankA) - ranks.indexOf(rankB);
      });
    }
  
    if (sortCriteria === 'cs2_elo') {
      console.log('Sorting by CS2 Elo');
      return players.slice().sort((a, b) => {
        const eloA = (a.cs2elo === 'n/a' || a.cs2elo === null || a.cs2elo === undefined) ? -Infinity : a.cs2elo;
        const eloB = (b.cs2elo === 'n/a' || b.cs2elo === null || b.cs2elo === undefined) ? -Infinity : b.cs2elo;
        return eloB - eloA;
      });
    }
    
    if (sortCriteria === 'doodadlevel') {
      console.log('Sorting by doodad');
      return players.slice().sort((a, b) => {
        const skill = ['expert', 'experienced', 'new']
        const skillA = a.doodadlevel ? a.doodadlevel.toLowerCase() : 'n/a';
        const skillB = b.doodadlevel ? b.doodadlevel.toLowerCase() : 'n/a';
        return skill.indexOf(skillA) - skill.indexOf(skillB);
      })
    }
    return players;
  };
  

  const renderPlayerDetails = (player) => (
    <div key={player.id} className="border border-gray-300 rounded-lg p-1 bg-gray-700 flex flex-col items-start w-48">
      <Link to={`/players/${player.id}`} className="text-xl font-bold text-blue-600 hover:underline mb-1">{player.name}</Link>
      <ul className="list-none p-0 text-sm space-y-1">
        {(event.game.includes('LoL')) && (
          <>
            <li className="flex items-center">LoL Rank: {player.leaguerank} {renderLeagueRank(player.leaguerank)}</li>
            <li className="flex items-center">Role: {player.leaguerole} {renderLeagueRole(player.leaguerole)}</li>
            <li className="flex items-center">Secondary Role: {player.leaguesecondaryrole} {renderLeagueRole(player.leaguesecondaryrole)}</li>
          </>
        )}
        {(event.game.includes('SC2')) && (
          <>
            <li className="flex items-center">SC2 Rank: {player.starcraftrank} {renderSc2RankIcon(player.starcraftrank)}</li>
            <li className="flex items-center">Race: {player.starcraftrace} {renderRaceIcon(player.starcraftrace)}</li>
          </>
        )}
        {(event.game.includes('CS2')) && (
          <li className="flex items-center">CS2 Elo: {player.cs2elo}</li>
        )}
        {(event.game.includes('Doodad')) && (
          <li className='flex items-center'>Doodad Skill: {player.doodadlevel}</li>
        )}
      </ul>
    </div>
  );
  
  

  

  const renderPlayerName = (player) => (
    <li key={player.id} className="mb-2">
      <Link to={`/players/${player.id}`} className="text-xl font-bold text-blue-600 hover:underline">{player.name}</Link>
    </li>
  );

  return (
    <div>
      <h1>{event.name}</h1>
      <p>Date: {event.date}</p>
      <p>Game: {event.game}</p>
      <p>Team Size: {event.teamsize}</p>


      <button
        onClick={isSignedUp ? cancelSignup : handleSignup}
        className={`mt-4 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
          isSignedUp ? 'bg-red-700 hover:bg-red-800' : 'bg-blue-700 hover:bg-blue-800'
        }`}
      >
        {isSignedUp ? 'Cancel Signup' : 'Sign Up'}
      </button>

      <div className="flex justify-end mt-4">
        <select
          value={sortCriteria}
          onChange={(e) => setSortCriteria(e.target.value)}
          className="border border-gray-300  bg-gray-500 rounded-lg p-2"
        >
          <option value="">Sort By</option>
          <option value="league_rank">League Rank</option>
          <option value="cs2_elo">CS2 Elo</option>
          <option value="doodadlevel">Doodad Skill</option>
        </select>
      </div>

      <h2>Signed up players</h2>
      {event.players.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-9 gap-0">
          {sortPlayers(event.players.flatMap(user => user.players)).map(player => renderPlayerDetails(player))}
        </div>
      ) : (
        <p>No players signed up yet.</p>
      )}

      <h2>Teams</h2>
      {teams.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {teams.filter(team => team.event === parseInt(id)).map(team => (
            <div key={team.id} className="border border-gray-300 rounded-lg p-4 bg-white shadow-md">
              <h3 className="team-name text-2xl font-semibold mb-4">{team.name}</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                {team.players.flatMap(user => user.players).map(player => renderPlayerName(player))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <p>No teams available.</p>
      )}
    </div>
  );
};

export default EventDetail;
