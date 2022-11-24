import React from "react";
import MainScreen from "../../components/MainScreen";

import scofootlogo from "../../images/scofootlogo.png";
import { Grid, Container, Box } from "@mui/material";
import { Form, Row, Col } from "react-bootstrap";
import { First } from "./first";
import { Second } from "./second";
import { Third } from "./third";
export default function Home() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Col md={12}>
        <Row>
          <div
            style={{
              backgroundImage: `url(${scofootlogo})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
              height: 600,
              width: 2000,
            }}
          ></div>
        </Row>
        <Row md={3}>
          <Grid item xs={3}>
            <First></First>
          </Grid>

          <Grid item xs={3}>
            <Second></Second>
          </Grid>
          <Grid item xs={3}>
            <Third></Third>
          </Grid>
        </Row>
      </Col>
    </div>
  );
}
