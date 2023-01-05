import VerificationCode from "../models/VerificationCode.js";
import Team from "../models/Team.js";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import Player from "../models/Player.js";


const generateVerificationCode = asyncHandler(async (req, res, next) => {
    const { teamId } = req.body;
    let team = await Team.findById(teamId);
    team = team.toObject();
    const verificationCodes = []
    for (let i = 0; i < team.players.length; i++) {
        
        const verificationCode = await VerificationCode.create({
            team: team._id,
            player: await Player.findById(team.players[i]._id),
            code: (Math.random() + 1).toString(36).substring(7),
        });
        verificationCodes.push(verificationCode);
        console.log(verificationCode);
    }
    
    res.status(201).json(verificationCodes);
});

const getVerificationCodes = asyncHandler(async (req, res, next) => {
    try {
        const teamIds = await Team.find({}, '_id');
        var teamsAndVerificationCodes = []
        for (let i = 0; i < teamIds.length; i++) {
            let verificationCodes = await VerificationCode.find({team: teamIds[i]._id}, {team:0});
            for (let k = 0; k < verificationCodes.length; k++) {
                verificationCodes[k] = verificationCodes[k].toObject();
                verificationCodes[k].player = await Player.findById(verificationCodes[k].player);
            }
            teamsAndVerificationCodes.push({
                team : teamIds[i]._id,
                verificationCodes : verificationCodes
            });
        }
        res.status(201).json(teamsAndVerificationCodes);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
    
    
    

});

export { generateVerificationCode, getVerificationCodes };