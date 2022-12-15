import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import asyncHandler from "express-async-handler";
import Requests from "../models/Requests.js";
import Player from "../models/Player.js";
import Team from "../models/Team.js"
import mongoose from "mongoose";


const registerUser = asyncHandler(async (req, res, next) => {
	const { name, surname, email, password, profile_type, pic } = req.body;

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
		pic,
		profile_type 
	});

	if (user) {
		res.status(201).json({
			_id: user.id,
			name: user.name,
			surname: user.surname,
			email: user.email,
			profile_type: user.profile_type,
			pic: user.pic,
			isAdmin: user.isAdmin,
			isVerified: user.isVerified,
			isRequestSent: user.isRequestSent,
			favorites_list: user.favorites_list,
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
			profile_type: user.profile_type,
			pic: user.pic,
			isAdmin: user.isAdmin,
			token: generateToken(user._id),
			isVerified: user.isVerified,
			isRequestSent : user.isRequestSent,
			favorites_list: await Player.find({_id: { $in: user.favorites_list}})
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
			user.profile_type = req.body.profile_type || user.profile_type;
			user.pic = req.body.pic || user.pic;
			if (req.body.password) {
				user.password = req.body.password;
			}
			const updatedUser = await user.save();

			res.json({
				_id: updatedUser._id,
				name: updatedUser.name,
				surname: updatedUser.surname,
				email: updatedUser.email,
				pic: updatedUser.pic,
				profile_type: user.profile_type,
				favorites_list : user.favorites_list,
				isRequestSent: user.isRequestSent,
		        isVerified: user.isVerified, 
				isAdmin: user.isAdmin,
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




const showRequests = asyncHandler(async (req, res, next) => {
 	const requests = await Requests.find() ;
 	if(requests){
		res.json(requests);
  	}

	else {
		res.status(404);
		throw new Error("Requests not found!");
	}

});

const deleteRequest = asyncHandler(async (req, res, next) => {
	
	const request = await Requests.findById(req.body._id);
	const deletedRequest = await request.remove();
	const requests = await Requests.find() ;
 	if(requests){
		res.json(requests);
  	}

	else {
		res.status(404);
		throw new Error("Requests not found!");
	}

});


const approveRequest = asyncHandler(async (req, res, next) => { // first delete it from the requests and then change isVerified feature of the User to true
	
	const request = await Requests.findById(req.body._id); // the request info ( name, surname, email) that will be deleted from requests map
	const email = request.email;	
	const deletedRequest = await request.remove();

	const requests = await Requests.find() ;
    const user = await User.findOne({email: email});
	user.isVerified = true; // useri verified olacak sekilde guncelledik
	const updatedUser = await user.save(); // user updatelendi
  


 	if(requests){
		res.json(requests);
  	}

	else {
		res.status(404);
		throw new Error("Requests not found!");
	}

});

const sendRequest = asyncHandler(async (req, res, next) => { 
	const {email} = req.body;
	const user = await User.findOne({email}); 
	const name = user.name;
	const surname = user.surname;
	
	const request  = await Requests.create({
		name,
		surname,
		email
	});

	const requests = await Requests.find();

	if (request) {
		res.json(requests) ;
	} else {
		res.status(400);
		throw new Error("Error occured.");
	}


});

const getUser = asyncHandler(async(req,res,next) => {
	const {email} = req.body;
    const user = await User.findOne({email});
	if(user){
		res.json(user);
	}
});

const changeIsSent = asyncHandler(async (req, res, next) => {
	const {email} = req.body;
	const user = await User.findOne({email});
	user.isRequestSent = !user.isRequestSent;
	const updatedUser = await user.save();

		
	res.json({
			_id: updatedUser._id,
			name: updatedUser.name,
			surname: updatedUser.surname,
			email: updatedUser.email,
			isAdmin: updatedUser.isAdmin,
			token: generateToken(updatedUser._id),
			isVerified: updatedUser.isVerified,
			isRequestSent : updatedUser.isRequestSent
		});
	
}); 

const getAllUsers = asyncHandler(async(req,res,next) => {
   const users = await User.find();
   if(users){
	res.json(users);
  }

else {
	res.status(404);
	throw new Error("Users not found!");
}
});

const addFavorites = asyncHandler(async(req,res,next) => {
	const {goalkeeper_id, user_id} = req.body ;
	
	const goal_keeper_id = goalkeeper_id;

	const player = await Player.findOne({_id: goal_keeper_id});
	const user = await User.findOne({_id: user_id});
	
	user.favorites_list.push(mongoose.Types.ObjectId(player._id));
	const updatedUser = await user.save();

	res.json({
		_id: updatedUser._id,
		name: updatedUser.name,
		surname: updatedUser.surname,
		email: updatedUser.email,
		pic: updatedUser.pic,
		profile_type: updatedUser.profile_type,
		favorites_list : await Player.find({_id: { $in: updatedUser.favorites_list}}),
		isRequestSent: updatedUser.isRequestSent,
		isVerified: updatedUser.isVerified, 
		isAdmin: updatedUser.isAdmin,
		token: generateToken(updatedUser._id),
	});

})


const deleteFavorites = asyncHandler(async(req,res,next) => {
	const {goalkeeper_id, user_id} = req.body ;
	
	const goal_keeper_id = goalkeeper_id;
    
	const player = await Player.findById(mongoose.Types.ObjectId(goal_keeper_id));
	const user = await User.findOne({_id: user_id});
	user.favorites_list.pull(player._id);
	const updatedUser = await user.save();
	
	res.json({
		_id: updatedUser._id,
		name: updatedUser.name,
		surname: updatedUser.surname,
		email: updatedUser.email,
		pic: updatedUser.pic,
		profile_type: updatedUser.profile_type,
		favorites_list : await Player.find({_id: { $in: updatedUser.favorites_list}}),
		isRequestSent: updatedUser.isRequestSent,
		isVerified: updatedUser.isVerified, 
		isAdmin: updatedUser.isAdmin,
		token: generateToken(updatedUser._id),
	});

});

 const getFavorites = asyncHandler(async(req,res,next) => {
	   
	   const start = Number(req.query.start);
       const stop = Number(req.query.stop);
	   const _id = req.query._id ;
	  
	   const user = await User.findOne({_id});
	   
	   let players = [];
	   const favorites_list = user.favorites_list;
	   const count = favorites_list.length ;
	   const sorted_favorites_list = favorites_list.slice(start,stop);
	   
	   for(let i = 0 ; i < sorted_favorites_list.length ; i++){
		const player = await Player.findById(mongoose.Types.ObjectId(sorted_favorites_list[i]));
		
		const team = await Team.findById(mongoose.Types.ObjectId(player.club));
        var clubName = team.club;
        player.club = clubName;
		
	    players.push(player);
		
	   }

	   res.json({size: count , players: players });
 });

export { getFavorites, deleteFavorites, addFavorites, getUser, getAllUsers, changeIsSent, sendRequest, approveRequest, deleteRequest, showRequests, registerUser, loginUser, updateUserProfile, deleteUser };
