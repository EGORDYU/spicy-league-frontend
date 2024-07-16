// src/components/Players.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PlayersList from './PlayersList';
import PlayerDetail from './PlayerDetail';


const Players = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<PlayersList />} />
        <Route path=":id" element={<PlayerDetail />} />

      </Routes>
    </div>
  );
};

export default Players;
