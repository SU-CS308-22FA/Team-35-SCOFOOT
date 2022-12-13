import React from "react";
import { Box, Container, Grid } from "@mui/material";

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
            </Grid>
            <Grid item lg={6} sm={12} xl={3} xs={12}>
              <Box sx={{ mt: 0 }}>
                <TeamPlayers players={players} />
              </Box>
            </Grid>
            <Grid item lg={6} sm={12} xl={9} xs={12}>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default TeamsInfo;
