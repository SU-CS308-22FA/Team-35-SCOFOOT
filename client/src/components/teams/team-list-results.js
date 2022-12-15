import { useEffect, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Link
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { allTeamsGet } from "../../actions/teamActions";

export const TeamListResults = ({...rest}) => {
  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const baseImageUrl = "images/teams/";

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [teams, setTeams] = useState(null);
  const teamResponse = useSelector((state) => state.allTeamsGet);
  const { loading, error, teamInfo } = teamResponse;

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  useEffect(() => {
    if (!teamInfo) {
      dispatch(allTeamsGet(page * limit, limit));
    }
  }, [navigate]);

  useEffect(() => {
    if (teamInfo) {
      
      setTeams(teamInfo);
      
    }
  }, [teamInfo]);

  useEffect(() => {
    dispatch(allTeamsGet(page * limit, limit));
  }, [page, limit]);

  const handleInfo = (id) => {
    navigate("/teamInfo", {state: {id}});
  }
  

  return (
    <Card {...rest}>
      {teams && 
      <PerfectScrollbar>
        <Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox"></TableCell>

                <TableCell>Name</TableCell>
                <TableCell>Ranking</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {teams.slice(page * limit, page * limit + limit).map((team) => (
                <TableRow hover key={team._id}>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      {
                          team.teamImage ? 
                          (
                            <Avatar sx={{ mr: 2 }} src={`${baseImageUrl}${team.teamImage}`} />
                          )
                          :
                          (
                            <Avatar sx={{ mr: 2 }} {...stringAvatar(team.club)} />
                          )
                        }
                    </Box>
                  </TableCell>

                  <TableCell><Link
                      underline="hover"
                      component="button"
                      variant="body2"
                      onClick={() => {
                        handleInfo(team._id)
                      }}
                    >
                      {team.club}
                    </Link></TableCell>
                  <TableCell>{team.stats.ranking}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    }
    {teams &&
      <TablePagination
        component="div"
        count={teams.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 15]}
      />
      }
    </Card>
    
  );
};
