import React from 'react';
import { Link } from 'react-router-dom';

function AdminDashboard() {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <Link to="/admin/generate-qr">Generate QR</Link>
    </div>
  );
}

export default AdminDashboard;
