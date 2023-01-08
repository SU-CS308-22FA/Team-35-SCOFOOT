import Report from "../models/Report.js";
import User from "../models/User.js";
import asyncHandler from "express-async-handler";

export const createreport = asyncHandler(async (req, res, next) => {
  
  const { postedById,text,selectedOption } = req.body;
  console.log(req.body);
  const user = await User.findById(postedById);


  const newreport = await Report.create({
    postedById,
    
    text,
    selectedOption
  });
  const report = await Report.find();

  if (report) {
    res.status(201).json({ report });
  } else {
    res.status(400);
    throw new Error("Error occured.");
  }
});


export const getreport = asyncHandler(async (req, res, next) => {
  try {
    const posts = await Post.find();
    console.log("getallreports1- controller");
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});
