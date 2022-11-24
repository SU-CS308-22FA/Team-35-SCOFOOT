import {
  Grid,
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  useTheme,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  Tabs,
  Tab,
} from "@mui/material";
import PropTypes from "prop-types";
import Link from "@mui/material";
import React, { useState } from "react";
import { Row } from "react-bootstrap";
import {
  AttackTeamInfo,
  defenseTeamInfo,
  DiciplineTeamInfo,
  generalTeamInfo,
  PassesTeamInfo,
} from "./stats";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
export const TeamStatistics = (props) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Card {...props}>
      <CardHeader title={"Team Statistics"} />
      <Divider />

      <CardContent>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="GENERAL" {...a11yProps(0)} />
            <Tab label="DEFENCE" {...a11yProps(1)} />
            <Tab label="PASSES" {...a11yProps(2)} />
            <Tab label="DICIPLINE" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              pt: 2,
            }}
          >
            {generalTeamInfo.map(({ title, value }) => (
              <Grid item lg={6} sm={12} xl={1.5} xs={12}>
                <Box
                  key={title}
                  sx={{
                    p: 1,
                    textAlign: "center",
                  }}
                >
                  <Typography color="textSecondary" variant="body1">
                    {title}
                  </Typography>

                  <Typography color="#3F51B5" variant="h6">
                    {value}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              pt: 2,
            }}
          >
            {defenseTeamInfo.map(({ title, value }) => (
              <Grid item lg={6} sm={12} xl={2} xs={12}>
                <Box
                  key={title}
                  sx={{
                    p: 0,
                    textAlign: "center",
                  }}
                >
                  <Typography color="textSecondary" variant="body1">
                    {title}
                  </Typography>

                  <Typography color="#3F51B5" variant="h6">
                    {value}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Box>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              pt: 2,
            }}
          >
            {AttackTeamInfo.map(({ title, value }) => (
              <Grid item lg={6} sm={12} xl={2} xs={12}>
                <Box
                  key={title}
                  sx={{
                    p: 0,
                    textAlign: "center",
                  }}
                >
                  <Typography color="textSecondary" variant="body1">
                    {title}
                  </Typography>

                  <Typography color="#3F51B5" variant="h6">
                    {value}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Box>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              pt: 2,
            }}
          >
            {DiciplineTeamInfo.map(({ title, value }) => (
              <Grid item lg={6} sm={12} xl={2} xs={12}>
                <Box
                  key={title}
                  sx={{
                    p: 0,
                    textAlign: "center",
                  }}
                >
                  <Typography color="textSecondary" variant="body1">
                    {title}
                  </Typography>

                  <Typography color="#3F51B5" variant="h6">
                    {value}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Box>
        </TabPanel>
      </CardContent>
    </Card>
  );
};
