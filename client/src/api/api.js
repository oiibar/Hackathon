import axios from "axios";

const BASE_URL = "https://hackathon2-serv.vercel.app/api";

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "https://hackathon2-gold.vercel.app",
    "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
    "AAccess-Control-Allow-Credentials": true,
  },
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
