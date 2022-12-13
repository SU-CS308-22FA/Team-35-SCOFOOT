import { React } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { playerGet } from "../../actions/playerActions";
//import { format } from "date-fns";
//import { getInitials } from "../../utils/get-initials";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  CircularProgress
} from "@mui/material";

export const PlayerListResults = ({...rest }) => {
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
    var splittedName = name.split(" ");
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: splittedName.length >= 2 ? `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`: name[0],
    };
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const baseImageUrl = "images/players/";

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [players, setPlayers] = useState(null);
  const [playerSize, setPlayerSize] = useState(page * limit + limit);

  const playerResponse = useSelector((state) => state.playerGet);
  const { loading, error, playerInfo } = playerResponse;

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    if (!playerInfo) {
      dispatch(playerGet(page * limit, limit));
    }
  }, [navigate]);

  useEffect(() => {
    if (playerInfo) {
      setPlayerSize(playerInfo.size);
      setPlayers(playerInfo.players);
      
    }
  }, [playerInfo]);

  useEffect(() => {
    console.log(page, limit);
    dispatch(playerGet(page * limit, limit));
  }, [page, limit]);

  return (
    <Card {...rest}>
    {
      players &&
      <>
    
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox"></TableCell>
                <TableCell>Name</TableCell>

                <TableCell>Club</TableCell>

                <TableCell>Position</TableCell>

                <TableCell>Nationality</TableCell>

                <TableCell>Birthday</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {players
                .map((player) => (
                  <TableRow hover key={player._id}>
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        {/* <Avatar src={player.avatarUrl} sx={{ mr: 2 }}>
                        
                      </Avatar> */}
                        {
                          player.playerImage ? 
                          (
                            <Avatar sx={{ mr: 2 }} src={`${baseImageUrl}${player.playerImage}`} />
                          )
                          :
                          (
                            <Avatar sx={{ mr: 2 }} {...stringAvatar(player.name)} />
                          )
                        }
                        
                        {/* <Typography color="textPrimary" variant="body1">
                        {player.name}
                      </Typography> */}
                      </Box>
                    </TableCell>
                    <TableCell><Link
                      underline="hover"
                      component="button"
                      variant="body2"
                      onClick={() => {
                        console.info("I'm a button.");
                      }}
                    >{player.name}</Link></TableCell>
                    <TableCell><Link
                      underline="hover"
                      component="button"
                      variant="body2"
                      onClick={() => {
                        console.info("I'm a button.");
                      }}
                    >
                      {player.club.name}
                    </Link></TableCell>
                    <TableCell>{player.position}</TableCell>
                    <TableCell>{player.nationality}</TableCell>
                    <TableCell>{player.bday}</TableCell>

                    {/* <TableCell>{format(player.bday, "dd/MM/yyyy")}</TableCell> */}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={playerSize}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 15]}
      />
      </>
      }

      {
        loading && <CircularProgress />
      }
    </Card>
  );
};

