import { React } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { playerSearch } from "../../actions/playerActions";
//import { format } from "date-fns";
//import { getInitials } from "../../utils/get-initials";
import {
  Avatar,
  Box,
  Card,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  CircularProgress,
  Stack
} from "@mui/material";

export const PlayerSearchResults = ({searchKey, ...rest }) => {
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

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const playerSearchResponse = useSelector((state) => state.playerSearch);
  const { loading, error, playerSearchResult } = playerSearchResponse;

  const [players, setPlayers] = useState([]);
  const [searchResultSize, setSearchResultSize] = useState(page * limit + limit);

  const baseImageUrl = "images/players/";

  useEffect(() => {
    if (playerSearchResult) {
        setPage(0);
        setPlayers(playerSearchResult.players);
        setSearchResultSize(playerSearchResult.size);
    }
  }, [playerSearchResult]);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

 
  useEffect(() => {
    dispatch(playerSearch(searchKey, page * limit, limit));
  }, [searchKey, page, limit, dispatch]);

  

  const handleInfo = (id) => {
    navigate("/playerInfo", {state: {id}});
  }

  const handleTeamInfo = (id) => {
    navigate("/teamInfo", {state: {id}});
  }

  return (
    <Card {...rest}>
    {
      players &&
      <>
    
      <PerfectScrollbar>
        <Box sx={{ minWidth: 400 }}>
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
                        handleInfo(player._id);
                      }}
                    >{player.name}</Link></TableCell>
                    <TableCell><Link
                      underline="hover"
                      component="button"
                      variant="body2"
                      onClick={() => {
                        handleTeamInfo(player.club._id)
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
        count={searchResultSize}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 15]}
      />
      </>
      }
    </Card>
  );
};

