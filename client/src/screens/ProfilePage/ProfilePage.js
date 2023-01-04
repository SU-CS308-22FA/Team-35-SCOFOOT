import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import AccountInfo from "../../components/ProfilePage/account-info";
import AboutMe from "../../components/ProfilePage/about-me";
import FavPlayers from "../../components/ProfilePage/fav-players";
import Posts from "../../components/ProfilePage/posts";

import PostShare from "../../components/ProfilePage/postShare";
import PostWidget from "../../components/ProfilePage/postwidget";

function ProfilePage() {
  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <Typography sx={{ mb: 3 }} variant="h4">
            My Profile
          </Typography>
          <Grid container spacing={1}>
            <Grid item lg={4} md={10} xs={12}>
              <AccountInfo />
              <Box
                sx={{
                  flexGrow: 1,
                  py: 0.5,
                }}
              ></Box>
              <AboutMe></AboutMe>
              <Box
                sx={{
                  flexGrow: 1,
                  py: 0.5,
                }}
              ></Box>
              <FavPlayers />
            </Grid>
            <Grid item lg={8} md={6} xs={12}>
              <PostShare></PostShare>
              <Posts></Posts>
              <PostWidget></PostWidget>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default ProfilePage;
