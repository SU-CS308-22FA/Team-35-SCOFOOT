import { Int32 } from "mongodb";
import mongoose from "mongoose";
import Player from "./Player.js";

const teamSchema = mongoose.Schema({
  _id: { type: String },
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
        name: { type: String },
        playerImage: { type: String },
        club: { type: String },
        bday: { type: String },
        height: { type: String },
        weight: { type: String },
        position: { type: String },
        contrEnd: { type: String },
        nationality: { type: String },
        bplace: { type: String },
        value: { type: String },

      stats: 
        {
          matchCount: { type: String },
          matchesNotConceded: { type: String },
          bpSuccess: { type: String },
          concedes: { type: String },
          concedesSavesPA: { type: String },
          concedesSavesNPA: { type: String },
          goal: { type: String },
          asists: { type: String },
          shotsPerMatch: { type: String },
          firstShotPerMatch: { type: String },
          passPercentage: { type: String },
          dripPerMatch: { type: String },
          winBallPerMatch: { type: String },
          winAirBallPerMatch: { type: String },
          winDuelPercentage: { type: String },
          successPass: { type: String },
          succesCrossPerMatch: { type: String },
        },
      

        clubCareer: 
          {
            matchCount: { type: String },
            goals: { type: String },
            yellowCards: { type: String },
            redCards: { type: String },
          },
      }
  ],
});

const Team = mongoose.model("Team", teamSchema);

export default Team;
