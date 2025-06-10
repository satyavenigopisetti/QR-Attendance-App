import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import { generateQR } from '../services/api';

function QRGenerator() {
  const [sessionId, setSessionId] = useState('');
  const [qr, setQr] = useState(null);

  const handleGenerate = async () => {
    const { data } = await generateQR({ session_id: sessionId });
    setQr(data.qr_image);
  };

  return (
    <div>
      <h2>Generate QR</h2>
      <input placeholder="Session ID" value={sessionId} onChange={e => setSessionId(e.target.value)} />
      <button onClick={handleGenerate}>Generate</button>
      {qr && <img src={`data:image/png;base64,${qr}`} alt="QR Code"/>}
    </div>
  );
}

export default QRGenerator;

