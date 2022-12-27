import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Nav } from "react-bootstrap";
import {
  updateProfile,
  deleteUser,
  sendRequest,
  changeIsSent,
} from "../../actions/userActions";
import green from "@material-ui/core/colors/green";
import { useNavigate } from "react-router-dom";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import "../../screens/VerificationRequests/verification.css";
import {
  Typography,
  Card,
  Box,
  Avatar,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Button,
} from "@mui/material";

function AccountInfoUser({data}) {
  console.log(data);
  
  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name) {
    var splittedName = name.split(" ");
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children:
        splittedName.length >= 2
          ? `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`
          : name[0],
    };
  }

  return (
    <div>
      <Card>
        <CardHeader
          avatar={
            data.isVerified && (
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <VerifiedUserIcon style={{ color: "green" }} />
              </div>
            )
          }
        />
        <CardContent>
          {!data.isVerified && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                pt: 3,
              }}
            ></Box>
          )}

          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Avatar
              sx={{
                height: 100,
                width: 100,
              }}
              {...stringAvatar(`${data.name} ${data.surname}`)}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                pt: 3,
              }}
            ></Box>
            <Typography color="textPrimary" gutterBottom variant="h5">
              {`${data.name} ${data.surname}`}
            </Typography>
            <Typography color="textSecondary" variant="body2">
              {data.email}
            </Typography>
            <Typography color="textSecondary" variant="body2">
              {data.profile_type}
            </Typography>
          </Box>
        </CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pt: 5,
          }}
        ></Box>
        <Divider />
        
      </Card>
    </div>
  );
}

export default AccountInfoUser;
