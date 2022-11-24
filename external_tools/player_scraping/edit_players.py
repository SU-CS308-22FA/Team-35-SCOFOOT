def repairAllPlayers(allPlayers):
    for i in allPlayers:
        if (allPlayers[i]["position"] == None
            and allPlayers[i]["weight"] == None
            and allPlayers[i]["contrEnd"] == None
            and allPlayers[i]["bplace"] == None
            and allPlayers[i]["playerImage"] != None
            and allPlayers[i]["club"] != None
            and allPlayers[i]["bday"] != None
            and allPlayers[i]["height"] != None):
                    allPlayers[i]["position"] = allPlayers[i]["height"]
                    allPlayers[i]["height"] = None


    return allPlayers
