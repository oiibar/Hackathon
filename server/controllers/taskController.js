import { tasks } from "../models/store.js";

export const getTasks = (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.json(tasks.list());
};

export const createTask = (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  const { usernames, task, done, tags, deadline, author } = req.body;
  tasks.create({ usernames, task, done, tags, deadline, author });
  res.json({ usernames, task, done, tags, deadline, author });
};

export const updateTask = (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  const { id, usernames, task, done, tags, deadline, author } = req.body;
  tasks.update({ id, usernames, task, done, tags, deadline, author });
  res.json({ id, usernames, task, done, tags, deadline, author });
};

export const deleteTask = (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  const { id } = req.body;
  tasks.delete(id);
  res.status(200).send(typeof id);
};

export const toggleTaskDone = (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  const { id } = req.body;
  const plan = tasks.get(id);
  const { usernames, tags, done, deadline, author } = plan;
  const updatedDone = !done;
  tasks.update({ id, usernames, tags, done: updatedDone, deadline, author });
  res.json({
    id,
    usernames,
    tags,
    done: updatedDone,
    deadline,
    author,
  });
};
