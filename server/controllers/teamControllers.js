import Team from "../models/Team.js";
import Player from "../models/Player.js";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import ChangeRequest from "../models/ChangeRequest.js";

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

const searchPlayer = asyncHandler(async (req, res, next) => {
  const searchKey = req.query.searchKey;
  const start = Number(req.query.start);
  const stop = Number(req.query.stop);
  const rgx = (pattern) => new RegExp(`.*${pattern}.*`);
  const searchRgx = rgx(searchKey);

  const players = await Player.find({
    $or: [
      { name: { $regex: searchRgx, $options: "i" } },
    ],
  })
    .skip(start)
    .limit(stop)
    .catch(next);

  // Get the length of the documents in the collection
  const count = await Player.countDocuments({
    $or: [
      { name: { $regex: searchRgx, $options: "i" } },
    ],
  });
    
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

  res.status(200).json({size: count, players: players, currentSearchKey: searchKey});
  
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

const changeRequest = asyncHandler(async (req, res, next) => {
  try {
    const { player, title, request } = req.body;
    const changeRequest = await ChangeRequest.create({
      player,
      title,
      request
    });
    res.status(201).json(changeRequest);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
  
});

const allChangeRequests = asyncHandler(async (req, res, next) => {
  try {
    const changeRequests = await ChangeRequest.find();
    for (let i = 0; i < changeRequests.length; i++) {
      changeRequests[i] = changeRequests[i].toObject();
      changeRequests[i].playerName = await Player.findById(changeRequests[i].player, 'name');
    }
    res.status(201).json(changeRequests);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

const removeChangeRequest = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.body;
    const changeRequest = await ChangeRequest.findByIdAndRemove(id);
    res.status(201).json(changeRequest);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});


export { getAllPlayers, getPlayer, searchPlayer, getAllTeams, getTeam, changeRequest, allChangeRequests, removeChangeRequest };
