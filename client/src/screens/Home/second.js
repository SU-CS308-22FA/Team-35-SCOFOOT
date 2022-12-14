import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import { theme } from "../../theme";
import { ThemeProvider } from "@mui/material";
import { lightGreen } from "@mui/material/colors";

export const Second = (props) => (
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
                <EditIcon />
              </Avatar>

              <Grid item>
                <Typography
                  color="textSecondary"
                  gutterBottom
                  variant="overline"
                >
                  - Customizable football player profiles
                </Typography>
              </Grid>

              <Typography color="textSecondary" gutterBottom variant="overline">
                - Graphically visualized player information
              </Typography>
            </Grid>
            <Grid item>
              <Typography color="textSecondary" gutterBottom variant="overline">
                - Verified accounts for players and scouters
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
