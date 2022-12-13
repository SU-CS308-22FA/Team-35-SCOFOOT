import React from "react";
import { Box, Container, Grid } from "@mui/material";
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
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default PlayersInfo;
