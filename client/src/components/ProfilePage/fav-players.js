import React from "react";
import {
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { FavPlayers } from "../FavoritePlayers/FavPlayers";
import { Card } from "react-bootstrap";

function FavPlayer() {
  return (
    <div>
      <Card>
        <CardHeader title={"Favorite Players"} />
        <Divider />
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          
          <FavPlayers />
        </CardContent>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pt: 18,
          }}
        ></Box>
      </Card>
    </div>
  );
}

export default FavPlayer;
