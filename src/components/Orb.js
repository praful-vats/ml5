import React, { useEffect, useRef, useState } from 'react';
import p5 from 'p5';
import * as ml5 from 'ml5';
import '../App.css';

export default function Orb() {
  const canvasRef = useRef(null);
  const p5Instance = useRef(null); // Ref to hold the p5 instance
  const [modelLoaded, setModelLoaded] = useState(false); // State variable for model loaded status

  let handPose;
  let angle = 0;

  useEffect(() => {
    const startSketch = async () => {
      const videoElement = document.createElement('video');
      videoElement.width = 640;
      videoElement.height = 480;

      const constraints = { video: { width: 640, height: 480 } };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      videoElement.srcObject = stream;

      await videoElement.play();

      handPose = await ml5.handpose(videoElement, () => {
        console.log('Model Loaded');
        setModelLoaded(true); // Update model loaded status
        setTimeout(() => {
          setModelLoaded(false); // Hide message after 3 seconds
        }, 300000);
      });

      handPose.on('predict', (results) => {
        if (results.length > 0) {
          const hand = results[0].landmarks;
          const thumbTip = hand[4];
          const indexTip = hand[8];

          const dx = indexTip[0] - thumbTip[0];
          const dy = indexTip[1] - thumbTip[1];
          const newAngle = Math.atan2(dy, dx);

          angle = newAngle;
        }
      });
    };

    startSketch();

    return () => {
      if (handPose) {
        handPose.removeAllListeners();
        handPose = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!p5Instance.current) {
      p5Instance.current = new p5(sketch);
    } else {
      p5Instance.current.remove(); // Remove the previous p5 instance
      p5Instance.current = new p5(sketch);
    }

    return () => {
      p5Instance.current.remove(); // Clean up the p5 instance
    };
  }, []);

  const sketch = (p) => {
    p.setup = () => {
      p.createCanvas(1280, 450, p.WEBGL).parent(canvasRef.current);
    };

    p.draw = () => {
      p.background(255);
      p.resetMatrix(); // Reset the rotation
      p.rotateX(angle); // Rotate the sphere around the X-axis based on hand movement
      p.rotateY(angle); // Rotate the sphere around the Y-axis based on hand movement
      p.rotateZ(angle); // Rotate the sphere around the Z-axis based on hand movement
      p.noFill();
      p.stroke(0);
      p.sphere(100, 24, 16); // Create a grid sphere with more vertices
    };
  };

  return (
    <div>
      {modelLoaded && (
        <div
          style={{
            position: 'absolute',
            textAlign: 'center',
            bottom: '1rem',
            borderRadius: '5px',
            fontFamily: 'Helvetica',
            fontSize: '20px',
            border: '1px solid black',
            background: 'white',
            width: '150px',
            height: '30px',
            marginLeft: '44%',
          }}
        >
          model is ready!
        </div>
      )}
      <div ref={canvasRef} />
    </div>
  );
}
