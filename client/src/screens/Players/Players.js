import React from "react";

import { Box, Container } from "@mui/material";
import { PlayerListResults } from "../../components/players/player-list-results";
import { PlayerListToolbar } from "../../components/players/player-list-toolbar";
import { ThemeProvider } from "@mui/material";

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
            <Box sx={{ mt: 3 }}>
            <PlayerListResults />
            </Box>
          </Container>
        </Box>
      
    </ThemeProvider>
  );
}

export default Players;
