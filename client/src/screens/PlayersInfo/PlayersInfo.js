import React from "react";
import { Box, Container, Grid } from "@mui/material";
import { First } from "../Home/first";
import { TeamInfo } from "../../components/TeamInfo/team-info";
import { TeamStatistics } from "../../components/TeamInfo/team-statistics";
import Players from "../Players/Players";
import { PlayerListResults } from "../../components/players/player-list-results";
import { PlayerListToolbar } from "../../components/players/player-list-toolbar";
import { players } from "../../components/players/players_mock";
import { TeamPlayers } from "../../components/TeamInfo/teamplayers";

import { GoalKeeperInfo } from "../../components/PlayerInfo/goalkepper";
import { DefenseInfo } from "../../components/PlayerInfo/defense";
import { StrikerInfo } from "../../components/PlayerInfo/striker";
import { MidfielderInfo } from "../../components/PlayerInfo/midfielder";
function PlayersInfo() {
  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 3,
        }}
      >
        <Container maxWidth={false}>
          <Grid container spacing={2}>
            {/* <GoalKeeperInfo></GoalKeeperInfo> */}
            {/* <DefenseInfo></DefenseInfo> */}
            {/* <StrikerInfo></StrikerInfo> */}
            <MidfielderInfo></MidfielderInfo>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default PlayersInfo;
