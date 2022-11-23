import { v4 as uuid } from "uuid";
import fenerlogo from "/Users/ruyadinmezel/Team-35-SCOFOOT-1/client/src/images/teamlogos/Fenerbahçe_SK.png";

export const teamdata = {
  id: uuid(),
  club: "Fenerbahçe",
  teamImage: fenerlogo,

  win: 9,
  loss: 2,
  tie: 2,
  winratio: "69,2%",
  ranking: 1,
  match: 13,
  country: "Türkiye",
  stadium: "Ülker Stadyumu",
  capacity: 53586,
  technic_director: "Jorge Jesus",

  goals_c: 14,
  goals_c_ratio: 1.1,
  golkapama: 7,
  penalty: 3,
  tackle: "62%",
  ikili: "51,9%",
  airball: "57,3",

  totalpass: 5631,
  sucpass: 4.595,
  passratio: "81.6%",
  passmin: 433.2,
  longpass: "49,5%",

  shot: 143,
  sucshot: 70,
  goal_attack: 36,
  shottogoalratio: "25,2%",
  goalfrequency: "32,5",

  foulteam: 193,
  foul: 189,
  yellowcard: 24,
  redcard: 1,
};
