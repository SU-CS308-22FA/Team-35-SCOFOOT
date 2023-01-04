import express from "express";
import { generateVerificationCode, getVerificationCodes } from "../controllers/adminControllers.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.post("/generateVerificationCode", generateVerificationCode);
router.get("/getVerificationCodes", getVerificationCodes);

export default router;