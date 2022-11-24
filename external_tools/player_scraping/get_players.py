from selenium import webdriver
import chromedriver_autoinstaller
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
from bs4 import BeautifulSoup
import os
import time
import json
import requests
import edit_players

# Opening JSON file
with open('countries_translation.json', "rb") as json_file:
    nationalitiesDict = json.load(json_file)

path = os.path.dirname(os.path.abspath(__file__))

allPlayers = {}

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

def getPlayerInfo(linkName):
    playerInfo = {}

    main_page = driver.current_window_handle
    playerPageLink = driver.find_element(By.LINK_TEXT, linkName)
    print(linkName)
    playerPageLink.click()

    # changing the handles to player page
    for handle in driver.window_handles:
        if handle != main_page:
            player_page = handle

    driver.switch_to.window(player_page)

    soup = BeautifulSoup(driver.find_element(By.XPATH, "//html").get_attribute('outerHTML'), "html.parser")
    generalInfoDiv = soup.find("div", {"style":"float:left;width:467px; height:198px;border-left:1px solid #e2e2e2"})

    nationalityParentDiv = generalInfoDiv.find("div", {"style": "float: left;margin-top: 20px;text-align: left"})
    nationalityDiv = nationalityParentDiv.find("div", {"style": "color: #16387C;font-family: Arial; font-size: 16px; font-weight: bold;padding-top:5px"})

    valueParentDiv = generalInfoDiv.find("div", {"style": "float:right;font-family: Arial;  font-size:18px; font-weight: bold;margin-top: 20px;"})
    playerClub = None
    playerValue = None
    if valueParentDiv:
        valueDiv = valueParentDiv.find("div", {"style": "font-size:14px"})
        clubDiv = valueParentDiv.find("div", {"itemprop": "affiliation"})
        playerClub = clubDiv.text.strip()
        playerValue = valueDiv.text.strip()

    playerNationality = nationalityDiv.text.strip()

    playerImageDiv = soup.find("div", {"id" : "dvPlayerDetails"})
    imgDiv = playerImageDiv.find("div", {"style" : "float:left;margin: 10px;width:150px;height: 180px;overflow: hidden;"})
    img = imgDiv.find("img")
    playerImgName = None
    if "?" in img["src"]:
        playerImgName = os.path.basename(img["src"][:img["src"].index("?")])
        with open(os.path.join(path, "images", playerImgName), "wb") as f:
            f.write(requests.get(img["src"]).content)

    values = generalInfoDiv.findAll("div", {"style":"width: 140px;"})
    values = values + generalInfoDiv.findAll("div", {"style":"width:140px;overflow:hidden"})


    generalInfo = []
    for count, value in enumerate(values):
        text = value.text
        if count == 0:
            text = text.replace(" ", "").replace("\n", "")
            if "(" in text:
                text = text[:text.index("(")]
        if count == 1 or count == 2:
            if "\xa0" in text:
                text = text[:text.index("\xa0")]
        text = text.replace(":", "").strip()

        generalInfo.append(text)

    playerInfo = {
        "playerImage": playerImgName,
        "club": playerClub,
        "bday": generalInfo[0] if len(generalInfo) > 0 else None,
        "height": generalInfo[1] if len(generalInfo) > 1 else None,
        "weight": generalInfo[2] if len(generalInfo) > 2 else None,
        "position": translate(generalInfo[3]) if len(generalInfo) > 3 else None,
        "contrEnd": generalInfo[4] if len(generalInfo) > 4 else None,
        "nationality": translate(playerNationality),
        "bplace": generalInfo[5] if len(generalInfo) > 5 else None,
        "value": playerValue
    }

    tbodies = soup.findAll("tbody")

    playerStats = None
    for t in tbodies:
        title = t.find("tr", {"class": "title"})
        if title and "Süper Lig 2022/2023 İstatistikleri" in title.text.strip():
            playerStats = t

    if playerStats:
        trStats = playerStats.findAll("tr", {"class": "opta-stat"})
        stats = []
        for tr in trStats:
            stats += tr.text.strip().split("\n")

        if playerInfo["position"] == "Goal Keeper":
            playerInfo["stats"] = {
                "matchCount" : stats[0] if len(stats) > 0 else None,
                "matchesNotConceded" : stats[1] if len(stats) > 1 else None,
                "bpSuccess" : stats[2] if len(stats) > 2 else None,
                "concedes" : stats[3] if len(stats) > 3 else None,
                "concedesSavesPA" : stats[4] if len(stats) > 4 else None,
                "concedesSavesNPA" : stats[5] if len(stats) > 5 else None
            }
        else:
            playerInfo["stats"] = {
                "matchCount" : stats[0] if len(stats) > 0 else None,
                "goal": stats[1] if len(stats) > 1 else None,
                "asists": stats[2] if len(stats) > 2 else None,
                "shotsPerMatch": stats[3].replace(",", ".") if len(stats) > 3 else None,
                "firstShotPerMatch": stats[4].replace(",", ".") if len(stats) > 4 else None,
                "passPercentage": stats[5] if len(stats) > 5 else None,
                "dripPerMatch": stats[6].replace(",", ".") if len(stats) > 6 else None,
                "winBallPerMatch": stats[7].replace(",", ".") if len(stats) > 7 else None,
                "winAirBallPerMatch": stats[8].replace(",", ".") if len(stats) > 8 else None,
                "winDuelPercentage": stats[9] if len(stats) > 9 else None,
                "successPass": stats[10] if len(stats) > 10 else None,
                "succesCrossPerMatch": stats[11].replace(",", ".") if len(stats) > 11 else None
            }

    TbodyClubCareer = None
    for t in tbodies:
        title = t.find("tr", {"class": "title"})
        if title and "Kulüp Kariyeri" in title.text.strip():
            TbodyClubCareer = t

    if TbodyClubCareer:
        trClubCareer = TbodyClubCareer.findAll("tr", {"style": "height:25px"})[1]
        clubCareer = []
        for tr in trClubCareer:
            newData = tr.text.strip().split("\n")
            if newData != ['']:
                clubCareer += newData

        playerInfo["clubCareer"] = {
            "matchCount" : clubCareer[0],
            "goals" : clubCareer[1],
            "yellowCards" : clubCareer[2],
            "redCards" : clubCareer[3]
        }

    allPlayers[linkName] = playerInfo


    driver.close()

    # change control to main page
    driver.switch_to.window(main_page)

