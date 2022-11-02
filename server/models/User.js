import { Int32 } from "mongodb";
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    
    name: String,
    surname: String,
    email: String,
    password: String,
    isAdmin: Boolean,
    createdAt: Date,
    updatedAt: Date,
    __v : Number,


});

const User = mongoose.model('User', userSchema);

export default User;
