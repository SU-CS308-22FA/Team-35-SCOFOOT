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

import { Card } from "react-bootstrap";

function FavPlayers() {
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
          <Typography>Favorite players will come here</Typography>
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

export default FavPlayers;
