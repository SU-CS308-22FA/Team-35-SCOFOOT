import React, { useEffect, useState } from "react";
import { Box, Container, Grid } from "@mui/material";
import { TeamPlayers } from "../../components/TeamInfo/teamplayers";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { teamGet } from "../../actions/teamActions";
import { TeamInfo } from "../../components/TeamInfo/team-info";
import { TeamStatistics } from "../../components/TeamInfo/team-statistics";

function TeamsInfo() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [team, setTeam] = useState(null);
  const teamResponse = useSelector((state) => state.teamGet);
  const { loading, error, teamInfo } = teamResponse;

  const { state } = useLocation();
  const { id } = state || {};

  useEffect(() => {
    dispatch(teamGet(id));
  }, [navigate, dispatch, id]);
  
  useEffect(() => {
      setTeam(teamInfo);
  }, [teamInfo]);

  


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
            <Grid item lg={6} sm={12} xl={12} xs={12}>
            {
              team &&
              <TeamInfo teamdata={team}/>
            }
            </Grid>
            <Grid item lg={6} sm={12} xl={3} xs={12}>
              <Box sx={{ mt: 0 }}>
              {
                team &&
                <TeamPlayers players={team.players} />
              }
              </Box>
            </Grid>
            <Grid item lg={6} sm={12} xl={9} xs={12}>
            {
              team &&
              <TeamStatistics teamdata={team.stats}/>
            }
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default TeamsInfo;
