import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
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
        } else {
            setUser(null);
            localStorage.removeItem('authTokens');
        }
    }, [authTokens]);

    const loginUser = async (username, password) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/token/', { username, password });
            setAuthTokens(response.data);
            setUser(jwtDecode(response.data.access));
            localStorage.setItem('authTokens', JSON.stringify(response.data));
        } catch (error) {
            throw error;
        }
    };

    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem('authTokens');
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
