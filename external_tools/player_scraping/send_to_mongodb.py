import os
import json
import pymongo
from bson.objectid import ObjectId

path = os.path.dirname(os.path.abspath(__file__))

with open('allTeamsAndPlayers.json', "rb") as json_file:
    allTeams = json.load(json_file)

client = pymongo.MongoClient("mongodb+srv://scofoot:UXz6vxt2Axol4zDY@cluster0.duhjnpp.mongodb.net/?retryWrites=true&w=majority")
mydb = client["test"] #db
teams = mydb["teams"]
players = mydb["players"]

for teamKey in allTeams:
    playersList = teamKey["players"]
    teamKey["players"] = []
    team = teams.insert_one(teamKey)
    playersId = []
    for player in playersList:
        player["club"] = team.inserted_id
        inserted_player = players.insert_one(player)
        playersId.append(inserted_player.inserted_id)
    teams.update_one({'_id': team.inserted_id},  {'$set': {"players": playersId}})
    print(playersId)
