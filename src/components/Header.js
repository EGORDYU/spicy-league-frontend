import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../AuthContext';
import axios from 'axios';

const Header = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const [playerId, setPlayerId] = useState(null);
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchPlayerId = async () => {
      if (user) {
        const token = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')).access : null;
        if (token) {
          try {
            const response = await axios.get(`${apiUrl}players/`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            if (response.data.length > 0) {
              setPlayerId(response.data[0].id);
            }
          } catch (error) {
            console.error('Error fetching player ID:', error);
          }
        }
      }
    };
    fetchPlayerId();
  }, [user]);

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-4">
        <li>
          <Link to="/" className="text-white hover:text-gray-400">Home</Link>
        </li>
        <li>
          <Link to="/info" className="text-white hover:text-gray-400">Info</Link>
        </li>
        <li>
          <Link to="/pchamps" className="text-white hover:text-gray-400">Previous Champions</Link>
        </li>
        <li>
          <Link to="/cseason" className="text-white hover:text-gray-400">Current Season</Link>
        </li>
        <li>
          <Link to="/players" className="text-white hover:text-gray-400">Players</Link>
        </li>
        {user ? (
          <>
            <li>
              <Link to={`/profile/${playerId}`} className="text-white hover:text-gray-400">Profile</Link>
            </li>
            <li>
              <span className="text-white">Welcome, {user.username}</span>
            </li>
            <li>
  <button
    onClick={handleLogout}
    className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition duration-300"
  >
    Logout
  </button>
</li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" className="text-white hover:text-gray-400">Login</Link>
            </li>
            <li>
              <Link to="/register" className="text-white hover:text-gray-400">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Header;
