import React from 'react';
import PlayersList from './PlayersList';
import Announcements from './Announcements';
import Cseason from './Cseason';

const Home = () => {
  const previousSeasonWinners = [
    {
      winningTeamName: "Team Jheffe",
      winningTeamPlayers: ["jheffe", "Lucky", "Kyle", "Holden", "Ryan"],
      prizepool: "Friendship",
      awards: {
        "MVP": "Lucky",
        "Most Improved Player": "RyanSC2",
        "Greenest Goblin": "EGOR",
        "Best Play Of Finals": "Ciki",
      },
    },
  ];

  return (
    <div className="min-h-screen py-10">
      <div className="container mx-auto px-4 space-y-8">
        <section>
          <h1 className="text-4xl font-bold text-center mb-6" >Announcements</h1>
          <Announcements />
        </section>
        <section className="flex space-x-4">
          <div className="w-1/2">
            <Cseason />
          </div>
          <div className="w-1/2 h-full bg-gray-700 p-6 rounded-lg shadow-lg flex flex-col justify-between" >
            <h1 className="text-4xl font-bold text-center mb-6">Previous Season Winners</h1>
            {previousSeasonWinners.map((winner, index) => (
              <div key={index} className="flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2 text-yellow-400">{winner.winningTeamName}</h2>
                  <p className="mb-2">Players: {winner.winningTeamPlayers.join(', ')}</p>
                  <p className="mb-2">Prize Pool: {winner.prizepool}</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mt-4 text-red-600">Awards</h3>
                  <ul>
                    {Object.entries(winner.awards).map(([award, player]) => (
                      <li key={award} className="mt-2">{award}: {player}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section>
          <h1 className="text-4xl font-bold text-center mb-6">Players List</h1>
          <PlayersList />
        </section>
      </div>
    </div>
  );
};

export default Home;
