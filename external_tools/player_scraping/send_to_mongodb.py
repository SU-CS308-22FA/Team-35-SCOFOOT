import os
import json
import pymongo

path = os.path.dirname(os.path.abspath(__file__))

with open('allPlayers.json', "rb") as json_file:
    allPlayers = json.load(json_file)

client = pymongo.MongoClient("mongodb+srv://scofoot:UXz6vxt2Axol4zDY@cluster0.duhjnpp.mongodb.net/?retryWrites=true&w=majority")
mydb = client["test"] #db
allPlayersList = []

for player in allPlayers:
    playerDict = {"name" : player}
    playerDict.update(allPlayers[player])
    allPlayersList.append(playerDict)

players = mydb["players"]

players.insert_many(allPlayersList)
