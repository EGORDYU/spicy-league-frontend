// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/info">Info</Link>
        </li>
        <li>
          <Link to="/pchamps">Previous Champions</Link>
        </li>
        <li>
          <Link to="/cseason">Current Season</Link>
        </li>
        <li>
          <Link to="/players">Players</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
