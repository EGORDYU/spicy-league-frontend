import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../AuthContext';
import axios from 'axios';

const Header = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const [playerId, setPlayerId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlayerId = async () => {
      if (user) {
        const token = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')).access : null;
        if (token) {
          try {
            const response = await axios.get(`http://127.0.0.1:8000/api/players/`, {
            
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
        {user ? (
          <>

              <li>
                <Link to={`/profile/${playerId}`}>Profile</Link>
              </li>

            <li>
              <span>Welcome, {user.username}</span>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Header;
