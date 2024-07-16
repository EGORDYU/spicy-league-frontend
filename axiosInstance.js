import axios from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL, // Use environment variable
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true // Ensure cookies are sent with requests
});

// Add a request interceptor to include CSRF token
axiosInstance.interceptors.request.use(
    (config) => {
        const csrfToken = Cookies.get('csrftoken');
        console.log('CSRF Token:', csrfToken); // Log the CSRF token
        if (csrfToken) {
            config.headers['X-CSRFToken'] = csrfToken;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
