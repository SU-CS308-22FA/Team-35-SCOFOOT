import React, { useState } from "react";
import { PlayerListResults } from "../../components/players/player-list-results";
import { ThemeProvider } from "@mui/material";
import { TeamListResults } from "../../components/teams/team-list-results";
import { Search, Clear } from "@mui/icons-material";
import { PlayerSearchResults } from "../../components/players/player-search-results";
import {
  Box,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography,
  Container,
  Grid,
  IconButton
} from "@mui/material";
import { theme } from "../../theme";


function Players() {

  const [searchKey, setSearchKey] = useState("");

  const handleSearch = (event) => {
    const searchKey = event.target.value;
    setSearchKey(searchKey);
  }

  const handleClear = () => {
    setSearchKey("");
  }
  
  

  return (
    <ThemeProvider theme={theme}>
      
        <Box
          sx={{
            display: 'flex',
          }}
        >
          <Container maxWidth={false}>
          <Box>
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                m: -1,
              }}
            >
              <Typography sx={{ m: 1 }} variant="h4">
                Players & Teams
              </Typography>

              <Box sx={{ m: 1 }}></Box>
            </Box>

            <Box sx={{ mt: 3 }}>
              <Card>
                <CardContent>
                  <Box sx={{ minWidth: 500 }}>
                    <TextField
                      fullWidth
                      onChange={(event) => handleSearch(event)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                           
                              <Search />

                          </InputAdornment>
                        ),
                        endAdornment: searchKey !== "" && (
                          <InputAdornment position="end">
                            <IconButton
                            onClick={handleClear}>
                              <Clear />
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                      placeholder="Search player..."
                      variant="outlined"
                      autoComplete='off'
                      value={searchKey}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Box>
          <Grid container spacing={2}>
          {
            searchKey === "" ? 
            (
              <>
                <Grid item lg={3} sm={12} xl={3} xs={12}>
                <Box sx={{ mt: 3 }}>
                    <TeamListResults />
                  </Box>
                </Grid>
                <Grid item lg={9} sm={12} xl={9} xs={12}>
                  
                  <Box sx={{ mt: 3 }}>
                    <PlayerListResults />
                  </Box>
                </Grid>
              </>
              
            ) 
            :
            (
              <>
                <Grid item lg={12} sm={12} xl={12} xs={12}>
                <Box sx={{ mt: 3 }}>
                    <PlayerSearchResults searchKey={searchKey} />
                  </Box>
                </Grid>
              </>
            )
          } 
          </Grid>
          
            
            
          </Container>
        </Box>
      
    </ThemeProvider>
  );
}

export default Players;
