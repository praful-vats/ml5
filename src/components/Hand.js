import React, { useEffect, useRef, useState } from 'react';
import * as ml5 from 'ml5';

const Hand = () => {
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const [predictions, setPredictions] = useState([]);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    let handpose;
    let video;

    const setupHandpose = async () => {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      video = videoRef.current;
      video.width = canvas.width;
      video.height = canvas.height;

      handpose = ml5.handpose(video, modelReady);
      handpose.on('predict', results => {
        setPredictions(results);
      });
    };

    const modelReady = () => {
      console.log('Model ready!');
      setModelLoaded(true);
      setShowText(true);
      setTimeout(() => {
        setShowText(false);
      }, 3000);
    };

    const startVideoStream = () => {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          video.srcObject = stream;
          video.play().catch(error => {
            console.log('Error playing video:', error);
          });
        })
        .catch(error => {
          console.log('Error accessing video stream:', error);
        });
    };

    video = videoRef.current;
    video.addEventListener('loadedmetadata', () => {
      setupHandpose();
    });

    startVideoStream();

    return () => {
      video.removeEventListener('loadedmetadata', () => {
        setupHandpose();
      });
      handpose?.removeAllListeners();
    };
  }, []);

  useEffect(() => {
    const drawKeypoints = () => {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      for (let i = 0; i < predictions.length; i++) {
        const prediction = predictions[i];
        for (let j = 0; j < prediction.landmarks.length; j++) {
          const keypoint = prediction.landmarks[j];
          context.fillStyle = 'rgb(0, 0, 0)';
          context.beginPath();
          context.arc(keypoint[0], keypoint[1], 10, 0, 2 * Math.PI);
          context.fill();
        }
      }
    };

    const animate = () => {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      context.clearRect(0, 0, canvas.width, canvas.height);
      drawKeypoints();
      requestAnimationFrame(animate);
    };

    if (modelLoaded) {
      animate();
    }
  }, [predictions, modelLoaded]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <video
        ref={videoRef}
        style={{ display: 'none' }}
      />
      <canvas
        ref={canvasRef}
        width={640}
        height={400}
        style={{ background: 'transparent', transform: 'scaleX(-1)' }}
      />
      {showText && (
        <div
          style={{
            position: 'absolute',
            bottom: '1rem',
            textAlign: 'center',
            color: 'black',
            borderRadius: '5px',
            fontFamily: 'Helvetica',
            fontSize: '20px',
            border: '1px solid black',
            background: 'white',
            width: '200px',
            height: '30px',
          }}
        >
          Model is ready!
        </div>
      )}
    </div>
  );
};

export default Hand;
