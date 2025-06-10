import React, { useEffect } from 'react';
import QrScanner from 'qr-scanner';

const QRScanner = () => {
  useEffect(() => {
    const video = document.getElementById('scanner');
    QrScanner.WORKER_PATH = '/qr-scanner-worker.min.js';
    const scanner = new QrScanner(video, result => alert('Scanned: ' + result));
    scanner.start();
    return () => scanner.stop();
  }, []);

  return <video id="scanner" width="300" height="300"></video>;
};

export default QRScanner;
