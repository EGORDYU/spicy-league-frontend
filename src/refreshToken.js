import axios from 'axios';

const refreshToken = async () => {
    try {
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) throw new Error("No refresh token available");

        const response = await axios.post(`${process.env.REACT_APP_API_URL}/token/refresh/`, {
            refresh: refreshToken,
        });

        const newTokens = response.data;
        localStorage.setItem('access_token', newTokens.access);
        localStorage.setItem('refresh_token', newTokens.refresh);

        return newTokens.access;
    } catch (error) {
        console.error("Token refresh failed:", error);
        // Handle refresh failure, like redirecting to login
        return null;
    }
};

export default refreshToken;
