import express from "express";
import { getAllTeams, getTeam } from "../controllers/teamControllers.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.get("/all", getAllTeams);
router.get("/teamInfo", getTeam);

export default router;
