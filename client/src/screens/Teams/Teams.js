import React from "react";

import { Box, Container } from "@mui/material";
import { TeamListResults } from "../../components/teams/team-list-results";
import { TeamListToolbar } from "../../components/teams/team-list-toolbar";

import { ThemeProvider } from "@mui/material";
// import { DashboardLayout } from "../components/dashboard-layout";
import { teams } from "../../components/teams/teams_mock";
import { theme } from "../../theme";
import Header from "../../components/Header/Header";

function Teams() {
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
            <TeamListToolbar />
            <Box sx={{ mt: 3 }}>
              <TeamListResults teams={teams} />
            </Box>
          </Container>
        </Box>
      </div>
    </ThemeProvider>
  );
}

export default Teams;
