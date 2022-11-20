import express from "express";
import {
	registerUser,
	loginUser,
	updateUserProfile,
	deleteUser,
	showRequests
} from "../controllers/userControllers.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.post("/profile", protect, updateUserProfile);
router.post("/profile/delete", protect, deleteUser)
router.get("/requests", showRequests);
export default router;
