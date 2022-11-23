import { Int32 } from "mongodb";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Player from "./Player";

const teamSchema = mongoose.Schema({
  _id: { type: String },
  club: { type: String },
  teamImage: { type: String },
  country: { type: String },
  stadium: { type: String },
  capacity: { type: String },
  technic_director: { type: String },

  stats: [
    {
      match: { type: Int32 },
      win: { type: Int32 },
      tie: { type: Int32 },
      loss: { type: Int32 },
      ranking: { type: Int32 },
      goals_c: { type: Int32 },
      penalty: { type: Int32 },
      totalpass: { type: Int32 },
      sucpass: { type: Int32 },
      shot: { type: Int32 },
      sucshot: { type: Int32 },
      goal_attack: { type: Int32 },
      cross: { type: Int32 },
      succross: { type: Int32 },
      foulteam: { type: Int32 },
      foul: { type: Int32 },
      yellowcard: { type: Int32 },
      redcard: { type: Int32 },
    },
  ],

  players: [Player],
});

const Team = mongoose.model("Team", teamSchema);

export default Team;
