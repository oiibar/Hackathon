import axios from "axios";

// Base URL for API requests
const BASE_URL = "https://hackathon-serv.vercel.app";

export const api = axios.create({
  baseURL: BASE_URL,
});

export const loginUser = (username, password) => {
  return api.post("/users/login", { username, password });
};

export const registerUser = (username, password) => {
  return api.post("/users/register", { username, password });
};

export const getTasks = () => {
  return api.get("/tasks");
};

export const createTask = (taskData) => {
  return api.post("/tasks/create", taskData);
};

export const deleteTask = (taskId) => {
  return api.post("/tasks/delete", { id: taskId });
};

export const updateTask = (taskData) => {
  return api.put("/tasks/change", taskData);
};
