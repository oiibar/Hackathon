import express from "express";
import controllers from "../controllers/userController.js";
const { registerUser, loginUser } = controllers;

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
