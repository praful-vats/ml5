// import React, { useState, useEffect } from 'react';
// import './App.css';

// const App = () => {
//   const [cursor, setCursor] = useState({ x: 0, y: 0 }); // Cursor position

//   // Update cursor position on mouse move
//   const handleMouseMove = (event) => {
//     const x = event.clientX;
//     const y = event.clientY;
//     setCursor({ x, y });
//   };

// const getCellCharacter = (coord) => {
//   const x = Math.floor(cursor.x / (window.innerWidth / 70));
//   const y = Math.floor(cursor.y / (window.innerHeight / 13));

//   if (coord.x === x && coord.y === y) return '┼';
//   if (coord.x === x) return '│';
//   if (coord.y === y) return '─';
//   return '·';
// };


//   // Generate the grid with crosshair lines
//   const generateGrid = () => {
//     const grid = [];

//     for (let y = 0; y < 13; y++) {
//       for (let x = 0; x < 70; x++) {
//         const cell = getCellCharacter({ x, y });
//         grid.push(<span key={`${x}-${y}`}>{cell}</span>);
//       }
//       grid.push(<br key={`br-${y}`} />);
//     }

//     return grid;
//   };

//   // Add event listener on component mount
//   useEffect(() => {
//     window.addEventListener('mousemove', handleMouseMove);
//     return () => window.removeEventListener('mousemove', handleMouseMove);
//   }, []);

//   return (
//     <div
//       style={{
//         width: '100vw',
//         height: '100vh',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         fontSize: '2rem',
//         fontFamily: 'monospace',
//       }}
//     >
//       <div>{generateGrid()}</div>
//       <style>
//         {`
//           .vertical-line {
//             fontSize: 5rem;
//           }
//         `}
//       </style>
//     </div>
//   );
// };











// export default App;

// import React, { useEffect, useRef, useState } from 'react';
// import * as ml5 from 'ml5';
// import './App.css';

// const App = () => {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const poseNetRef = useRef(null);
//   const startXRef = useRef(null);
//   const [noseX, setNoseX] = useState(0);
//   const [noseY, setNoseY] = useState(0);
//   let poses = [];

//   useEffect(() => {
//     const video = videoRef.current;
//     const canvas = canvasRef.current;
//     const context = canvas.getContext('2d');

//     const setupCamera = async () => {
//       if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
//         try {
//           const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//           if ('srcObject' in video) {
//             video.srcObject = stream;
//           } else {
//             video.src = window.URL.createObjectURL(stream);
//           }
//         } catch (err) {
//           console.error('Error accessing the camera: ', err);
//         }
//       }
//     };

//     const modelReady = () => {
//       console.log('Model Loaded');
//       poseNetRef.current.singlePose(video);
//     };

//     const drawKeypoints = () => {
//       context.clearRect(0, 0, canvas.width, canvas.height);

//       if (poses.length > 0) {
//         const pose = poses[0].pose;
//         const nose = pose.keypoints.find((keypoint) => keypoint.part === 'nose' && keypoint.score > 0.2);

//         if (nose) {
//           setNoseX(nose.position.x);
//           setNoseY(nose.position.y);
//         } else {
//           setNoseX(0);
//           setNoseY(0);
//         }
//       }

//       // Loop through all the poses detected
//       for (let i = 0; i < poses.length; i++) {
//         // For each pose detected, loop through all the keypoints
//         let pose = poses[i].pose;
//         for (let j = 0; j < pose.keypoints.length; j++) {
//           // A keypoint is an object describing a body part (like rightArm or leftShoulder)
//           let keypoint = pose.keypoints[j];
//           // Only draw an ellipse if the pose probability is bigger than 0.2
//           if (keypoint.score > 0.2) {
//             context.fillStyle = 'red';
//             context.beginPath();
//             context.arc(keypoint.position.x, keypoint.position.y, 10, 0, 2 * Math.PI);
//             context.fill();
//           }
//         }
//       }
//     };

//     const poseNetLoaded = () => {
//       poseNetRef.current.on('pose', (results) => {
//         poses = results;
//         drawKeypoints();
//       });
//     };

//     setupCamera();
//     poseNetRef.current = ml5.poseNet(video, modelReady);
//     poseNetRef.current.on('pose', poseNetLoaded);

//     return () => {
//       poseNetRef.current.off('pose', poseNetLoaded);
//     };
//   }, []);

//   return (
//     <div className='di'>
//       <video className='dis' ref={videoRef} width="640" height="480" autoPlay></video>
//       <canvas className='st' ref={canvasRef} width="640" height="480"></canvas>
//       <div>
//         <p>Nose X: {noseX}</p>
//         <p>Nose Y: {noseY}</p>
//       </div>
//     </div>
//   );
// };

