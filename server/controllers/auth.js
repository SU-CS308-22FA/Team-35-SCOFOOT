import User from "../models/User.js";

export const getUsers = async (req, res) => {
   console.log("buraya girdi");
   res.send("Hello");
}

export const createUser = async (req, res) => {
    res.send("Hello");
}

export const signIn = async (req, res) => {
    res.send("Hello I am Sign In");
}