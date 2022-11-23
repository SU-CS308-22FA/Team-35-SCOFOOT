import {
  Grid,
  Container,
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  useTheme,
  Avatar,
} from "@mui/material";
import StadiumIcon from "@mui/icons-material/Stadium";
import PublicIcon from "@mui/icons-material/Public";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonIcon from "@mui/icons-material/Person";
import React, { useState } from "react";
import fenerlogo from "/Users/ruyadinmezel/Team-35-SCOFOOT-1/client/src/images/teamlogos/Fenerbahçe_SK.png";
import { Striker } from "./playerdata_mock";

export const StrikerInfo = (props) => {
  const theme = useTheme();

  const info = [
    {
      title: "Club",
      value: Striker.club,
      icon: PublicIcon,
      color: "#3F51B5",
    },
    {
      title: "Position",
      value: Striker.position,
      icon: StadiumIcon,
      color: "#3F51B5",
    },
    {
      title: "Birthday",
      value: Striker.bday,
      icon: GroupsIcon,
      color: "#3F51B5",
    },
  ];
  const info2 = [
    {
      title: "Height(cm)",
      value: Striker.height,
      icon: PersonIcon,
      color: "#3F51B5",
    },
    {
      title: "Weight(kg)",
      value: Striker.weight,
      icon: PersonIcon,
      color: "#3F51B5",
    },
  ];
  const stats = [
    {
      title: "Match Count",
      value: Striker.stats.matchCount,
    },
    {
      title: "Goals",
      value: Striker.stats.goal,
    },
    {
      title: "Asists",
      value: Striker.stats.asists,
    },
    {
      title: "Shot Per Match",
      value: Striker.stats.shotsPerMatch,
    },
    {
      title: "Pass Percentage",
      value: Striker.stats.passPercentage,
    },
    {
      title: "Successful Pass",
      value: Striker.stats.successPass,
    },
  ];
  const clubCareer = [
    {
      title: "Match Count",
      value: Striker.clubCareer.matchCount,
    },
    {
      title: "Goals",
      value: Striker.clubCareer.goals,
    },
    {
      title: "Yellow Cards",
      value: Striker.clubCareer.yellowCards,
    },
    {
      title: "Success",
      value: Striker.clubCareer.redCards,
    },
  ];

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
            <Grid item lg={6} sm={12} xl={3} xs={12}>
              <Card {...props}>
                <CardHeader title={Striker.name} />
                <Divider />
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      pt: 2,
                    }}
                  >
                    <Avatar
                      // src={Striker.playerImage}
                      sx={{ width: 100, height: 100 }}
                    ></Avatar>
                    {/* <Typography color="textPrimary" variant="body1">
            {Striker.name}
          </Typography> */}
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      pt: 2,
                    }}
                  >
                    {info.map(({ color, icon: Icon, title, value }) => (
                      <Box
                        key={title}
                        sx={{
                          p: 1,
                          textAlign: "center",
                        }}
                      >
                        <Typography color="textSecondary" variant="body1">
                          {title}
                        </Typography>

                        <Typography color="textPrimary" variant="body1">
                          {value}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      pt: 2,
                    }}
                  >
                    {info2.map(({ color, icon: Icon, title, value }) => (
                      <Box
                        key={title}
                        sx={{
                          p: 1,
                          textAlign: "center",
                        }}
                      >
                        <Typography color="textSecondary" variant="body1">
                          {title}
                        </Typography>

                        <Typography color="textPrimary" variant="body1">
                          {value}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item lg={6} sm={12} xl={9} xs={12}>
              <Card {...props}>
                <CardHeader title={"Player Information"} />
                <Divider />
                <CardContent>
                  <Grid item lg={6} sm={12} xl={1.5} xs={12}>
                    <Typography color="#3F51B5">STATS</Typography>
                  </Grid>
                  <Divider />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      pt: 2,
                    }}
                  >
                    {stats.map(({ title, value }) => (
                      <Grid item lg={6} sm={12} xl={1.5} xs={12}>
                        <Box
                          key={title}
                          sx={{
                            p: 1,
                            textAlign: "center",
                          }}
                        >
                          <Typography color="textSecondary" variant="body1">
                            {title}
                          </Typography>

                          <Typography color="#3F51B5" variant="h6">
                            {value}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Box>

                  <Grid item lg={6} sm={12} xl={1} xs={12}></Grid>
                  <Grid item lg={6} sm={12} xl={1.5} xs={12}>
                    <Typography color="#3F51B5">CLUB CAREER</Typography>
                  </Grid>

                  <Divider />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      pt: 2,
                    }}
                  >
                    {clubCareer.map(({ title, value }) => (
                      <Grid item lg={6} sm={12} xl={2} xs={12}>
                        <Box
                          key={title}
                          sx={{
                            p: 0,
                            textAlign: "center",
                          }}
                        >
                          <Typography color="textSecondary" variant="body1">
                            {title}
                          </Typography>

                          <Typography color="#3F51B5" variant="h6">
                            {value}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};
