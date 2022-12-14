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
    }

    res.status(200).json({size: count, players: players});
  } catch (error) {
    res.status(500).json(error);
  }
  
});

const getPlayer = asyncHandler(async (req, res, next) => {

  const id = mongoose.Types.ObjectId(req.query.id);

  try {
    
    // Fetch data starting from the 10th to the 50th
    let player = await Player.findById(mongoose.Types.ObjectId(id));
    const team = await Team.findById(mongoose.Types.ObjectId(player.club));
    player = player.toObject();
    player.club = team;
    player.stats = player.stats[0];
    player.clubCareer = player.clubCareer[0];
    
    res.status(200).json(player);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
  
});

const getAllTeams = asyncHandler(async (req, res, next) => {

  try {
    const teams = await Team.find().sort('ranking');

    res.status(200).json(teams);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
  
});


const getTeam = asyncHandler(async (req, res, next) => {

  const id = mongoose.Types.ObjectId(req.query.id);

  try {
    
    let team = await Team.findById(mongoose.Types.ObjectId(id));
    team = team.toObject();
    team.players = await Player.find({_id: { $in: team.players}});
    res.status(200).json(team);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
  
});


export { getAllPlayers, getPlayer, getAllTeams, getTeam };
