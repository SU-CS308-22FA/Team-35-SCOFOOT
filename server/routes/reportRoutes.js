import express from "express";
import {
  ,
} from "../controllers/reportContoller.js";

import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.post("/createreport", createreport);

export default router;
