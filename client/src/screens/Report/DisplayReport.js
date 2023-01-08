import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { allReportsGet } from '../../actions/reportAction';
import { Avatar, Button, Grid, Typography } from "@mui/material";
import { Form, Row, Col, Container, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const DisplayReport = () => {
  const [reports, setReports] = useState('');
  const getAllReports = useSelector((state) => state.allReportsGet);
  const reportInfo = getAllReports;
  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    if (!reportInfo) {
      console.log("FEED1");
      dispatch(allReportsGet());
      var reportjson = JSON.parse(localStorage.getItem("allReportsInfo"))
      setReports(reportjson)
      console.log("SET");
      console.log(reportjson)
      console.log(typeof(reportjson))
    }
  }, [navigate, reportInfo]);

  //useEffect(() => {
  //  if (!reportInfo) {
  //    setReports(reportInfo);
  //  }
  //}, [reportInfo]);
//
  //useEffect(() => {
  //  dispatch(allReportsGet());
  //}, []);

  return (
    <Card>
      {reports && (
        <Card>
          {reports.reverse().map((report) => (
            <Grid item xs={9}><Typography color="textSecondary">
            {`Issue : ${report.selectedOption} ${report.text}`}
          </Typography></Grid>
          ))}
        </Card>
      )}
    </Card>
  );
  
};

export default DisplayReport;