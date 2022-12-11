import express from "express";
import { getAllPlayers } from "../controllers/teamControllers.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.get("/all", getAllPlayers);

export default router;