def getPlayers(url):
    driver.get(url + "#squadTab")
    time.sleep(1)
    soup = BeautifulSoup(driver.find_element(By.XPATH, "//html").get_attribute('outerHTML'), "html.parser")

    tbody = soup.findAll("tbody")[3]
    trs = tbody.findAll("tr")
    blocked_text = ["No", "Ad", "Değer", "Poz.", "Yaş", "Maç", "", "Asist", "İlk11", "Süre"]

    break_all = False

    for tr in trs:
        tds = tr.findAll("td")
        for td in tds:
            a = td.find("a", href = True)
            if a and (a.text not in blocked_text):
                getPlayerInfo(a.text)
                #break_all = True
                #break
        #if break_all:
            #break

def main():

    driver.get("https://arsiv.mackolik.com/Puan-Durumu/1/TURKIYE-Super-Lig")

    soup = BeautifulSoup(driver.find_element(By.XPATH, "//html").get_attribute('outerHTML'), "html.parser")

    tbody = soup.find("tbody")
    trs = tbody.findAll("tr")

    break_all = False

    for tr in trs:
        tds = tr.findAll("td")
        for td in tds:
            a = td.find("a", href = True)
            if (a):
                a['href'] = "https:" + a['href']
                print(f"---- {a['href']} ----")
                getPlayers(a['href'])
                #break_all = True
                #break
        #if break_all:
            #break

    allPlayers = edit_players.repairAllPlayers(allPlayers)

    with open(os.path.join(path, 'allPlayers.json'), 'w', encoding="utf-8") as fp:
        json.dump(allPlayers, fp, ensure_ascii=False)


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
