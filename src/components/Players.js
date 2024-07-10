// src/components/Players.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PlayersList from './PlayersList';
import PlayerDetail from './PlayerDetail';
import PlayerEdit from './PlayerEdit';

const Players = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<PlayersList />} />
        <Route path=":id" element={<PlayerDetail />} />
        <Route path="edit/:id" element={<PlayerEdit />} />
      </Routes>
    </div>
  );
};

export default Players;
