import Team from "../models/Team.js";
import generateToken from "../utils/generateToken.js";
import asyncHandler from "express-async-handler";

const getTeam = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  Team.find({}, function (err, teams) {
    var teamMap = {};

    teams.forEach(function (team) {
      teamMap[team._id] = team;
    });

    res.send(teamMap);
  });
});

export { getTeam };
