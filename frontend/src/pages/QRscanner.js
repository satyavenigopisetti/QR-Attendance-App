import React, { useEffect, useRef, useState } from 'react';
import QrScanner from 'qr-scanner';
import Webcam from 'react-webcam';

const QRScanner = () => {
  const videoRef = useRef(null);
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);

  useEffect(() => {
    const video = videoRef.current;
    const scanner = new QrScanner(video, async result => {
      scanner.stop();

      // Get location
      navigator.geolocation.getCurrentPosition(async (pos) => {
        // Capture selfie
        const imageSrc = webcamRef.current.getScreenshot();
        setCapturedImage(imageSrc);

        const payload = {
          qr_code_data: result,
          selfie: imageSrc,
          location: {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          },
        };

        const response = await fetch('/api/mark-attendance', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        const data = await response.json();
        alert(data.message);
      });
    });

    scanner.start();
    return () => scanner.stop();
  }, []);

  return (
    <div>
      <h2>Scan QR and Capture Selfie</h2>
      <video ref={videoRef} width="300" height="300" />
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={300}
        height={200}
        videoConstraints={{ facingMode: 'user' }}
      />
      {capturedImage && <img src={capturedImage} alt="Captured Selfie" width={100} />}
    </div>
  );
};

export default QRScanner;
