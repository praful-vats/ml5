import React, { useState, useEffect, useRef } from 'react';
import ml5 from 'ml5';
import '../App.css';

const Dots = () => {
  const [cursor, setCursor] = useState({ x: 0, y: 0 }); // Cursor position
  const [modelLoaded, setModelLoaded] = useState(false); // State variable for model loaded status
  const videoRef = useRef(null);
  const modelRef = useRef(null);
  const [displayMessage, setDisplayMessage] = useState(false); // State variable to control message display

  useEffect(() => {
    const loadHandposeModel = async () => {
      try {
        modelRef.current = await ml5.handpose(videoRef.current, () => {
          console.log('Handpose model loaded.');
          setModelLoaded(true); // Update model loaded status
          setDisplayMessage(true); // Display message when model is loaded
          setTimeout(() => {
            setDisplayMessage(false); // Hide message after 3 seconds
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
              setCursor({ x, y });
            } else {
              setCursor({ x: 0, y: 0 });
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

  const getCellCharacter = (coord) => {
    const x = Math.floor((window.innerWidth - cursor.x * 2) / (window.innerWidth / 71));
    const y = Math.floor(cursor.y / (window.innerHeight / 30));

    if (coord.x === x && coord.y === y) return '┼';
    if (coord.x === x) return '│';
    if (coord.y === y) return '─';
    return '·';
  };

  const generateGrid = () => {
    const grid = [];

    for (let y = 0; y < 15; y++) {
      for (let x = 0; x < 71; x++) {
        const cell = getCellCharacter({ x, y });
        grid.push(<span key={`${x}-${y}`}>{cell}</span>);
      }
      grid.push(<br key={`br-${y}`} />);
    }

    return grid;
  };

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
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '2rem',
        fontFamily: 'monospace',
      }}
    >
      <video
        ref={videoRef}
        style={{
          transform: 'scaleX(-1)',
          width: 'auto',
          height: 'auto',
          maxWidth: '100%',
          maxHeight: '100%',
          display: 'none',
        }}
        onLoadedMetadata={(event) => {
          event.target.play();
        }}
      />
      <div>{generateGrid()}</div>
      {displayMessage && (
        <div style={{ 
        position: 'absolute',
        textAlign: 'center',
        bottom: '1rem',
        borderRadius: '5px',
        fontFamily: 'Helvetica',
        fontSize: '20px',
        border: '1px solid black',
        background: 'white',
        width: '150px',
        height: '30px', }}>model is ready!</div>
      )}
      <style>
        {`
          .vertical-line {
            fontSize: 5rem;
          }
        `}
      </style>
    </div>
  );
};

export default Dots;
