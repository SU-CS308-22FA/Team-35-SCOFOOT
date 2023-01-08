import React, { useState, useEffect } from 'react';



const DisplayReport = () => {
  const [reportReason, setReportReason] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    // Fetch reportReason and text from database
    async function fetchData() {
      const res = await fetch('/api/report/createreport');
      const data = await res.json();
      setReportReason(data.reportReason);
      setText(data.text);
    }
    fetchData();
  }, []);

  return (
    <table style={{ border: '1px solid black' }}>
      <thead>
        <tr>
          <th>Category</th>
          <th>Text</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{reportReason}</td>
          <td>{text}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default DisplayReport;