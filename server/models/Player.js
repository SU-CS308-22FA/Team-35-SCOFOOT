import { Int32 } from "mongodb";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const playerSchema = mongoose.Schema({
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

  stats: [
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
  ],

  clubCareer: [
    {
      matchCount: { type: String },
      goals: { type: String },
      yellowCards: { type: String },
      redCards: { type: String },
    },
  ],
});

const Player = mongoose.model("Player", playerSchema);

export default Player;
