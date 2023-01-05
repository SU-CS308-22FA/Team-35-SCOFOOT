import Post from "../models/Post.js";
import User from "../models/User.js";
import asyncHandler from "express-async-handler";

// export const createPost = async (req, res) => {
//   try {
//     console.log("1");
//     const { postedById, text, photo } = req.body;
//     console.log("2");
//     const user = await User.findById(postedById);
//     console.log("3");
//     const newPost = new Post({
//       postedById,
//       name: user.name,
//       surname: user.surname,
//       text,
//       photo,
//       likes: {},
//       comments: {},
//     });
//     console.log("4");
//     await newPost.save();

//     const post = await Post.find();
//     res.status(201).json(post);
//   } catch (err) {
//     res.status(411).json({ message: err.message });
//   }
// };

export const createPost = asyncHandler(async (req, res, next) => {
  const { postedById, text, photo } = req.body;

  const user = await User.findById(postedById);

  const newpost = await Post.create({
    postedById,
    name: user.name,
    surname: user.surname,
    text,
    photo,
    likes: {},
    comments: {},
  });
  const post = await Post.find();

  if (post) {
    res.status(201).json({ post });
  } else {
    res.status(400);
    throw new Error("Error occured.");
  }
});

export const getUserPosts = async (req, res) => {
  try {
    console.log(req.body);
    const { postedById } = req.params;
    const post = await Post.find({ postedById });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getFeedPosts = async (req, res) => {
  try {
    console.log("getfeedposts");
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    console.log("getfeedposts");
    res.status(404).json({ message: err.message });
  }
};
export const getAllPosts = asyncHandler(async (req, res, next) => {
  try {
    const posts = await Post.find();
    console.log("getallposts1- controller");
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

export const likePost = async (req, res) => {
  try {
    const { _id } = req.params; //postid
    const { userId } = req.body; //userid
    const post = await Post.findById(_id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      _id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const commentPost = async (req, res) => {
  try {
    const { _id } = req.params; //postid
    const { userId, comment } = req.body; //userid
    const post = await Post.findById(_id);

    post.comments.set(userId, comment);

    const updatedPost = await Post.findByIdAndUpdate(
      _id,
      { comment: post.comment },
      { new: comment }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
