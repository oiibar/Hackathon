// src/api/api.js
import axios from "axios";

// Base URL for API requests
const BASE_URL = "http://localhost:5000";

export const api = axios.create({
  baseURL: BASE_URL,
});

export const loginUser = (username, password) => {
  return api.post("/login", { username, password });
};

export const registerUser = (username, password) => {
  return api.post("/register", { username, password });
};

export const getTasks = () => {
  return api.get("/tasks");
};

export const createTask = (taskData) => {
  return api.post("/create", taskData);
};

export const deleteTask = (taskId) => {
  return api.post("/delete", { id: taskId });
};

export const updateTask = (taskData) => {
  return api.put("/change", taskData);
};
