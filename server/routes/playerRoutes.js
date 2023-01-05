import express from "express";
import { getAllPlayers, getPlayer, searchPlayer, changeRequest, allChangeRequests, removeChangeRequest} from "../controllers/teamControllers.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.get("/all", getAllPlayers);
router.get("/playerInfo", getPlayer);
router.get("/playerSearch", searchPlayer);
router.post("/changeRequest", changeRequest);
router.post("/removeChangeRequest", removeChangeRequest);
router.get("/allChangeRequests", allChangeRequests);

export default router;
