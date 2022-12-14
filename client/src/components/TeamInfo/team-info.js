import {
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
  export const TeamInfo = ({teamdata, props}) => {
    const theme = useTheme();

    const baseTeamImageUrl = "images/teams/";
  
    const info = [
      {
        title: "Country",
        value: teamdata.country,
        icon: PublicIcon,
        color: "#3F51B5",
      },
      {
        title: "Stadium",
        value: teamdata.stadium,
        icon: StadiumIcon,
        color: "#3F51B5",
      },
      {
        title: "Capacity",
        value: teamdata.capacity,
        icon: GroupsIcon,
        color: "#3F51B5",
      },
      {
        title: "Technical Director",
        value: teamdata.technic_director,
        icon: PersonIcon,
        color: "#3F51B5",
      },
    ];
  
    return (
      <Card {...props}>
        <CardHeader title={teamdata.club} />
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
              src={baseTeamImageUrl + teamdata.teamImage}
              sx={{ width: 200, height: 200 }}
            ></Avatar>
            {/* <Typography color="textPrimary" variant="body1">
                          {player.name}
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
                <Icon color="action" />
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
    );
  };
  