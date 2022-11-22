import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";

import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import PeopleIcon from "@mui/icons-material/PeopleOutlined";
import { theme } from "../../theme";
import { ThemeProvider } from "@mui/material";
import { lightGreen } from "@mui/material/colors";

export const Third = (props) => (
  <ThemeProvider theme={theme}>
    <Card sx={{ height: "100%" }} {...props}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Grid item>
              <Avatar
                sx={{
                  backgroundColor: lightGreen[500],
                  height: 56,
                  width: 56,
                }}
              >
                <PeopleIcon />
              </Avatar>

              <Typography color="textSecondary" gutterBottom variant="overline">
                Aims to improve structuring in Turkish Super League teams
                groundwork with young players:
              </Typography>
            </Grid>
            <Grid item>
              <Typography color="textSecondary" gutterBottom variant="overline">
                - Dynamism & Energy
              </Typography>
            </Grid>
            <Grid item>
              <Typography color="textSecondary" gutterBottom variant="overline">
                - Low injury rate
              </Typography>
            </Grid>
            <Grid item>
              <Typography color="textSecondary" gutterBottom variant="overline">
                - Short recovery time
              </Typography>
            </Grid>
            <Grid item>
              <Typography color="textSecondary" gutterBottom variant="overline">
                - Customizable football player profiles
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Box
          sx={{
            pt: 2,
            display: "flex",
            alignItems: "center",
          }}
        ></Box>
      </CardContent>
    </Card>
  </ThemeProvider>
);
