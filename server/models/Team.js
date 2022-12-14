import { Int32 } from "mongodb";
import mongoose from "mongoose";
import Player from "./Player.js";

const teamSchema = mongoose.Schema({
  club: { type: String },
  teamImage: { type: String },
  country: { type: String },
  stadium: { type: String },
  capacity: { type: String },
  technic_director: { type: String },

  stats: 
    {
      match: { type: Number },
      win: { type: Number },
      tie: { type: Number },
      loss: { type: Number },
      ranking: { type: Number },
      goals_c: { type: Number },
      penalty: { type: Number },
      totalpass: { type: Number },
      sucpass: { type: Number },
      shot: { type: Number },
      sucshot: { type: Number },
      goal_attack: { type: Number },
      cross: { type: Number },
      succross: { type: Number },
      foulteam: { type: Number },
      foul: { type: Number },
      yellowcard: { type: Number },
      redcard: { type: Number },
    },
  

  players: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Player'
    }
  ],
});

const Team = mongoose.model("Team", teamSchema);

export default Team;
