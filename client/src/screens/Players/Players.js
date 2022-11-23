import React from "react";

import { Box, Container } from "@mui/material";
import { PlayerListResults } from "../../components/players/player-list-results";
import { PlayerListToolbar } from "../../components/players/player-list-toolbar";
import { ThemeProvider } from "@mui/material";

import { Col } from "react-bootstrap";
// import { DashboardLayout } from "../components/dashboard-layout";
import { players } from "../../components/players/players_mock";
import { theme } from "../../theme";

function Players() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const playerGet = useSelector((state) => state.playerGet);
  const { loading, error, playerInfo } = playerGet;

  useEffect(() => {
    if (playerInfo) {
    }
  }, [navigate, playerInfo]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(playerGet());
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8,
          }}
        >
          <Container maxWidth={false}>
            <PlayerListToolbar />
            <Box sx={{ mt: 3 }}>
              <PlayerListResults players={players} />
            </Box>
          </Container>
        </Box>
      </div>
    </ThemeProvider>
  );
}

export default Players;
