import { React } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useState } from "react";

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
} from "@mui/material";

export const PlayerListResults = ({ players, ...rest }) => {
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

  //const [selectedPlayerIds, setSelectedPlayerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  return (
    <Card {...rest}>
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
                .slice(page * limit, page * limit + limit)
                .map((player) => (
                  <TableRow hover key={player.id}>
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        {/* <Avatar src={player.avatarUrl} sx={{ mr: 2 }}>
                        
                      </Avatar> */}

                        <Avatar sx={{ mr: 2 }} {...stringAvatar(player.name)} />

                        {/* <Typography color="textPrimary" variant="body1">
                        {player.name}
                      </Typography> */}
                      </Box>
                    </TableCell>
                    <TableCell>{player.name}</TableCell>
                    <TableCell>{player.club}</TableCell>
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

PlayerListResults.propTypes = {
  players: PropTypes.array.isRequired,
};
