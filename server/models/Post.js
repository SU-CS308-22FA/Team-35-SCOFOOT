import { Int32 } from "mongodb";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const postSchema = new mongoose.Schema(
  {
    postedById: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    name: { type: String, required: true },
    surname: { type: String, required: true },

    text: {
      type: String,
      required: false,
    },

    // pic: {
    //   type: String,
    //   required: true,
    // },

    // profile_type: { type: String, required: true },
    photo: {
      type: String,
      required: false,
    },

    // likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    likes: {
      type: Map,
      of: Boolean,
    },

    // comments: [
    //   {
    //     text: String,
    //     postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    //   },
    // ],

    comments: {
      type: Map,
      of: String,
    },
  },
  { timestamps: true }
);
const Post = mongoose.model("Post", postSchema);

export default Post;
