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
} from "@mui/material";

export const TeamListResults = ({ teams, ...rest }) => {
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

                <TableCell>Clubs</TableCell>
                <TableCell>Match</TableCell>
                <TableCell>Win</TableCell>
                <TableCell>Tie</TableCell>
                <TableCell>Loss</TableCell>
                <TableCell>Win Ratio</TableCell>
                <TableCell>Ranking</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {teams.slice(page * limit, page * limit + limit).map((team) => (
                <TableRow hover key={team.id}>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      <Avatar src={team.teamImage} sx={{ mr: 2 }}></Avatar>
                      {/* <Typography color="textPrimary" variant="body1">
                        {player.name}
                      </Typography> */}
                    </Box>
                  </TableCell>

                  <TableCell>{team.club}</TableCell>
                  <TableCell>{team.match}</TableCell>
                  <TableCell>{team.win}</TableCell>
                  <TableCell>{team.tie}</TableCell>
                  <TableCell>{team.loss}</TableCell>
                  <TableCell>{team.winratio}</TableCell>
                  <TableCell>{team.ranking}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={teams.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 15]}
      />
    </Card>
  );
};

TeamListResults.propTypes = {
  teams: PropTypes.array.isRequired,
};
