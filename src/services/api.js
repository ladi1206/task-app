// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://fastapi-backend-w4gw.onrender.com', // Replace with your backend URL
});

export const getTasks = async () => {
  const response = await api.get('/tasks/');
  return response.data;
};

export const createTask = async (task) => {
  const response = await api.post('/tasks/', task);
  return response.data;
};
