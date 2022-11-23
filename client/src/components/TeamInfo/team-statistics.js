import {
  Grid,
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  useTheme,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableHead,
} from "@mui/material";
import Link from "@mui/material";
import React, { useState } from "react";
import { Row } from "react-bootstrap";
import fenerlogo from "/Users/ruyadinmezel/Team-35-SCOFOOT-1/client/src/images/teamlogos/Fenerbahçe_SK.png";
import {
  AttackTeamInfo,
  defenseTeamInfo,
  DiciplineTeamInfo,
  generalTeamInfo,
  PassesTeamInfo,
} from "./stats";

export const TeamStatistics = (props) => {
  const theme = useTheme();

  return (
    <Card {...props}>
      <CardHeader title={"Team Statistics"} />
      <Divider />
      <CardContent>
        <Grid item lg={6} sm={12} xl={1.5} xs={12}>
          <Typography color="#3F51B5">GENERAL</Typography>
        </Grid>

        {/* <Row
          sx={{
            display: "flex",
            justifyContent: "center",
            pt: 2,
          }}
        >
          <Grid item lg={6} sm={12} xl={1} xs={12}></Grid>
          <Grid item lg={6} sm={12} xl={1.5} xs={12}>
            <Typography color="#3F51B5">GENERAL</Typography>
          </Grid>
          {/* <Grid item lg={6} sm={12} xl={1.5} xs={12}>
            <Typography color="#3F51B5">DEFENCE</Typography>
          </Grid>
          <Grid item lg={6} sm={12} xl={1.5} xs={12}>
            <Typography color="#3F51B5">PASSES</Typography>
          </Grid>
          <Grid item lg={6} sm={12} xl={1.5} xs={12}>
            <Typography color="#3F51B5">ATTACK</Typography>
          </Grid>
          <Grid item lg={6} sm={12} xl={1.5} xs={12}>
            <Typography color="#3F51B5">DICIPLINE</Typography>
          </Grid> 
        </Row> */}

        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pt: 2,
          }}
        >
          {generalTeamInfo.map(({ title, value }) => (
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
          <Typography color="#3F51B5">DEFENCE</Typography>
        </Grid>

        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pt: 2,
          }}
        >
          {defenseTeamInfo.map(({ title, value }) => (
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

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pt: 2,
          }}
        ></Box>
        <Grid item lg={6} sm={12} xl={1.5} xs={12}>
          <Typography color="#3F51B5">PASSES</Typography>
        </Grid>

        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pt: 2,
          }}
        >
          {PassesTeamInfo.map(({ title, value }) => (
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pt: 2,
          }}
        ></Box>
        <Grid item lg={6} sm={12} xl={1.5} xs={12}>
          <Typography color="#3F51B5">ATTACK</Typography>
        </Grid>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pt: 2,
          }}
        >
          {AttackTeamInfo.map(({ title, value }) => (
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pt: 2,
          }}
        ></Box>

        <Grid item lg={6} sm={12} xl={1.5} xs={12}>
          <Typography color="#3F51B5">DICIPLINE</Typography>
        </Grid>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pt: 2,
          }}
        >
          {DiciplineTeamInfo.map(({ title, value }) => (
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
  );
};
