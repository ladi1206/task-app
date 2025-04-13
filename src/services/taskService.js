import axios from "axios";

const API_BASE_URL = "https://fastapi-backend-w4gw.onrender.com"; // your FastAPI backend URL

// GET request to fetch tasks
export const getTasks = async () => {
  const response = await axios.get(`${API_BASE_URL}/tasks`);
  return response.data;
};

export const createTask = async(taskData)=>
{
  const payload=
  {
    title: taskData.title,
    description: taskData.description || "",
    completed: taskData.completed || false,
  }
  const response = await axios.post(`${API_BASE_URL}/tasks`,payload);
  return response;
};