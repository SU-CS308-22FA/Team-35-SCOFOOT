from selenium import webdriver
import chromedriver_autoinstaller
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
from selenium.webdriver.support.wait import WebDriverWait
import selenium.webdriver.support.expected_conditions as EC
from bs4 import BeautifulSoup
import os
import time
import json
import requests
import edit_players
import string
import pymongo

# Opening JSON file
with open('countries_translation.json', "rb") as json_file:
    nationalitiesDict = json.load(json_file)

path = os.path.dirname(os.path.abspath(__file__))

allTeams = []

def translate(key):
    if key == "Kaleci":
        return "Goal Keeper"
    elif key == "Defans":
        return "Defense"
    elif key == "Forvet":
        return "Striker"
    elif key == "Ortasaha":
        return "Midfielder"

    for dictKey in nationalitiesDict:
        if key.lower() == nationalitiesDict[dictKey]["name_tr"].lower():
            return nationalitiesDict[dictKey]["name"]

    return key

def convertTeamNames(teamName):
    if teamName == "Adana Demir":
        return "Adana Demirspor"
    elif teamName == "Başakşehir":
        return "Başakşehir FK"
    elif teamName == "Karagümrük":
        return "Fatih Karagümrük"
    
    return teamName

def getPlayers(teamDict):
    path = os.path.dirname(os.path.abspath(__file__))

    allPlayersList = []

    with open('allPlayers.json', "rb") as json_file:
        allPlayers = json.load(json_file)

    for player in allPlayers:
        playerDict = {"name" : player}
        playerDict.update(allPlayers[player])
        allPlayersList.append(playerDict)

    for player in allPlayersList:
        for i, team in enumerate(allTeams):
            if team['club'] == player['club']:
                allTeams[i]['players'].append(player)
                break
        


def getTeam(url, teamDict):
    driver.get(url.replace("ma%C3%A7lar", "istatistik", 1))
    WebDriverWait(driver, 20).until(EC.presence_of_element_located((By.XPATH, '//*[@id="widget-season-stats-1"]/div/div[1]/div/div/ul/li[1]/div/div/div[1]/div/div')))
    soup = BeautifulSoup(driver.find_element(By.XPATH, "//html").get_attribute('outerHTML'), "html.parser")
    teamPicture = soup.find("img", {"class": "p0c-team-information__crest"})
    headerInfo = soup.findAll("span", {"class": "p0c-team-information__item"})
    stats = soup.findAll("div", {"class": "Opta-Value"})
    shotStats = soup.findAll("span", {"class": "Opta-Value"})
    for i, item in enumerate(shotStats):
        shotStats[i] = int(item.text.replace(".", ""))

    teamDict["teamImage"] = ""
    for c in teamDict['club'].lower():
        if c not in string.ascii_lowercase:
            continue
        teamDict["teamImage"] += c
    
    teamDict["teamImage"] += ".png"

    with open(os.path.join(path, "teamImages", teamDict["teamImage"]), "wb") as f:
            f.write(requests.get(teamPicture['src']).content)

    for i, item in enumerate(headerInfo):
        headerInfo[i] = item.text[item.text.index(":") + 1:].replace(",", "").strip()

    for i, item in enumerate(stats):
        try:
            stats[i] = int(item.text.replace(".", ""))
        except:
            pass
        

    teamStats = {}

    teamDict["country"] = translate(headerInfo[0])
    teamDict["stadium"] = headerInfo[1]
    teamDict["capacity"] = headerInfo[2]
    teamDict["technic_director"] = headerInfo[3]

    teamStats["match"] = stats[0]
    teamStats["win"] = stats[1]
    teamStats["tie"] = stats[2]
    teamStats["loss"] = stats[3]
    #teamStats["winratio"] = stats[4]
    teamStats["ranking"] = stats[5]
    teamStats["goals_c"] = stats[6]
    #teamStats["goals_c_ratio"] = stats[7]
    #teamStats["golkapama"] = stats[8]
    teamStats["penalty"] = stats[9]
    teamStats["totalpass"] = stats[10]
    teamStats["sucpass"] = stats[11]
    #teamStats["passmin"] = stats[12]

    teamStats["shot"] = shotStats[0]
    teamStats["sucshot"] = shotStats[1]
    teamStats["goal_attack"] = shotStats[2]

    teamStats["cross"] = stats[13]
    teamStats["succross"] = stats[14]
    teamStats["foulteam"] = stats[26]
    teamStats["foul"] = stats[27]
    teamStats["yellowcard"] = stats[28]
    teamStats["redcard"] = stats[29]

    teamDict["stats"] = teamStats

    teamDict["players"] = []

    print(json.dumps(teamDict, indent=2))

    return teamDict

    

def main():

    driver.get("https://www.mackolik.com/puan-durumu/t%C3%BCrkiye-s%C3%BCper-lig/482ofyysbdbeoxauk19yg7tdt")

    soup = BeautifulSoup(driver.find_element(By.XPATH, "//html").get_attribute('outerHTML'), "html.parser")
    trsAllTeams = soup.findAll("tr", {"class": "p0c-competition-tables__row"})
    for item in trsAllTeams:
        teamName = item['data-team-name']
        teamDict = {"club": convertTeamNames(teamName)}
        teamDict = getTeam(item.find("a")['href'], teamDict)
        allTeams.append(teamDict)

    getPlayers(teamDict)

    with open(os.path.join(path, 'allTeamsAndPlayers.json'), 'w', encoding="utf-8") as fp:
        json.dump(allTeams, fp, ensure_ascii=False, indent=2)
        
    client = pymongo.MongoClient("mongodb+srv://scofoot:UXz6vxt2Axol4zDY@cluster0.duhjnpp.mongodb.net/?retryWrites=true&w=majority")
    mydb = client["test"] #db
    teams = mydb["teams"]
    teams.insert_many(allTeams)


if __name__ == "__main__":
    chromedriver_autoinstaller.install()
    driver = webdriver.Chrome()
    main()




















"""
for count, element in enumerate(trs):
    stats = []
    tds = element.find_elements(By.TAG_NAME, "td")
    if count == len(trs) - 1:
        continue
    for count, value in enumerate(tds):
        if count == 2:
            continue
        stats.append(value.text)

    player = {
        "no": stats[0],
        "name": stats[1],
        "value": stats[2],
        "position": stats[3],
        "age": stats[4],
        "match-count": stats[5],
        "goal-count": stats[6],
        "asist": stats[7],
        "yellow-card": stats[8],
        "red-card": stats[9],
        "first-11": stats[10],
        "play-time": stats[11]
    }
    print(player)
"""
