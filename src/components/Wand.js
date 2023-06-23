import React, { useEffect, useRef, useState } from 'react';
import ml5 from 'ml5';
import '../App.css';

const Wand = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const modelRef = useRef(null);
  const [lineLength, setLineLength] = useState(0);
  const [totalLength, setTotalLength] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const [modelLoaded, setModelLoaded] = useState(false);

  useEffect(() => {
    const loadHandposeModel = async () => {
      try {
        modelRef.current = await ml5.handpose(videoRef.current, () => {
          console.log('Handpose model loaded.');
          setModelLoaded(true); // Update model loaded status
          setTimeout(() => {
            setModelLoaded(false); // Hide message after 3 seconds
          }, 3000);
        });

        modelRef.current.on('predict', (results) => {
          if (results.length > 0) {
            const hand = results[0];
            const landmarks = hand.landmarks;

            if (landmarks && landmarks.length >= 1) {
              const indexFinger = landmarks[8];
              const x = indexFinger[0];
              const y = indexFinger[1];

              const canvas = canvasRef.current;
              const ctx = canvas.getContext('2d');

              // Reverse the x-coordinate to change the line direction
              const reversedX = canvas.width - x;

              ctx.lineWidth = 2; // Set line width to 2 pixels

              if (hand.handInViewConfidence < 0.8) {
                // Clear canvas if hand is not detected with high confidence
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                setTotalLength(0);
              } else if (hand.gripStrength > 0.8) {
                // Clear canvas and total length if hand is closed (fist)
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                setTotalLength(0);
              } else {
                // Draw line and calculate lengths if hand is open
                ctx.lineTo(reversedX, y);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(reversedX, y);

                // Calculate line length in pixels
                const lineLength = Math.abs(reversedX);
                setLineLength(lineLength);

                // Calculate total length of the line in pixels
                setTotalLength((prevLength) => prevLength + lineLength);
              }

              // Update current X and Y coordinates
              setCurrentX(reversedX);
              setCurrentY(y);
            }
          }
        });
      } catch (error) {
        console.log('Error loading handpose model:', error);
      }
    };

    loadHandposeModel();

    return () => {
      modelRef.current?.removeAllListeners();
    };
  }, []);

  useEffect(() => {
    const getVideoStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
      } catch (error) {
        console.log('Error accessing video stream:', error);
      }
    };

    getVideoStream();
  }, []);

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'right',
        alignItems: 'right',
      }}
    >
       {modelLoaded && (
        <div
          style={{
            position: 'absolute',
            textAlign: 'center',
            // top: '1rem',
            bottom: '1rem',
            borderRadius: '5px',
            fontFamily: 'Helvetica',
            fontSize: '20px',
            border: '1px solid black',
            background: 'white',
            width: '200px',
            height: '30px',
            marginRight: '42%',
          }}
        >
          model is ready!
        </div>
      )}
      <video
        ref={videoRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          transform: 'scaleX(-1)',
          width: '100%',
          height: '100%',
          display: 'none',
        }}
        onLoadedMetadata={(event) => {
          event.target.play();
        }}
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div style={{ 
            marginRight: '200px',  
            width: '100vw',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'left',
            alignItems: 'flex-end',
            fontSize: '50px' }}>
          <p>: {currentX.toFixed(2)} X</p>
          <p>: {currentY.toFixed(2)} Y</p>
          <p>: {totalLength.toFixed(2)} px</p>
        </div>
        <canvas
          ref={canvasRef}
          style={{ borderLeft: '1px solid black', borderRight: '1px solid black' }}
          width={window.innerWidth / 2 - 20}
          height={window.innerHeight}
        />
      </div>
    </div>
  );
};

export default Wand;
