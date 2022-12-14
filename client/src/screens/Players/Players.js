import React from "react";
import { Box, Container } from "@mui/material";
import { PlayerListResults } from "../../components/players/player-list-results";
import { PlayerListToolbar } from "../../components/players/player-list-toolbar";
import { ThemeProvider } from "@mui/material";

import { Button, Col } from "react-bootstrap";
// import { DashboardLayout } from "../components/dashboard-layout";
import { players } from "../../components/players/players_mock";
import { theme } from "../../theme";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { playerGet } from "../../actions/playerActions";

function Players() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const playerResponse = useSelector((state) => state.playerGet);
  const { loading, error, playerInfo } = playerResponse;

  var playerListLoading = true;

  let playerList = [];

  useEffect(() => {
    if (playerInfo) {
      console.log(playerInfo);
    }
    for(var k in playerInfo) {
      playerInfo[k]['players'].forEach(element => {
        playerList.push(element);
      });
    }
    playerListLoading = false;
  }, [navigate, playerInfo]);

  const handleClick = (event) => {
    event.preventDefault();
    dispatch(playerGet());
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8,
          }}
        >
          <Container maxWidth={false}>
          <Button
            variant="primary"
            disabled={loading}
            onClick={!loading ? handleClick : null}
          >
            {loading ? 'Loading…' : 'Click to load'}
          </Button>
            <PlayerListToolbar />
            <Box sx={{ mt: 3 }}>
              <PlayerListResults players={players} />
            </Box>
          </Container>
        </Box>
      </div>
    </ThemeProvider>
  );
}

export default Players;
