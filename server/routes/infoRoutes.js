import express from "express";
import { addInfo } from "../controllers/infoController.js";

const router = express.Router();

router.post("/", addInfo);

export default router;
