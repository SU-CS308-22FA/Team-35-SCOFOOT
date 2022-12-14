import {
    Grid,
    Container,
    Box,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Typography,
    useTheme,
    Avatar,
    Tabs,
    Tab,
  } from "@mui/material";
  import PropTypes from "prop-types";
  import PublicIcon from "@mui/icons-material/Public";
  import React, { useEffect, useState } from "react";
  import Diversity3Icon from "@mui/icons-material/Diversity3";
  import SportsHandballIcon from "@mui/icons-material/SportsHandball";
  import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
  import HeightIcon from "@mui/icons-material/Height";
  import CakeIcon from "@mui/icons-material/Cake";
import { useLocation, useNavigate } from "react-router-dom";
import { playerGet } from "../../actions/playerActions";
import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider } from "react-bootstrap";
  
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
  
  export const PlayerHeaderInfo = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [player, setPlayer] = useState(null);
    const playerResponse = useSelector((state) => state.playerGet);
    const { loading, error, playerInfo } = playerResponse;

    const { state } = useLocation();
    const { id } = state || {};
    const [value, setValue] = useState(0);

    const [info, setInfo] = useState([]);
    const [info2, setInfo2] = useState([]);
    const [stats, setStats] = useState([]);
    const [clubCareer, setClubCareer] = useState([]);

    const basePlayerImageUrl = "images/players/";
    const baseTeamImageUrl = "images/teams/";

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    useEffect(() => {
      dispatch(playerGet(id));
    }, [navigate])
    
    useEffect(() => {
        console.log(playerInfo);
        setPlayer(playerInfo);
    }, [playerInfo]);

    useEffect(() => {
        if (player != null) {

            if (player.position === "Defense") {
                
                setInfo([
                    {
                      title: "Club",
                      value: player.club.club,
                      icon: Diversity3Icon,
                      color: "#3F51B5",
                    },
                    {
                      title: "Position",
                      value: player.position,
                      icon: SportsHandballIcon,
                      color: "#3F51B5",
                    },
                    {
                      title: "Height(cm)",
                      value: player.height,
                      icon: HeightIcon,
                      color: "#3F51B5",
                    },
                    {
                      title: "Weight(kg)",
                      value: player.weight,
                      icon: FitnessCenterIcon,
                      color: "#3F51B5",
                    },
                  ]);
                  setInfo2([
                    {
                      title: "Country",
                      value: player.nationality,
                      icon: PublicIcon,
                      color: "#3F51B5",
                    },
                    {
                      title: "Birthday",
                      value: player.bday,
                      icon: CakeIcon,
                      color: "#3F51B5",
                    },
                  ]);
                  if (player.stats) {
                    setStats([
                      {
                        title: "Match Count",
                        value: player.stats.matchCount,
                      },
                      {
                        title: "Goals",
                        value: player.stats.goal,
                      },
                      {
                        title: "Asists",
                        value: player.stats.asists,
                      },
                      {
                        title: "Shot Per Match",
                        value: player.stats.shotsPerMatch,
                      },
                      {
                        title: "Pass Percentage",
                        value: player.stats.passPercentage,
                      },
                      {
                        title: "Successful Pass",
                        value: player.stats.successPass,
                      },
                    ]);
                  }
                  setClubCareer([
                    {
                      title: "Match Count",
                      value: player.clubCareer.matchCount,
                    },
                    {
                      title: "Goals",
                      value: player.clubCareer.goals,
                    },
                    {
                      title: "Yellow Cards",
                      value: player.clubCareer.yellowCards,
                    },
                    {
                      title: "Success",
                      value: player.clubCareer.redCards,
                    },
                  ]);
            }
            if (player.position === "Goal Keeper") {
                setInfo([
                    {
                      title: "Club",
                      value: player.club.club,
                      icon: Diversity3Icon,
                      color: "#3F51B5",
                    },
                    {
                      title: "Position",
                      value: player.position,
                      icon: SportsHandballIcon,
                      color: "#3F51B5",
                    },
                    {
                      title: "Height(cm)",
                      value: player.height,
                      icon: HeightIcon,
                      color: "#3F51B5",
                    },
                    {
                      title: "Weight(kg)",
                      value: player.weight,
                      icon: FitnessCenterIcon,
                      color: "#3F51B5",
                    },
                  ]);
                  setInfo2([
                    {
                      title: "Country",
                      value: player.nationality,
                      icon: PublicIcon,
                      color: "#3F51B5",
                    },
                    {
                      title: "Birthday",
                      value: player.bday,
                      icon: CakeIcon,
                      color: "#3F51B5",
                    },
                  ]);
                  if (player.stats) {
                    setStats([
                      {
                        title: "Match Count",
                        value: player.stats.matchCount,
                      },
                      {
                        title: "Matches Not Conceded",
                        value: player.stats.matchesNotConceded,
                      },
                      {
                        title: "Conceded",
                        value: player.stats.concedes,
                      },
                      {
                        title: "Success",
                        value: player.stats.bpSuccess,
                      },
                    ]);
                  }
                  setClubCareer([
                    {
                      title: "Match Count",
                      value: player.clubCareer.matchCount,
                    },
                    {
                      title: "Goals",
                      value: player.clubCareer.goals,
                    },
                    {
                      title: "Yellow Cards",
                      value: player.clubCareer.yellowCards,
                    },
                    {
                      title: "Success",
                      value: player.clubCareer.redCards,
                    },
                  ]);
            }
            if (player.position === "Midfielder") {
              setInfo([
                {
                  title: "Club",
                  value: player.club.club,
                  icon: Diversity3Icon,
                  color: "#3F51B5",
                },
                {
                  title: "Position",
                  value: player.position,
                  icon: SportsHandballIcon,
                  color: "#3F51B5",
                },
                {
                  title: "Height(cm)",
                  value: player.height,
                  icon: HeightIcon,
                  color: "#3F51B5",
                },
                {
                  title: "Weight(kg)",
                  value: player.weight,
                  icon: FitnessCenterIcon,
                  color: "#3F51B5",
                },
              ]);
              setInfo2([
                {
                  title: "Country",
                  value: player.nationality,
                  icon: PublicIcon,
                  color: "#3F51B5",
                },
                {
                  title: "Birthday",
                  value: player.bday,
                  icon: CakeIcon,
                  color: "#3F51B5",
                },
              ]);
              if (player.stats) {
                setStats([
                  {
                    title: "Match Count",
                    value: player.stats.matchCount,
                  },
                  {
                    title: "Goals",
                    value: player.stats.goal,
                  },
                  {
                    title: "Asists",
                    value: player.stats.asists,
                  },
                  {
                    title: "Shot Per Match",
                    value: player.stats.shotsPerMatch,
                  },
                  {
                    title: "Pass Percentage",
                    value: player.stats.passPercentage,
                  },
                  {
                    title: "Successful Pass",
                    value: player.stats.successPass,
                  },
                ]);
              }
              setClubCareer([
                {
                  title: "Match Count",
                  value: player.clubCareer.matchCount,
                },
                {
                  title: "Goals",
                  value: player.clubCareer.goals,
                },
                {
                  title: "Yellow Cards",
                  value: player.clubCareer.yellowCards,
                },
                {
                  title: "Success",
                  value: player.clubCareer.redCards,
                },
              ]);
            }
            if (player.position === "Striker") {
              setInfo([
                {
                  title: "Club",
                  value: player.club.club,
                  icon: Diversity3Icon,
                  color: "#3F51B5",
                },
                {
                  title: "Position",
                  value: player.position,
                  icon: SportsHandballIcon,
                  color: "#3F51B5",
                },
                {
                  title: "Height(cm)",
                  value: player.height,
                  icon: HeightIcon,
                  color: "#3F51B5",
                },
                {
                  title: "Weight(kg)",
                  value: player.weight,
                  icon: FitnessCenterIcon,
                  color: "#3F51B5",
                },
              ]);
              setInfo2([
                {
                  title: "Country",
                  value: player.nationality,
                  icon: PublicIcon,
                  color: "#3F51B5",
                },
                {
                  title: "Birthday",
                  value: player.bday,
                  icon: CakeIcon,
                  color: "#3F51B5",
                },
              ]);
              if (player.stats) {
                setStats([
                  {
                    title: "Match Count",
                    value: player.stats.matchCount ? player.stats.matchCount : 0,
                  },
                  {
                    title: "Goals",
                    value: player.stats.goal,
                  },
                  {
                    title: "Asists",
                    value: player.stats.asists,
                  },
                  {
                    title: "Shot Per Match",
                    value: player.stats.shotsPerMatch,
                  },
                  {
                    title: "Pass Percentage",
                    value: player.stats.passPercentage,
                  },
                  {
                    title: "Successful Pass",
                    value: player.stats.successPass,
                  },
                ]);
              }
              
              setClubCareer([
                {
                  title: "Match Count",
                  value: player.clubCareer.matchCount,
                },
                {
                  title: "Goals",
                  value: player.clubCareer.goals,
                },
                {
                  title: "Yellow Cards",
                  value: player.clubCareer.yellowCards,
                },
                {
                  title: "Success",
                  value: player.clubCareer.redCards,
                },
              ]);
            }
        }
        
    }, [player]);
  
    const theme = useTheme();
  
    
  
    return (
    
      <ThemeProvider
        theme={theme}
      >
      {
        player != null ?
        <Box
          sx={{
            flexGrow: 1,
            py: 3,
          }}
        >
          <Container maxWidth={false}>
            <Grid container spacing={2}>
              <Grid item lg={6} sm={12} xl={3} xs={12}>
                <Card {...props}>
                  <CardHeader
                    avatar={
                      <Avatar
                        src={baseTeamImageUrl + player.club.teamImage}
                        sx={{ width: 40, height: 40 }}
                      ></Avatar>
                    }
                    title={player.name}
                    titleTypographyProps={{ variant: "h6", component: "div" }}
                  ></CardHeader>
  
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
                      src={basePlayerImageUrl + player.playerImage}
                       sx={{ width: 100, height: 100 }}>

                       </Avatar>
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
                          <Typography component={'div'} color="textSecondary" variant="body1">
                            {title}
                          </Typography>
  
                          <Typography component={'div'} color="textPrimary" variant="body1">
                            {value}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        pt: 2,
                      }}
                    >
                      {info2.map(({ color, icon: Icon, title, value }) => (
                        <Box
                          key={title}
                          sx={{
                            p: 1,
                            textAlign: "center",
                          }}
                        >
                          <Icon color="action" />
                          <Typography component={'div'} color="textSecondary" variant="body1">
                            {title}
                          </Typography>
  
                          <Typography component={'div'} color="textPrimary" variant="body1">
                            {value}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
  
              <Grid item lg={6} sm={12} xl={9} xs={12}>
                <Card {...props}>
                  <CardHeader title={"Player Information"} />
  
                  <Divider />
                  <CardContent>
                    <Box sx={{ width: "100%" }}>
                      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <Tabs
                          value={value}
                          onChange={handleChange}
                          aria-label="basic tabs example"
                        >
                          <Tab label="STATS" {...a11yProps(0)} />
                          <Tab label="CLUB CAREER" {...a11yProps(1)} />
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
                          {stats.map(({ title, value }) => (
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
                          {clubCareer.map(({ title, value }) => (
                            <Grid item lg={6} sm={12} xl={1.5} xs={12} key={title}>
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
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            pt: 2,
                          }}
                        ></Box>
                      </TabPanel>
                    </Box>
  
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        pt: 18.75,
                      }}
                    ></Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </Box>
        :
        <></>
    }
    </ThemeProvider>
    );
  };
  