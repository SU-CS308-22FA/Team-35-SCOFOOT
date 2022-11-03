import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import asyncHandler from "express-async-handler";


const registerUser = asyncHandler(async (req, res, next) => {
	const { name, surname, email, password } = req.body;

	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(400);
		throw new Error("User already exists.");
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
	} else {
		res.status(400);
		throw new Error("Error occured.");
	}
});

const loginUser = asyncHandler(async (req, res, next) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	if (user && (await user.matchPassword(password))) {
		res.json({
			_id: user._id,
			name: user.name,
			surname: user.surname,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(user._id),
		});
	} else {
		res.status(401);
		throw new Error("Invalid Email or Password");
	}
});

const updateUserProfile = asyncHandler(async (req, res, next) => {
	const user = await User.findById(req.user._id);
	if (user) {
		try {
			user.name = req.body.name || user.name;
			user.surname = req.body.surname || user.surname;
			user.email = req.body.email || user.email;
			if (req.body.password) {
				user.password = req.body.password;
			}
			const updatedUser = await user.save();

			res.json({
				_id: updatedUser._id,
				name: updatedUser.name,
				surname: updatedUser.surname,
				email: updatedUser.email,
				token: generateToken(updatedUser._id),
			});
		} catch (error) {
			// 11000 error code is DuplicateKey error
			if (error.code === 11000) {
				res.status(401);
				throw new Error("Email already in use!");
			}
		}
		
	} else {
		res.status(404);
		throw new Error("User not found!");
	}
});

const deleteUser = asyncHandler(async (req, res, next) => {
	const user = await User.findById(req.user._id);
	if (user) {
		user.remove();
		res.json({
			message: "User deleted"
		});

	} else {
		res.status(404);
		throw new Error("User not found!");
	}
});

export { registerUser, loginUser, updateUserProfile, deleteUser };
