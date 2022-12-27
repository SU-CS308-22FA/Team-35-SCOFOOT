import React, { useState, useEffect } from "react";

import { Form, Row, Col, Container } from "react-bootstrap";


import {
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  Button,
  Box,
  Grid,
} from "@mui/material";
import { Card } from "react-bootstrap";


function AboutUser({data}) {
  
  return (
    <div>
      <Card>
        <CardHeader style={{ display: "flex" }} title={"About".concat(" ", `${data.name}`)} />

        <Divider />

        <CardContent
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Col md={12}>
            
             <Typography>{data.aboutme}</Typography>
 
          </Col>
        </CardContent>
      </Card>
    </div>
  );
}

export default AboutUser;
