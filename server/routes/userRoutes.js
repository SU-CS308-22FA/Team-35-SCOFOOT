import express from "express";
import {
	registerUser,
	loginUser,
	updateUserProfile,
	deleteUser,
	showRequests,
	deleteRequest,
	approveRequest,
	sendRequest,
	changeIsSent,
	getAllUsers,
	getUser,
	addFavorites,
	deleteFavorites,
	getFavorites
} from "../controllers/userControllers.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.post("/profile", protect, updateUserProfile);
router.post("/profile/delete", protect, deleteUser);
router.get("/requests", showRequests);
router.post("/deleteRequest", deleteRequest);
router.post("/approveRequest", approveRequest);
router.post("/sendRequest", sendRequest);
router.post("/isSent", changeIsSent );
router.get("/allUsers", getAllUsers);
router.post("/getUser", getUser);
router.post("/addFavorites", addFavorites);
router.post("/deleteFavorites", deleteFavorites);
router.get("/favorites", getFavorites);
export default router;
