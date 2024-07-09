// src/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

export const fetchPlayers = () => {
    return axios.get(`${API_BASE_URL}/players/`);
};

export const fetchPlayer = (id) => {
    return axios.get(`${API_BASE_URL}/players/${id}/`);
};

export const createPlayer = (playerData) => {
    return axios.post(`${API_BASE_URL}/players/`, playerData);
};

export const updatePlayer = (id, playerData) => {
    return axios.put(`${API_BASE_URL}/players/${id}/`, playerData);
};

export const deletePlayer = (id) => {
    return axios.delete(`${API_BASE_URL}/players/${id}/`);
};
