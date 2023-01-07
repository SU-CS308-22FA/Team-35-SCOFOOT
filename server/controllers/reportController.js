import Report from "../models/Report.js";
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

export const createreport = asyncHandler(async (req, res, next) => {
  const { postedById, selectedOption,text } = req.body;

  const user = await User.findById(postedById);

  const newreport = await Report.create({
    postedById,
    selectedOption,
    text,
  });
  const report = await Report.find();

  if (report) {
    res.status(201).json({ report });
  } else {
    res.status(400);
    throw new Error("Error occured.");
  }
});
