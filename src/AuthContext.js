import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const apiUrl = process.env.REACT_APP_API_URL;

    const [authTokens, setAuthTokens] = useState(() => 
        localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
    );
    const [user, setUser] = useState(() => 
        localStorage.getItem('authTokens') ? jwtDecode(JSON.parse(localStorage.getItem('authTokens')).access) : null
    );

    useEffect(() => {
        if (authTokens) {
            setUser(jwtDecode(authTokens.access));
            localStorage.setItem('authTokens', JSON.stringify(authTokens));

            // Set Axios default authorization header
            axios.defaults.headers.common['Authorization'] = `Bearer ${authTokens.access}`;

            // Set an interval to refresh the token every 3.5 minutes
            const interval = setInterval(() => {
                refreshToken();
            }, 1000 * 60 * 3.5); // 3.5 minutes

            return () => clearInterval(interval); // Cleanup on unmount
        } else {
            setUser(null);
            localStorage.removeItem('authTokens');
            delete axios.defaults.headers.common['Authorization'];
        }
    }, [authTokens]);

    const loginUser = async (username, password) => {
        try {
            const response = await axios.post(`${apiUrl}token/`, { username, password });
            setAuthTokens(response.data);
            setUser(jwtDecode(response.data.access));
            localStorage.setItem('authTokens', JSON.stringify(response.data));
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
        } catch (error) {
            throw error;
        }
    };

    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem('authTokens');
        delete axios.defaults.headers.common['Authorization'];
    };

    const refreshToken = async () => {
        try {
            const response = await axios.post(`${apiUrl}token/refresh/`, {
                refresh: authTokens.refresh,
            });
            setAuthTokens(response.data);
            setUser(jwtDecode(response.data.access));
            localStorage.setItem('authTokens', JSON.stringify(response.data));
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
        } catch (error) {
            logoutUser();  // Log out if refresh fails
        }
    };

    const contextData = {
        user,
        authTokens,
        loginUser,
        logoutUser,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
