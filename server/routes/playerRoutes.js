import express from "express";
import { getAllPlayers, getPlayer, searchPlayer} from "../controllers/teamControllers.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.get("/all", getAllPlayers);
router.get("/playerInfo", getPlayer);
router.get("/playerSearch", searchPlayer);

export default router;
