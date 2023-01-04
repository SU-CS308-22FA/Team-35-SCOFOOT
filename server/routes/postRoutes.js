import express from "express";
import {
  getFeedPosts,
  likePost,
  createPost,
  getUserPosts,
  commentPost,
  getAllPosts,
} from "../controllers/postContollers.js";

import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.post("/createpost", createPost);
router.get("/feed", getAllPosts);
router.get("/userposts", getUserPosts);
router.patch("/like", likePost);
router.patch("/comment", commentPost);

export default router;
