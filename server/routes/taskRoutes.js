import express from "express";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  toggleTaskDone,
} from "../controllers/taskController.js";

const router = express.Router();

router.get("/", getTasks);
router.post("/create", createTask);
router.put("/change", updateTask);
router.post("/delete", deleteTask);
router.put("/done", toggleTaskDone);

export default router;
