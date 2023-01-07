import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Row, Col, Container, Card } from "react-bootstrap";
import PhotoSizeSelectActualIcon from "@mui/icons-material/PhotoSizeSelectActual";
import { Avatar, Button, Grid, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";

import { set } from "mongoose";
import ErrorMessage from "../../components/ErrorMessage";
import { createreport } from "../../actions/reportAction";

const ReportShare = () => {
    
    const [sharedReport, setSharedReport] = useState(false);
    const [success, setSuccess] = useState(false);
  
    const [postedById, setPostedById] = useState("");
    
    const [text, setText] = useState("");
    const [selectedOption, setSelectedOption] = useState("");
  
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    

    /*const reportCreate = useSelector((state) => state.reportCreate);
  const { loading, postInfo, error } = reportCreate;
  
    useEffect(() => {
      if (postInfo) {
        setText("");
        setSelectedOption("");
      }
    }, [navigate, postInfo]);*/
  
   
  
    const submitHandler = async (e) => {
      e.preventDefault();
      dispatch(createreport(postedById, text, selectedOption));
      setSharedReport(!sharedReport);
    };
  
    return (
      <Card>
        <Form onSubmit={submitHandler}>
          {success && <ErrorMessage variant="success">Report Shared!</ErrorMessage>}
          
          <Box sx={{ flexGrow: 1 }}>
            <Box
              sx={{
                flexGrow: 1,
                py: 1.5,
              }}
            ></Box>

            <Grid container spacing={0}>
              <Grid item xs={0.5}></Grid>

              <Grid item xs={9}>
                {" "}
                <Form.Group controlId="report_reason_share">
                  <Form.Control
                    type="text"
                    placeholder="REPORTING TOPİC:"
                    value={selectedOption}
                    onChange={(e) => setSelectedOption(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Grid>  
            </Grid>
          </Box>

          <Grid container spacing={0}>
              <Grid item xs={0.5}></Grid>

              <Grid item xs={9}>
                {" "}
                <Form.Group controlId="reportshare">
                  <Form.Control
                    type="text"
                    placeholder="PLEASE PROVIDE DETAILS."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Grid>  
            </Grid>
          
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={9}></Grid>
  
              <Grid item xs={2}>
                <Button
                  sx={{ mt: 2, mb: 2, mr: 2 }}
                  variant="contained"
                  color="primary"
                  type="submit"
                  varient="primary"
                >
                  SEND REPORT
                </Button>
              </Grid>
            </Grid>
          </Box>
          <Row>
            <Grid item xs={1.5}></Grid>
            <Grid item xs={9}>
              {<Typography>{text}</Typography>}
              {/* {<Typography>{postedById}</Typography>} */}
            </Grid>
          </Row>
          <Grid>
            <Box
              sx={{
                flexGrow: 1,
                py: 1,
              }}
            ></Box>
          </Grid>
          <Row>
            <Box></Box>
          </Row>
        </Form>
      </Card>
    );
  };
  
  export default ReportShare;
  