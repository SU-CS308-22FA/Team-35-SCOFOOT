import express from "express";
import {
  createreport
} from "../controllers/reportController.js";

import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.post("/createreport", createreport);

export default router;
