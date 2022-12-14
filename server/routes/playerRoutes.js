import express from "express";
import { getAllPlayers, getPlayer } from "../controllers/teamControllers.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.get("/all", getAllPlayers);
router.get("/playerInfo", getPlayer);

export default router;
