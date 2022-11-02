import User from "../models/User.js"
import generateToken from "../utils/generateToken.js";
import asyncHandler from "express-async-handler";

const registerUser = asyncHandler(async (req, res, next) => {
    const {name, surname, email, password} = req.body;
    
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists.');
    }

    const user = await User.create({
        name,
        surname, 
        email, 
        password,
    });

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            surname: user.surname,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    }
    else {
        res.status(400);
        throw new Error('Error occured.');
    }

});

export default registerUser;