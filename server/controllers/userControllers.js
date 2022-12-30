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
    profile_type,
    aboutme,
  });

	if (user) {
		res.status(201).json({
			_id: user.id,
			name: user.name,
			surname: user.surname,
            aboutme: user.aboutme,
			email: user.email,
			profile_type: user.profile_type,
			pic: user.pic,
			isAdmin: user.isAdmin,
			isVerified: user.isVerified,
			isRequestSent: user.isRequestSent,
			favorites_list: user.favorites_list,
			token: generateToken(user._id),
			following_sent: user.following_sent,
		    following_approved: user.following_approved,
		    following_request_waiting: user.following_request_waiting
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
            aboutme: user.aboutme,
			email: user.email,
			profile_type: user.profile_type,
			pic: user.pic,
			isAdmin: user.isAdmin,
			token: generateToken(user._id),
			isVerified: user.isVerified,
			isRequestSent : user.isRequestSent,
			favorites_list: await Player.find({_id: { $in: user.favorites_list}}),
			following_sent: user.following_sent,
		    following_approved: user.following_approved,
		    following_request_waiting: user.following_request_waiting
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
      user.aboutme = req.body.aboutme || user.aboutme;
	  user.following_sent = req.body.following_sent || user.following_sent;
	  user.following_approved = req.body.following_approved || user.following_approved;
	  user.following_request_waiting= req.body.following_request_waiting || user.following_request_waiting;
	  
      if (req.body.password) {
        user.password = req.body.password;
      }
      const updatedUser = await user.save();

			res.json({
				_id: updatedUser._id,
				name: updatedUser.name,
				surname: updatedUser.surname,
                aboutme: user.aboutme,
				email: updatedUser.email,
				pic: updatedUser.pic,
				profile_type: user.profile_type,
				favorites_list : user.favorites_list,
				isRequestSent: user.isRequestSent,
		        isVerified: user.isVerified, 
				isAdmin: user.isAdmin,
				token: generateToken(updatedUser._id),
				following_sent: user.following_sent,
				following_approved: user.following_approved,
				following_request_waiting: user.following_request_waiting
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
      message: "User deleted",
    });
  } else {
    res.status(404);
    throw new Error("User not found!");
  }
});

