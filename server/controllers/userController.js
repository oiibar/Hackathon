import { users } from "../models/store.js";

export const registerUser = (req, res) => {
  // res.setHeader("Access-Control-Allow-Credentials", true);
  // res.setHeader("Access-Control-Allow-Origin", "*");
  const { username, password } = req.body;
  const existingUsers = users.list();
  for (let user of existingUsers) {
    if (user.username === username && user.password === password) {
      res.json("You already have an account");
      return;
    }
  }
  const id = users.create({ username, password });
  res.json({ username, password, id });
};

export const loginUser = (req, res) => {
  // res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  const { username, password } = req.body;
  const existingUsers = users.list();
  for (let user of existingUsers) {
    if (user.username === username && user.password === password) {
      const id = user.id;
      res.json(id);
      return;
    }
  }
  res.json("You probably don't have an account.");
};
