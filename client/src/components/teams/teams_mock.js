import { v4 as uuid } from "uuid";
import fenerlogo from "../../images/teamlogos/Fenerbahçe_SK.png";
import bjklogo from "../../images/teamlogos/BJK.png";
import gslogo from "../../images/teamlogos/GS.png";
import adana from "../../images/teamlogos/Adanademirspor.png";
import konya from "../../images/teamlogos/konyaspor.png";
import basak from "../../images/teamlogos/İstanbul_Başakşehir_FK.png";
import kayseri from "../../images/teamlogos/Kayserispor_logosu.png";
import trabzon from "../../images/teamlogos/Trabzonspor.png";
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
    country: "Türkiye",
    stadyum: "Ülker Stadyumu",
    capacity: 53586,
    technic_director: "Jorge Jesus",
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
