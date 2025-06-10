import React, { useRef, useState, useEffect } from 'react';
import QrScanner from 'qr-scanner';
import Webcam from 'react-webcam';
import { markAttendance } from '../services/api';

function QRScanner() {
  const videoRef = useRef(null);
  const webcamRef = useRef(null);
  const [img, setImg] = useState(null);

  useEffect(() => {
    const scanner = new QrScanner(videoRef.current, async result => {
      scanner.stop();

      navigator.geolocation.getCurrentPosition(async pos => {
        const selfie = webcamRef.current.getScreenshot();
        setImg(selfie);

        await markAttendance({
          qr_code_data: result,
          location: { latitude: pos.coords.latitude, longitude: pos.coords.longitude },
          selfie
        });
        alert('Attendance marked!');
      });
    });
    scanner.start();

    return () => scanner.stop();
  }, []);

  return (
    <div>
      <h2>Scan & Capture</h2>
      <video ref={videoRef} width="300" height="300" />
      <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" width={300} height={200} />
      {img && <img src={img} width="100" alt="Selfie" />}
    </div>
  );
}

export default QRScanner;
