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

function TeamsInfo() {
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
            <Grid item lg={6} sm={12} xl={12} xs={12}>
              <TeamInfo></TeamInfo>
            </Grid>
            <Grid item lg={6} sm={12} xl={3} xs={12}>
              <Box sx={{ mt: 0 }}>
                <TeamPlayers players={players} />
              </Box>
            </Grid>
            <Grid item lg={6} sm={12} xl={9} xs={12}>
              <TeamStatistics></TeamStatistics>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default TeamsInfo;
