import React from 'react';
import { Link } from 'react-router-dom';

function StudentDashboard() {
  return (
    <div>
      <h2>Student Dashboard</h2>
      <Link to="/student/scan-qr">Scan QR</Link>
    </div>
  );
}

export default StudentDashboard;
