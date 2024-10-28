import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../AuthContext';
import axios from 'axios';

const Header = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const [playerId, setPlayerId] = useState(null);
  const [profileImage, setProfileImage] = useState(null); // New state for profile image
  const [dropdownVisible, setDropdownVisible] = useState(false); // Dropdown visibility state
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
              setProfileImage(response.data[0].profimage); // Set profile image
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

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <nav className="bg-gray-800 p-4 relative">
      <ul className="flex space-x-4 items-center">
        <li>
          <Link to="/" className="text-white hover:text-gray-400">Home</Link>
        </li>
        <li>
          <Link to="/pchamps" className="text-white hover:text-gray-400">Hall of Fame</Link>
        </li>
        {/* <li>
          <Link to="/customs" className='text-white hover:text-gray-400'>Customs</Link>
        </li> */}
        {user ? (
          <>

            <li className="ml-auto relative">
              <div
                onClick={toggleDropdown}
                className="flex items-center space-x-2 cursor-pointer"
              >
                {profileImage && (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <span className="text-white">Welcome, {user.username}</span>
                {/* Dropdown icon */}
                <span className="text-white">▼</span> {/* Simple caret icon */}
              </div>
              {/* Dropdown menu */}
              {dropdownVisible && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                  <Link
                    to={`/profile/${playerId}`}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Edit Profile
                  </Link>
                  <a
                    href="/"
                    onClick={handleLogout}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </a>
                </div>
              )}
            </li>
          </>
        ) : (
          <>
            <li className="ml-auto">
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
