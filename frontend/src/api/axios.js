import axios from 'axios';

// Use the production URL directly
const API_URL = 'https://thefolio-jxpx.onrender.com/api';

const API = axios.create({
  baseURL: API_URL,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;