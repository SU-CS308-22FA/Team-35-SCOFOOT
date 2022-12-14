import React from "react";
import { PlayerHeaderInfo } from "../../components/PlayerInfo/PlayerHeaderInfo";
import { Box, Container, Grid } from "@mui/material";
function PlayersInfo(player) {
  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          py: 3,
        }}
      >
        <Container maxWidth={false}>
          <Grid container spacing={2}>
          <PlayerHeaderInfo />
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default PlayersInfo;
