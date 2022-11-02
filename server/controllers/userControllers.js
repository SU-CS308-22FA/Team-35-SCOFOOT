import User from "../models/User.js"
import generateToken from "../utils/generateToken.js";
import asyncHandler from "express-async-handler";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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

const loginUser = asyncHandler(async(req,res,next) => {

    try {
        // Get user input
        const email = req.body.email;
        const password = req.body.password;
        console.log(email);
        console.log(password);
        // Validate user input
        if (!(email && password)) {
          res.send("All input is required");
        }
        // Validate if user exist in our database
        const user = await User.findOne({ email: email });
      
        const match = await bcrypt.compare(password, user.password);
        if (user && match) {
          // Create token
          const token = generateToken();
          // save user token
          user.token = token;
    
          // user
          res.json(user);
        }
        else {
            res.send("Invalid Credentials");
        }
        
      } catch (err) {
        console.log(err);
      }
      
    
    });


export {registerUser, loginUser};
