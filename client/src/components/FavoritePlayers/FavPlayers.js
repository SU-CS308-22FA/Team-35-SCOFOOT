import { React } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';

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
  CircularProgress,
  Stack
} from "@mui/material";
import { addToFavorites, deleteFromFavorites, getFavorites } from "../../actions/userActions";

export const FavPlayers = ({...rest }) => {
  
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

  //const playerResponse = useSelector((state) => state.allPlayersGet);
  //const { loading, error, playerInfo } = playerResponse;

  const favoritePlayers = useSelector((state) => state.favoritePlayers);
  const {favoritesData} = favoritePlayers;


  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  
  

  const deleteFavorites = (player , user_id) => {
    dispatch(deleteFromFavorites(player._id, user_id));
 
    const index = favoritesData.players.indexOf(player);
    favoritesData.players.splice(index,1);
    

  };
  const [user, setUser] = useState(null);

  

  useEffect(() => {
    if (favoritesData) {
      const _id = userInfo._id ;
      dispatch(getFavorites(page * limit, limit, _id)); // getFavorites return players array
    
    }
  }, [navigate]);
 
  useEffect(() => {
    if (favoritesData) {
      setPlayerSize(favoritesData.size);
      setPlayers(favoritesData.players);
      
      
    }
  }, [favoritesData]);

  useEffect(() => {
   
    dispatch(getFavorites(page * limit, (limit *2 ), userInfo._id ));
   
  }, [page, limit, userInfo]);


  useEffect(() => {
    setUser(userInfo);
    
  }, [userInfo])


  const handleInfo = (id) => {
    navigate("/playerInfo", {state: {id}});
  }

  

  return (
    <Card {...rest}>
    {
      players && players.length > 0 ? (
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
                        {user &&
                            (<IconButton onClick={() => deleteFavorites(player, user._id)}>
                              <FavoriteIcon></FavoriteIcon>
                              </IconButton>)
                        
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
                    <TableCell>{player.club}</TableCell>
                    <TableCell>{player.position}</TableCell>                  
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
      </>)

      : 
      (
        <Typography>Favorite players will come here</Typography>
      )
      }

      
    </Card>
  );
};

