import React, { useState } from 'react';
import axios from '../api';
import QRCode from 'qrcode.react';

export default function AdminDashboard() {
  const [title, setTitle] = useState('');
  const [qrToken, setQrToken] = useState('');

  const createSession = async () => {
    const res = await axios.post('/sessions/', { title });
    setQrToken(res.data.qr_token);
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <input placeholder="Session Title" onChange={e => setTitle(e.target.value)} />
      <button onClick={createSession}>Create Session</button>
      {qrToken && <QRCode value={qrToken} />}
    </div>
  );
}
