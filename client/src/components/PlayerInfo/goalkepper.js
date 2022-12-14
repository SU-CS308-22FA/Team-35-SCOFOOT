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
import StadiumIcon from "@mui/icons-material/Stadium";
import PublicIcon from "@mui/icons-material/Public";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonIcon from "@mui/icons-material/Person";
import React, { useEffect, useState } from "react";
import fenerlogo from "../../images/teamlogos/Fenerbahçe_SK.png";
import { GoalKeeper } from "./playerdata_mock";
import { teamdata } from "../TeamInfo/teamdata_mock";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import SportsHandballIcon from "@mui/icons-material/SportsHandball";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import HeightIcon from "@mui/icons-material/Height";
import CakeIcon from "@mui/icons-material/Cake";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useDispatch, useSelector } from "react-redux";
import { addToFavorites, deleteFromFavorites, login } from "../../actions/userActions";
import { useNavigate } from "react-router-dom";
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';






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
          <Typography>{children}</Typography>
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
export const GoalKeeperInfo = (props) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const theme = useTheme();
  const navigate =useNavigate();
  const dispatch = useDispatch();
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;
  
  useEffect(() => {
		
	}, [navigate, userInfo]);

  

  const addFavorites = (goalKeeper_id , user_id) => {
    dispatch(addToFavorites(goalKeeper_id, user_id));

};

const deleteFavorites = (goalKeeper_id , user_id) => {
  dispatch(deleteFromFavorites(goalKeeper_id, user_id));

};


  const info = [
    {
      title: "Club",
      value: GoalKeeper.club,
      icon: Diversity3Icon,
      color: "#3F51B5",
    },
    {
      title: "Position",
      value: GoalKeeper.position,
      icon: SportsHandballIcon,
      color: "#3F51B5",
    },
    {
      title: "Height(cm)",
      value: GoalKeeper.height,
      icon: HeightIcon,
      color: "#3F51B5",
    },
    {
      title: "Weight(kg)",
      value: GoalKeeper.weight,
      icon: FitnessCenterIcon,
      color: "#3F51B5",
    },
  ];
  const info2 = [
    {
      title: "Country",
      value: GoalKeeper.nationality,
      icon: PublicIcon,
      color: "#3F51B5",
    },
    {
      title: "Birthday",
      value: GoalKeeper.bday,
      icon: CakeIcon,
      color: "#3F51B5",
    },
  ];
  const stats = [
    {
      title: "Match Count",
      value: GoalKeeper.stats.matchCount,
    },
    {
      title: "Matches Not Conceded",
      value: GoalKeeper.stats.matchesNotConceded,
    },
    {
      title: "Conceded",
      value: GoalKeeper.stats.concedes,
    },
    {
      title: "Success",
      value: GoalKeeper.stats.bpSuccess,
    },
  ];
  const clubCareer = [
    {
      title: "Match Count",
      value: GoalKeeper.clubCareer.matchCount,
    },
    {
      title: "Goals",
      value: GoalKeeper.clubCareer.goals,
    },
    {
      title: "Yellow Cards",
      value: GoalKeeper.clubCareer.yellowCards,
    },
    {
      title: "Success",
      value: GoalKeeper.clubCareer.redCards,
    },
  ];

  return (
    <>
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
                      src={teamdata.teamImage}
                      sx={{ width: 40, height: 40 }}
                    ></Avatar>
                  }
                  title={GoalKeeper.name}
                  titleTypographyProps={{ variant: "h6", component: "span" }}
                  
                />
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
                      // src={GoalKeeper.playerImage}
                      sx={{ width: 100, height: 100 }}
                    ></Avatar>
                    {userInfo.favorites_list !== null && userInfo.favorites_list.includes(GoalKeeper._id.$oid) ?
                    <IconButton onClick={() => deleteFavorites(GoalKeeper._id, userInfo._id)}>
                       <FavoriteIcon>
                        </FavoriteIcon></IconButton>:
                    <IconButton onClick ={() => addFavorites(GoalKeeper._id, userInfo._id)} >
                    <FavoriteBorderIcon>
                      
                    </FavoriteBorderIcon>
                    </IconButton>  }
                    
                    {/* <Typography color="textPrimary" variant="body1">
            {GoalKeeper.name}
          </Typography> */}
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
                        <Typography color="textSecondary" variant="body1">
                          {title}
                        </Typography>

                        <Typography color="textPrimary" variant="body1">
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
                        <Typography color="textSecondary" variant="body1">
                          {title}
                        </Typography>

                        <Typography color="textPrimary" variant="body1">
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
                          <Grid item lg={6} sm={12} xl={1.5} xs={12}>
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
                          pt: 5,
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
    </>
  );
};