// export default App;







// import React, { useState, useEffect } from 'react';
// import './App.css';

// const App = () => {
//   const [nose, setNose] = useState({ x: 0, y: 0 }); // Nose position

//   // Update nose position on pose detection
//   const updateNosePosition = (position) => {
//     setNose({ x: position.x, y: position.y });
//   };

//   const getCellCharacter = (coord) => {
//     const x = Math.floor(nose.x / (window.innerWidth / 70));
//     const y = Math.floor(nose.y / (window.innerHeight / 13));

//     if (coord.x === x && coord.y === y) return '┼';
//     if (coord.x === x) return '│';
//     if (coord.y === y) return '─';
//     return '·';
//   };

//   // Generate the grid with crosshair lines
//   const generateGrid = () => {
//     const grid = [];

//     for (let y = 0; y < 13; y++) {
//       for (let x = 0; x < 70; x++) {
//         const cell = getCellCharacter({ x, y });
//         grid.push(<span key={`${x}-${y}`}>{cell}</span>);
//       }
//       grid.push(<br key={`br-${y}`} />);
//     }

//     return grid;
//   };

//   // Simulate nose detection
//   useEffect(() => {
//     const interval = setInterval(() => {
//       const randomX = Math.random() * window.innerWidth;
//       const randomY = Math.random() * window.innerHeight;
//       updateNosePosition({ x: randomX, y: randomY });
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div
//       style={{
//         width: '100vw',
//         height: '100vh',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         fontSize: '2rem',
//         fontFamily: 'monospace',
//       }}
//     >
//       <div>{generateGrid()}</div>
//       <style>
//         {`
//           .vertical-line {
//             fontSize: 5rem;
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// export default App;



import React, { useState, useEffect, useRef } from 'react';
import * as ml5 from 'ml5';
import './App.css';

const App = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const poseNetRef = useRef(null);
  const [nose, setNose] = useState({ x: 0, y: 0 }); // Nose position
  const [poses, setPoses] = useState([]); // Poses detected by PoseNet

  const updateNosePosition = (position) => {
    setNose({ x: position.x, y: position.y });
  };

  const getCellCharacter = (coord) => {
    const x = Math.floor(nose.x / (window.innerWidth / 70));
    const y = Math.floor(nose.y / (window.innerHeight / 13));

    if (coord.x === x && coord.y === y) return '┼';
    if (coord.x === x) return '│';
    if (coord.y === y) return '─';
    return '·';
  };

  const generateGrid = () => {
    const grid = [];

    for (let y = 0; y < 13; y++) {
      for (let x = 0; x < 70; x++) {
        const cell = getCellCharacter({ x, y });
        grid.push(<span key={`${x}-${y}`}>{cell}</span>);
      }
      grid.push(<br key={`br-${y}`} />);
    }

    return grid;
  };

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const setupCamera = async () => {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          if ('srcObject' in video) {
            video.srcObject = stream;
          } else {
            video.src = window.URL.createObjectURL(stream);
          }
        } catch (err) {
          console.error('Error accessing the camera: ', err);
        }
      }
    };

    const modelReady = () => {
      console.log('Model Loaded');
      poseNetRef.current.on('pose', (results) => {
        setPoses(results);
        drawKeypoints();
      });
    };

    const drawKeypoints = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      if (poses.length > 0) {
        const pose = poses[0].pose;
        const nose = pose.keypoints.find((keypoint) => keypoint.part === 'nose' && keypoint.score > 0.2);

        if (nose) {
          updateNosePosition(nose.position);
        } else {
          updateNosePosition({ x: 0, y: 0 });
        }
      }

      for (let i = 0; i < poses.length; i++) {
        let pose = poses[i].pose;
        for (let j = 0; j < pose.keypoints.length; j++) {
          let keypoint = pose.keypoints[j];
          if (keypoint.score > 0.2) {
            context.fillStyle = 'red';
            context.beginPath();
            context.arc(keypoint.position.x, keypoint.position.y, 10, 0, 2 * Math.PI);
            context.fill();
          }
        }
      }
    };

    const poseNetLoaded = () => {
      poseNetRef.current.singlePose(video);
    };

    setupCamera();
    poseNetRef.current = ml5.poseNet(video, modelReady);
    poseNetRef.current.on('pose', poseNetLoaded);

    return () => {
      poseNetRef.current.off('pose', poseNetLoaded);
    };
  }, []);

  return (
    <div className="App">
      <video className="dis" ref={videoRef} width="640" height="480" autoPlay></video>
      <canvas className="dis" ref={canvasRef} width="640" height="480"></canvas>
      <div className="grid">{generateGrid()}</div>
    </div>
  );
};

export default App;
