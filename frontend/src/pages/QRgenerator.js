import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import axios from 'axios';

const QRGenerator = () => {
  const [sessionId, setSessionId] = useState('');
  const [qrData, setQrData] = useState('');

  const generateQR = async () => {
    try {
      const res = await axios.post('/api/generate-qr', { session_id: sessionId });
      setQrData(res.data.qr_code_data);
    } catch (error) {
      alert('Failed to generate QR code');
    }
  };

  return (
    <div>
      <h2>Generate Dynamic QR</h2>
      <input type="text" placeholder="Enter Session ID" value={sessionId} onChange={(e) => setSessionId(e.target.value)} />
      <button onClick={generateQR}>Generate</button>
      {qrData && <QRCode value={qrData} />}
    </div>
  );
};

export default QRGenerator;
