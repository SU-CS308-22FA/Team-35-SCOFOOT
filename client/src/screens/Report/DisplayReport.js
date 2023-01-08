import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { allReportsGet } from '../../actions/reportAction';

const DisplayReport = () => {
  const [reports, setReports] = useState('');
  const getAllReports = useSelector((state) => state.allReportsGet);
  const reportInfo = getAllReports;
  const dispatch = useDispatch();
  useEffect(() => {
    if (reportInfo) {
      setReports(reportInfo);
      console.log("SET");
      console.log(reportInfo);
    }
  }, [reportInfo]);

  useEffect(() => {
    dispatch(allReportsGet());
  }, []);

  return (
    <table style={{ border: '1px solid black' }}>
      <thead>
        <tr>
          <th>Category</th>
          
          <th>Text</th>
          reports.reverse().map((report) =>())
          <td></td>
          
          <td></td>
        </tr>
      </thead>
      <tbody>
        <tr>
          
          <th>burası nasıl duruyo</th>
          
        </tr>
      </tbody>
    </table>
  );
};

export default DisplayReport;