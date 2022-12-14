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
    Tabs,
    Tab,
  } from "@mui/material";
  import PropTypes from "prop-types";
  import Link from "@mui/material";
  import React, { useState } from "react";
  import { Row } from "react-bootstrap";
  
  function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography component={'div'}>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  export const TeamStatistics = ({teamdata, props}) => {
    const [value, setValue] = React.useState(0);
    console.log(teamdata);
    const generalTeamInfo = [
        {
          title: "Match",
          value: teamdata.match,
          color: "#3F51B5",
        },
        {
          title: "Win",
          value: teamdata.win,
          color: "#3F51B5",
        },
        {
          title: "Tie",
          value: teamdata.tie,
          color: "#3F51B5",
        },
        {
          title: "Loss",
          value: teamdata.loss,
          color: "#3F51B5",
        },
        {
          title: "Win Ratio",
          value: "%"+parseInt(100 * teamdata.win / teamdata.match).toString(),
          color: "#3F51B5",
        },
        {
          title: "Ranking",
          value: teamdata.ranking,
          color: "#3F51B5",
        },
      ];
      
    const defenseTeamInfo = [
        {
          title: "Goals Conceded",
          value: teamdata.goals_c,
          color: "#3F51B5",
        },
        {
          title: "Penalty of Team",
          value: teamdata.penalty,
          color: "#3F51B5",
        },
      ];
      
    const PassesTeamInfo = [
        {
          title: "Total Passes",
          value: teamdata.totalpass,
          color: "#3F51B5",
        },
        {
          title: "Successful Passes",
          value: teamdata.sucpass,
          color: "#3F51B5",
        },
        {
          title: "Pass Success Rate",
          value: "%"+parseInt(100 * teamdata.sucpass / teamdata.totalpass).toString(),
          color: "#3F51B5",
        },
    ];
      
    const AttackTeamInfo = [
        {
          title: "Shot",
          value: teamdata.shot,
          color: "#3F51B5",
        },
        {
          title: "Successful Shot",
          value: teamdata.sucshot,
          color: "#3F51B5",
        },
        {
          title: "Goal",
          value: teamdata.goal_attack,
          color: "#3F51B5",
        },
        {
          title: "Goal Frequency",
          value: "%"+parseInt(100 * teamdata.goal_attack / teamdata.sucshot).toString(),
          color: "#3F51B5",
        },
      ];
      
    const DiciplineTeamInfo = [
        {
          title: "Foul by Team",
          value: teamdata.foulteam,
          color: "#3F51B5",
        },
        {
          title: "Foul",
          value: teamdata.foul,
          color: "#3F51B5",
        },
        {
          title: "Yellow Card",
          value: teamdata.yellowcard,
          color: "#3F51B5",
        },
        {
          title: "Red Card",
          value: teamdata.redcard,
          color: "#3F51B5",
        },
      ];
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return (
      <Card {...props}>
        <CardHeader title={"Team Statistics"} />
        <Divider />
  
        <CardContent>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="GENERAL" {...a11yProps(0)} />
              <Tab label="DEFENCE" {...a11yProps(1)} />
              <Tab label="PASSES" {...a11yProps(2)} />
              <Tab label="ATTACKS" {...a11yProps(3)} />
              <Tab label="DICIPLINE" {...a11yProps(4)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                pt: 2,
              }}
            >
              {generalTeamInfo.map(({ title, value }) => (
                <Grid item lg={6} sm={12} xl={1.5} xs={12} key={title}>
                  <Box
                    
                    sx={{
                      p: 1,
                      textAlign: "center",
                    }}
                  >
                    <Typography component={'div'} color="textSecondary" variant="body1">
                      {title}
                    </Typography>
  
                    <Typography component={'div'} color="#3F51B5" variant="h6">
                      {value}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Box>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                pt: 2,
              }}
            >
              {defenseTeamInfo.map(({ title, value }) => (
                <Grid item lg={6} sm={12} xl={2} xs={12} key={title}>
                  <Box
                    
                    sx={{
                      p: 0,
                      textAlign: "center",
                    }}
                  >
                    <Typography component={'div'} color="textSecondary" variant="body1">
                      {title}
                    </Typography>
  
                    <Typography component={'div'} color="#3F51B5" variant="h6">
                      {value}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Box>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                pt: 2,
              }}
            >
              {PassesTeamInfo.map(({ title, value }) => (
                <Grid item lg={6} sm={12} xl={2} xs={12} key={title}>
                  <Box
                    
                    sx={{
                      p: 0,
                      textAlign: "center",
                    }}
                  >
                    <Typography component={'div'} color="textSecondary" variant="body1">
                      {title}
                    </Typography>
  
                    <Typography component={'div'} color="#3F51B5" variant="h6">
                      {value}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Box>
          </TabPanel>
          <TabPanel value={value} index={3}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                pt: 2,
              }}
            >
              {AttackTeamInfo.map(({ title, value }) => (
                <Grid item lg={6} sm={12} xl={2} xs={12} key={title}>
                  <Box
                    
                    sx={{
                      p: 0,
                      textAlign: "center",
                    }}
                  >
                    <Typography component={'div'} color="textSecondary" variant="body1">
                      {title}
                    </Typography>
  
                    <Typography component={'div'} color="#3F51B5" variant="h6">
                      {value}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Box>
          </TabPanel>
          <TabPanel value={value} index={4}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                pt: 2,
              }}
            >
              {DiciplineTeamInfo.map(({ title, value }) => (
                <Grid item lg={6} sm={12} xl={2} xs={12} key={title}>
                  <Box
                    
                    sx={{
                      p: 0,
                      textAlign: "center",
                    }}
                  >
                    <Typography component={'div'} color="textSecondary" variant="body1">
                      {title}
                    </Typography>
  
                    <Typography component={'div'} color="#3F51B5" variant="h6">
                      {value}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Box>
          </TabPanel>
        </CardContent>
      </Card>
    );
  };
  