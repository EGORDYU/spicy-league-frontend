// src/components/Pchamps.js
import React from 'react';
import previousSeasonsData from '../previousSeasonsData';

const Pchamps = () => {
  // Sort the seasons in descending order
  const sortedSeasonsData = [...previousSeasonsData].sort((a, b) => b.season - a.season);

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-10">Previous Champs</h1>
        {sortedSeasonsData.map((seasonData) => (
          <div key={seasonData.season} className="mb-16">
            <h2 className="text-3xl font-semibold mb-6 text-blue-600">Season {seasonData.season}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {seasonData.teams.map((team) => (
                <div key={team.name} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <h4 className="text-xl font-semibold mb-4 text-purple-700">{team.name}</h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    {team.players.map((player) => (
                      <li key={player}>{player}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h3 className="text-2xl font-semibold mb-2 text-green-600">Winner</h3>
              <p className="text-gray-700 mb-4">{seasonData.winner}</p>
              <h3 className="text-2xl font-semibold mb-2 text-yellow-600">Prize Pool</h3>
              <p className="text-gray-700">{seasonData.prizepool}</p>
            </div>
            {seasonData.awards && (
              <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h3 className="text-2xl font-semibold mb-4 text-red-600">Awards</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  {Object.entries(seasonData.awards).map(([key, value]) => (
                    <li key={key}>{key}: {value}</li>
                  ))}
                </ul>
              </div>
            )}
            {seasonData.draft_vod && (
              <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h3 className="text-2xl font-semibold mb-4 text-indigo-600">Draft VOD</h3>
                <a href={seasonData.draft_vod} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  Watch Draft VOD
                </a>
              </div>
            )}

          </div>
        ))}
      </div>
    </div>
  );
};

export default Pchamps;
