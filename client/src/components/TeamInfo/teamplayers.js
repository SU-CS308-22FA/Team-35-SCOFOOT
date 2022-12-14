import { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

//import { format } from "date-fns";
//import { getInitials } from "../../utils/get-initials";
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
import { useNavigate } from "react-router-dom";

export const TeamPlayers = ({ players, ...rest }) => {
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


  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);

  const navigate = useNavigate();

  const baseImageUrl = "images/players/";

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleInfo = (id) => {
    navigate("/playerInfo", {state: {id}});
  }

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 100 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox"></TableCell>
                <TableCell>Team Players</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {players
                .slice(page * limit, page * limit + limit)
                .map((player) => (
                  <TableRow hover key={player._id}>
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
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

                    {/* <TableCell>{format(player.bday, "dd/MM/yyyy")}</TableCell> */}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={players.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 15]}
      />
    </Card>
  );
};
TeamPlayers.propTypes = {
  players: PropTypes.array.isRequired,
};
