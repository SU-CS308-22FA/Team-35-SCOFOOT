import React from "react";

import { Box, Container, Grid } from "@mui/material";
import { PlayerListResults } from "../../components/players/player-list-results";
import { PlayerListToolbar } from "../../components/players/player-list-toolbar";
import { ThemeProvider } from "@mui/material";
import { TeamListResults } from "../../components/teams/team-list-results";

import { theme } from "../../theme";


function Players() {

  return (
    <ThemeProvider theme={theme}>
      
        <Box
          sx={{
            display: 'flex',
          }}
        >
          <Container maxWidth={false}>
          <PlayerListToolbar />
          <Grid container spacing={2}>
            <Grid item lg={3} sm={12} xl={3} xs={12}>
            <Box sx={{ mt: 3 }}>
                <TeamListResults />
              </Box>
            </Grid>
            <Grid item lg={9} sm={12} xl={9} xs={12}>
              
              <Box sx={{ mt: 3 }}>
                <PlayerListResults />
              </Box>
            </Grid>
          </Grid>
            
            
          </Container>
        </Box>
      
    </ThemeProvider>
  );
}

export default Players;
