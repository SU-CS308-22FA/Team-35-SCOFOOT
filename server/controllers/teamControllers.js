import Team from "../models/Team.js";
import Player from "../models/Player.js";
import generateToken from "../utils/generateToken.js";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";

const getAllPlayers = asyncHandler(async (req, res, next) => {

  const start = Number(req.query.start);
  const stop = Number(req.query.stop);

  try {
    // Get the length of the documents in the collection
    const count = await Player.countDocuments();
    
    // Fetch data starting from the 10th to the 50th
    const players = await Player.find().skip(start).sort('name').limit(stop);

    var team, clubInfo;
    for (let i = 0; i < players.length; i++) {
      team = await Team.findById(mongoose.Types.ObjectId(players[i].club));
      var clubName = team.club;
      var clubId = team._id;
      var clubInfo = {
        name: clubName,
        _id: clubId
      }
      players[i] = players[i].toObject();
      players[i].club = clubInfo;
      console.log(players[i].club);
    }

    res.status(200).json({size: count, players: players});
  } catch (error) {
    res.status(500).json(error);
  }
  
  

});

export { getAllPlayers };
