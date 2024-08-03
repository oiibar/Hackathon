import axios from "axios";

const BASE_URL =
  "https://cors-anywhere.herokuapp.com/https://hackathon2-serv.vercel.app/api";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
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