const showRequests = asyncHandler(async (req, res, next) => {
  const requests = await Requests.find();
  if (requests) {
    res.json(requests);
  } else {
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

  if (requests) {
    res.json(requests);
  } else {
    res.status(404);
    throw new Error("Requests not found!");
  }
});

const sendRequest = asyncHandler(async (req, res, next) => { 
	const {email} = req.body;
	const user = await User.findOne({email}); 
	const name = user.name;
	const surname = user.surname;

  const request = await Requests.create({
    name,
    surname,
    email,
  });

  const requests = await Requests.find();

  if (request) {
    res.json(requests);
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
  const { email } = req.body;
  const user = await User.findOne({ email });
  user.isRequestSent = !user.isRequestSent;
  const updatedUser = await user.save();

  res.json({
    _id: updatedUser._id,
    name: updatedUser.name,
    surname: updatedUser.surname,
    email: updatedUser.email,
    isAdmin: updatedUser.isAdmin,
    aboutme: updatedUser.aboutme,
    token: generateToken(updatedUser._id),
    isVerified: updatedUser.isVerified,
    isRequestSent: updatedUser.isRequestSent,
	following_sent: updatedUser.following_sent,
	following_approved: updatedUser.following_approved,
	following_request_waiting: updatedUser.following_request_waiting
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
		following_sent: updatedUser.following_sent,
		following_approved: updatedUser.following_approved,
		following_request_waiting: updatedUser.following_request_waiting
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
		following_sent: updatedUser.following_sent,
		following_approved: updatedUser.following_approved,
		following_request_waiting: updatedUser.following_request_waiting
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

 const getUserById = asyncHandler(async(req,res,next) => {
	const {_id} = req.body ;
	
	const user = await User.findOne({_id});
	res.json(user);

});


const sendFollowRequest = asyncHandler(async(req,res,next) => {
	// user'in following_sent'ine ekle
	// data'nin following_request_waiting'e ekle
	const {user_id, data_id} = req.body;
	
	const user = await User.findOne({_id : user_id}) ;

	const second_user = await User.findOne({_id : data_id}) ;
	
	//console.log("users" ,user);
	//console.log(" second_userrrr" ,second_user);
    
	user.following_sent.push(second_user); // user'in icindeki following sentteki second userda following request waiting yok  
	const updatedUser = await user.save();
	
	//console.log(updatedUser);

    const third_user = await User.findOne({_id: user_id});

	second_user.following_request_waiting.push(third_user); // second user'in following request waitingdeki userda following request waiting yok
	//console.log(second_user);
	const bb = await second_user.save();
	//console.log(bb);
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
		following_sent: updatedUser.following_sent,
		following_approved: updatedUser.following_approved,
		following_request_waiting: updatedUser.following_request_waiting
	}); 
	//res.json(updatedUser);
});


const seeFollowRequests = asyncHandler(async(req,res,next) => {
	const {_id} = req.body;
	const user = await User.findOne({_id});
	//const following_requests_of_user = await User.find({_id: { $in: user.following_request_waiting}});
	//res.json(following_requests_of_user);
	res.json(user);
})

const deleteFollowingRequests = asyncHandler(async(req,res,next) => {
	// delete from user's following waiting
	// delete from data's following sent
const {user_id, data_id} = req.body ;

const user = await User.findOne({_id : user_id});
const second_user = await User.findOne({_id: data_id});
console.log(user);
console.log(second_user);



const following_request_waiting = await user.following_request_waiting.filter(following => { return following._id == data_id})
console.log(following_request_waiting[0]);

user.following_request_waiting.pull(following_request_waiting[0]) ;
const updatedUser = await user.save();
console.log(updatedUser);


const following_sent = await second_user.following_sent.filter(following => {
	console.log(following._id);
	console.log(user_id);
	return following._id == user_id})

console.log(following_sent[0]);
second_user.following_sent.pull(following_sent[0]);
const secondUpdatedUser = await second_user.save();
console.log(secondUpdatedUser);


//const following_requests_of_user = await User.find({_id: { $in: updatedUser.following_request_waiting}});
//res.json(following_requests_of_user);
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
	following_sent: updatedUser.following_sent,
	following_approved: updatedUser.following_approved,
	following_request_waiting: updatedUser.following_request_waiting
}); 


})

const approveFollowingRequests = asyncHandler(async(req,res,next) => {
	// delete from data's following sent
	// add to data's following approved
	// delete from user's following request waiting 

const {user_id, data_id} = req.body ;
const user = await User.findOne({_id : user_id});
const second_user = await User.findOne({_id: data_id});


const following_request_waiting = await user.following_request_waiting.filter(following => { return following._id == data_id});
user.following_request_waiting.pull(following_request_waiting[0]);

//user.following_request_waiting.pull(second_user); // data_id ile degistir
const updatedUser = await user.save();
//const user_copy = await User.findOne({_id: user_id});

console.log(second_user);
console.log(data_id);
const following_sent = await second_user.following_sent.filter(following => {return following._id == user_id});
console.log(following_sent[0]);
//second_user.following_sent.pull(user_copy); // user_id ile degistir
second_user.following_sent.pull(following_sent[0]);
second_user.following_approved.push(following_sent[0]);
console.log(second_user);
const secondUpdatedUser = await second_user.save();

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
	following_sent: updatedUser.following_sent,
	following_approved: updatedUser.following_approved,
	following_request_waiting: updatedUser.following_request_waiting
}); 
})

const getCurrentUserInfo = asyncHandler(async(req,res,next) => {
	const {_id} = req.body;
	const user = await User.findOne({_id});
	res.json({
		_id: user._id,
		name: user.name,
		surname: user.surname,
		email: user.email,
		pic: user.pic,
		profile_type: user.profile_type,
		favorites_list : await Player.find({_id: { $in: user.favorites_list}}),
		isRequestSent: user.isRequestSent,
		isVerified: user.isVerified, 
		isAdmin: user.isAdmin,
		token: generateToken(user._id),
		following_sent: user.following_sent,
		following_approved: user.following_approved,
		following_request_waiting: user.following_request_waiting
	}); 

})






export { getCurrentUserInfo, approveFollowingRequests, deleteFollowingRequests, seeFollowRequests, sendFollowRequest, getUserById, getFavorites, deleteFavorites, addFavorites, getUser, getAllUsers, changeIsSent, sendRequest, approveRequest, deleteRequest, showRequests, registerUser, loginUser, updateUserProfile, deleteUser };
