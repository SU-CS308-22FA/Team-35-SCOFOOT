import express from "express";
import {
  createreport,
  getreport
} from "../controllers/reportController.js";

import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.post("/createreport", createreport);
router.post("/getreport", getreport);

export default router;
