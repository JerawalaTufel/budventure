import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.0.104:5000', // Backend server URL
});

export default api;