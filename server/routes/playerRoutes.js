import express from "express";
import { getTeam } from "../controllers/teamControllers.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.get("/all", getTeam);

export default router;
