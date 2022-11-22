import { v4 as uuid } from "uuid";
import fenerlogo from "/Users/ruyadinmezel/Team-35-SCOFOOT-1/client/src/images/teamlogos/Fenerbahçe_SK.png";
import bjklogo from "/Users/ruyadinmezel/Team-35-SCOFOOT-1/client/src/images/teamlogos/BJK.png";
import gslogo from "/Users/ruyadinmezel/Team-35-SCOFOOT-1/client/src/images/teamlogos/GS.png";
import adana from "/Users/ruyadinmezel/Team-35-SCOFOOT-1/client/src/images/teamlogos/Adanademirspor.png";
import konya from "/Users/ruyadinmezel/Team-35-SCOFOOT-1/client/src/images/teamlogos/konyaspor.png";
import basak from "/Users/ruyadinmezel/Team-35-SCOFOOT-1/client/src/images/teamlogos/İstanbul_Başakşehir_FK.png";
import kayseri from "/Users/ruyadinmezel/Team-35-SCOFOOT-1/client/src/images/teamlogos/Kayserispor_logosu.png";
import trabzon from "/Users/ruyadinmezel/Team-35-SCOFOOT-1/client/src/images/teamlogos/Trabzonspor.png";
export const teams = [
  {
    id: uuid(),
    club: "Fenerbahçe",
    teamImage: fenerlogo,
    win: 9,
    loss: 2,
    tie: 2,
    winratio: "69,2%",
    ranking: 1,
    match: 13,
  },

  {
    id: uuid(),
    club: "Galatasaray",
    teamImage: gslogo,
  },
  {
    id: uuid(),
    club: "Beşiktaş",
    teamImage: bjklogo,
  },
  {
    id: uuid(),
    club: "Trabzonspor",
    teamImage: trabzon,
  },
  {
    id: uuid(),
    club: "Başakşehir FK",
    teamImage: basak,
  },
  {
    id: uuid(),
    club: "Kayserispor",
    teamImage: kayseri,
  },
  {
    id: uuid(),
    club: "Adana Demirspor",
    teamImage: adana,
  },
  {
    id: uuid(),
    club: "Konyaspor",
    teamImage: konya,
  },
];
