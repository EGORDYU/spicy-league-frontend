import React, { useState } from 'react';
import previousSeasonsData from '../previousSeasonsData';

const Pchamps = () => {
  // Sort the seasons in descending order
  const sortedSeasonsData = [...previousSeasonsData].sort((a, b) => b.season - a.season);
  
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const highlightText = (text, query) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={index} className="bg-orange-900">{part}</span>
      ) : (
        part
      )
    );
  };

  const filteredSeasonsData = sortedSeasonsData.filter(seasonData => 
    seasonData.teams.some(team => 
      team.name.toLowerCase().includes(searchQuery) ||
      team.players.some(player => player.toLowerCase().includes(searchQuery))
    ) || seasonData.season.toString().includes(searchQuery)
  );
//640x1080
  return (
    <div className="min-h-screen py-10" >
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-10">Hall of Fame</h1>
        <div className="mb-6 text-center">
          <input
            type="text"
            placeholder="Search by season, team, or player"
            value={searchQuery}
            onChange={handleSearchChange}
            className="p-2 border border-gray-300 rounded bg-gray-500"
          />
        </div>
        {filteredSeasonsData.length > 0 ? (
          filteredSeasonsData.map((seasonData) => (
            <div key={seasonData.season} className="mb-16">
  <h2 className="text-3xl font-semibold mb-6 text-red-600" style={{ 
      backgroundColor: 'rgb(55,65,81)', 
      padding: '10px', 
      display: 'inline-block'
    }}>
    {seasonData.title && <div>{seasonData.title}</div>}
    <div>Season {seasonData.season}</div>
  </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {seasonData.teams.map((team) => (
                  <div key={team.name} className="bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                    <h4 className="text-2xl font-semibold mb-4 text-violet-500">{highlightText(team.name, searchQuery)}</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {team.players.map((player) => (
                        <li key={player}>{highlightText(player, searchQuery)}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap -mx-2 mb-8">
                <div className="w-full md:w-1/2 px-2 min-h-[200px]">
                  <div className="bg-gray-700 p-6 rounded-lg shadow-md h-full">
                    <h3 className="text-2xl font-semibold mb-2 text-green-600">Winner</h3>
                    <p className="mb-4 winner-team-name">{highlightText(seasonData.winner, searchQuery)}</p>
                    <h3 className="text-2xl font-semibold mb-2 text-yellow-600">Prize Pool</h3>
                    <p className="">{highlightText(seasonData.prizepool, searchQuery)}</p>
                  </div>
                </div>
                {seasonData.awards && (
                  <div className="w-full md:w-1/2 px-2 min-h-[200px]">
                    <div className="bg-gray-700 p-6 rounded-lg shadow-md h-full">
                      <h3 className="text-2xl font-semibold mb-4 text-red-600">Awards</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        {Object.entries(seasonData.awards).map(([key, value]) => (
                          <li key={key}>{key}: {highlightText(value, searchQuery)}</li>
                        ))}
                      </ul>
                      {seasonData.best_play_vod && (
                        <a href={seasonData.best_play_vod} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                          Best Play VOD
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
              {seasonData.draft_vod && (
                <div className="bg-gray-700 p-6 rounded-lg shadow-md mb-8">
                  <h3 className="text-2xl font-semibold mb-4 text-indigo-600">Draft VOD</h3>
                  <a href={seasonData.draft_vod} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    Watch Draft VOD
                  </a>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No matching seasons found.</p>
        )}
      </div>
    </div>
  );
};

export default Pchamps;
