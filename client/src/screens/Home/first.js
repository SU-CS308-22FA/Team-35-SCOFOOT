import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";

import AssessmentIcon from "@mui/icons-material/Assessment";
import { theme } from "../../theme";
import { ThemeProvider } from "@mui/material";
import { lightGreen } from "@mui/material/colors";

export const First = (props) => (
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
                <AssessmentIcon />
              </Avatar>

              <Typography color="textSecondary" gutterBottom variant="overline">
                - Suggestion making mechanism towards customer preference
              </Typography>
            </Grid>

            <Grid item>
              <Typography color="textSecondary" gutterBottom variant="overline">
                - A widely ranged player statistics repository
              </Typography>
            </Grid>
            <Grid item>
              <Typography color="textSecondary" gutterBottom variant="overline">
                - Specifically designed algorithm for making suggestions
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
