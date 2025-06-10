import React, { useState } from 'react';
import QRCode from 'qrcode.react';

const QRGenerator = () => {
  const [data, setData] = useState('');
  return (
    <div>
      <h2>Generate QR</h2>
      <input type="text" placeholder="Enter session ID or data" onChange={(e) => setData(e.target.value)} />
      <QRCode value={data} />
    </div>
  );
};

export default QRGenerator;
