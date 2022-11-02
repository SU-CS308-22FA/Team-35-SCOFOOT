import express from 'express';

import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();
// login root structure

router.post('/login', async (req, res) => {
    try {
        // Get user input
        const email = req.body.email;
        const password = req.body.password;
        
        // Validate user input
        if (!(email && password)) {
          res.send("All input is required");
        }
        // Validate if user exist in our database
        const user = await User.findOne({ email: email });
      
        const match = await bcrypt.compare(password, user.password);
        console.log(match);
        if (user && match) {
          // Create token
          console.log("aa");
          const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
              expiresIn: "2h",
            }
          );
    
          // save user token
          user.token = token;
    
          // user
          res.json(user);
        }
        res.send("Invalid Credentials");
      } catch (err) {
        console.log(err);
      }
      
    
    });
    


export default router;