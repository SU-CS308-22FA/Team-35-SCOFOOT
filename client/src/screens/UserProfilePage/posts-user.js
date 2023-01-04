import React from "react";
import {
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  Button,
  Box,
  Card,
} from "@mui/material";

function Posts({data}) {
  return (
    <div>
      {" "}
      <Card>
        <CardHeader title={"Posts"} />
        <Divider />
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography>Accounts posts will appear here. </Typography>
        </CardContent>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pt: 30,
          }}
        ></Box>
      </Card>
    </div>
  );
}

export default Posts;
