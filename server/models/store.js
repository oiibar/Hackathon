import { DataStore } from "notarealdb";

const store = new DataStore("./fake-data");
const tasks = store.collection("tasks");
const users = store.collection("users");
const infos = store.collection("info");

export { tasks, users, infos };
