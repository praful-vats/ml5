//grid
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




//crosshair
// import React, { useState } from 'react';

// const App = () => {
//   const [crosshairPosition, setCrosshairPosition] = useState({ x: 0, y: 0 });

//   const handleMouseMove = (event) => {
//     const { clientX, clientY } = event;
//     setCrosshairPosition({ x: clientX, y: clientY });
//   };

//   return (
//     <div
//       style={{
//         position: 'relative',
//         width: '100%',
//         height: '100vh',
//         cursor: 'none',
//       }}
//       onMouseMove={handleMouseMove}
//     >
//       {/* Horizontal line */}
//       <div
//         style={{
//           position: 'absolute',
//           top: crosshairPosition.y,
//           left: 0,
//           right: 0,
//           height: 2,
//           backgroundColor: 'black',
//         }}
//       />
//       {/* Vertical line */}
//       <div
//         style={{
//           position: 'absolute',
//           top: 0,
//           bottom: 0,
//           left: crosshairPosition.x,
//           width: 2,
//           backgroundColor: 'black',
//         }}
//       />
//       {/* X and Y positions */}
//       <div
//         style={{
//           position: 'fixed',
//           top: 10,
//           left: 10,
//           color: 'black',
//           fontSize: 16,
//         }}
//       >
//         X: {crosshairPosition.x}, Y: {crosshairPosition.y}
//       </div>
//     </div>
//   );
// };

// export default App;





//hand
// import React, { useState, useEffect, useRef } from 'react';
// import ml5 from 'ml5';

// const App = () => {
//   const [handPosition, setHandPosition] = useState({ x: null, y: null });
//   const videoRef = useRef(null);
//   const modelRef = useRef(null);

//   useEffect(() => {
//     const loadHandposeModel = async () => {
//       try {
//         // console.log('Loading handpose model...');
//         modelRef.current = await ml5.handpose(videoRef.current, () => {
//           console.log('Handpose model loaded.');
//         });

//         modelRef.current.on('predict', (results) => {
//           if (results.length > 0) {
//             const hand = results[0];
//             const landmarks = hand.landmarks;
//             // console.log('Landmarks:', landmarks);
        
//             if (landmarks && landmarks.length >= 1) {
//               const indexFinger = landmarks[8]; // Index finger landmark is at index 8
//               const x = indexFinger[0];
//               const y = indexFinger[1];
//               // console.log('x:', x);
//               // console.log('y:', y);
//               setHandPosition({ x, y });
//               // console.log('Updated handPosition:', { x, y });
//             } else {
//               setHandPosition({ x: null, y: null });
//               // console.log('Updated handPosition:', { x: null, y: null });
//             }
            
//           }
//         });
        
//       } catch (error) {
//         console.log('Error loading handpose model:', error);
//       }
//     };

//     loadHandposeModel();

//     return () => {
//       modelRef.current?.removeAllListeners();
//     };
//   }, []);

//   useEffect(() => {
//     const getVideoStream = async () => {
//       try {
//         // console.log('Accessing video stream...');
//         const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//         videoRef.current.srcObject = stream;
//       } catch (error) {
//         console.log('Error accessing video stream:', error);
//       }
//     };

//     getVideoStream();
//   }, []);

//   return (
//     <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//       <video
//         ref={videoRef}
//         style={{ transform: 'scaleX(-1)', width: 'auto', height: 'auto', maxWidth: '100%', maxHeight: '100%' }}
//         onLoadedMetadata={(event) => {
//           event.target.play();
//         }}
//       />

//     {handPosition.x != null && handPosition.y != null && !isNaN(handPosition.x) && !isNaN(handPosition.y) ? (
//       <div style={{ position: 'absolute', top: '10px', left: '10px', backgroundColor: 'white', padding: '10px' }}>
//         X: {handPosition.x.toFixed(2)}, Y: {handPosition.y.toFixed(2)}
//       </div>
//     ) : null}


//     </div>
//   );
// };

// export default App;





//cursor
// import React, { useState, useEffect, useRef } from 'react';
// import ml5 from 'ml5';

// const App = () => {
//   const [indexFingerPosition, setIndexFingerPosition] = useState({ x: null, y: null });
//   const videoRef = useRef(null);
//   const modelRef = useRef(null);

//   useEffect(() => {
//     const loadHandposeModel = async () => {
//       try {
//         modelRef.current = await ml5.handpose(videoRef.current, () => {
//           console.log('Handpose model loaded.');
//         });

//         modelRef.current.on('predict', (results) => {
//           if (results.length > 0) {
//             const hand = results[0];
//             const landmarks = hand.landmarks;

//             if (landmarks && landmarks.length >= 1) {
//               const indexFinger = landmarks[8];
//               const x = indexFinger[0];
//               const y = indexFinger[1];
//               setIndexFingerPosition({ x, y });
//             } else {
//               setIndexFingerPosition({ x: null, y: null });
//             }
//           }
//         });
//       } catch (error) {
//         console.log('Error loading handpose model:', error);
//       }
//     };

//     loadHandposeModel();

//     return () => {
//       modelRef.current?.removeAllListeners();
//     };
//   }, []);

//   useEffect(() => {
//     const getVideoStream = async () => {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//         videoRef.current.srcObject = stream;
//       } catch (error) {
//         console.log('Error accessing video stream:', error);
//       }
//     };

//     getVideoStream();
//   }, []);

//   return (
//     <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//       <video
//         ref={videoRef}
//         style={{ transform: 'scaleX(-1)', width: 'auto', height: 'auto', maxWidth: '100%', maxHeight: '100%', display: 'none' }}
//         onLoadedMetadata={(event) => {
//           event.target.play();
//         }}
//       />

//       {indexFingerPosition.x != null && indexFingerPosition.y != null && !isNaN(indexFingerPosition.x) && !isNaN(indexFingerPosition.y) ? (
//         <div style={{ position: 'absolute', top: '10px', left: '10px', backgroundColor: 'white', padding: '10px' }}>
//           X: {indexFingerPosition.x.toFixed(2)}, Y: {indexFingerPosition.y.toFixed(2)}
//         </div>
//       ) : null}

//       {indexFingerPosition.x != null && indexFingerPosition.y != null && !isNaN(indexFingerPosition.x) && !isNaN(indexFingerPosition.y) && (
//         <div
//           style={{
//             position: 'fixed',
//             top: indexFingerPosition.y,
//             left: window.innerWidth - indexFingerPosition.x,
//             width: 20,
//             height: 20,
//             borderRadius: '50%',
//             backgroundColor: 'black',
//             pointerEvents: 'none',
//             transition: 'left 0.1s, top 0.1s bottom 0.1s right 0.1s',
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default App;





//mix2

// import React, { useState, useEffect, useRef } from 'react';
// import ml5 from 'ml5';
// import './App.css';

// const App = () => {
//   const [cursor, setCursor] = useState({ x: 0, y: 0 }); // Cursor position
//   const videoRef = useRef(null);
//   const modelRef = useRef(null);
//   const scalingFactor = 2; // Adjust the scaling factor as needed

//   useEffect(() => {
//     const loadHandposeModel = async () => {
//       try {
//         modelRef.current = await ml5.handpose(videoRef.current, () => {
//           console.log('Handpose model loaded.');
//         });

//         modelRef.current.on('predict', (results) => {
//           if (results.length > 0) {
//             const primaryHand = getPrimaryHand(results);
//             if (primaryHand) {
//               const landmarks = primaryHand.landmarks;
//               if (landmarks && landmarks.length >= 1) {
//                 const indexFinger = landmarks[8];
//                 const x = indexFinger[0];
//                 const y = indexFinger[1];
//                 setCursor({ x: x * scalingFactor, y: y * scalingFactor });
//               } else {
//                 setCursor({ x: 0, y: 0 });
//               }
//             }
//           }
//         });
//       } catch (error) {
//         console.log('Error loading handpose model:', error);
//       }
//     };

//     loadHandposeModel();

//     return () => {
//       modelRef.current?.removeAllListeners();
//     };
//   }, []);

//   const getPrimaryHand = (results) => {
//     let primaryHand = null;
//     for (let i = 0; i < results.length; i++) {
//       const hand = results[i];
//       if (hand.handInViewConfidence > 0.8) {
//         if (primaryHand === null || hand.handInViewConfidence > primaryHand.handInViewConfidence) {
//           primaryHand = hand;
//         }
//       }
//     }
//     return primaryHand;
//   };

//   const getCellCharacter = (coord) => {
//     const x = Math.floor((window.innerWidth - cursor.x) / (window.innerWidth / 70));
//     const y = Math.floor(cursor.y / (window.innerHeight / 13));

//     if (coord.x === x && coord.y === y) return '┼';
//     if (coord.x === x) return '│';
//     if (coord.y === y) return '─';
//     return '•';
//   };

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

//   useEffect(() => {
//     const getVideoStream = async () => {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//         videoRef.current.srcObject = stream;
//       } catch (error) {
//         console.log('Error accessing video stream:', error);
//       }
//     };

//     getVideoStream();
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
//         color: 'white',
//       }}
//     >
//       <video
//         ref={videoRef}
//         style={{
//           transform: 'scaleX(-1)',
//           width: 'auto',
//           height: 'auto',
//           maxWidth: '100%',
//           maxHeight: '100%',
//           display: 'none',
//         }}
//         onLoadedMetadata={(event) => {
//           event.target.play();
//         }}
//       />
//       <div
//         style={{
//           transition: 'all 0.1s linear', // Adjust the transition properties as needed
//         }}
//       >
//         {generateGrid()}
//       </div>
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

//orb
// import React, { useEffect, useRef } from 'react';
// import p5 from 'p5';
// import * as ml5 from 'ml5';
// import './App.css'

// export default function App() {
//   const canvasRef = useRef(null);
//   const p5Instance = useRef(null); // Ref to hold the p5 instance

//   let handPose;
//   let angle = 0;

//   useEffect(() => {
//     const startSketch = async () => {
//       const videoElement = document.createElement('video');
//       videoElement.width = 640;
//       videoElement.height = 480;

//       const constraints = { video: { width: 640, height: 480 } };
//       const stream = await navigator.mediaDevices.getUserMedia(constraints);
//       videoElement.srcObject = stream;

//       await videoElement.play();

//       handPose = await ml5.handpose(videoElement, () => {
//         console.log('Model Loaded');
//       });

//       handPose.on('predict', (results) => {
//         if (results.length > 0) {
//           const hand = results[0].landmarks;
//           const thumbTip = hand[4];
//           const indexTip = hand[8];

//           const dx = indexTip[0] - thumbTip[0];
//           const dy = indexTip[1] - thumbTip[1];
//           const newAngle = Math.atan2(dy, dx);

//           angle = newAngle;
//         }
//       });
//     };

//     startSketch();

//     return () => {
//       if (handPose) {
//         handPose.removeAllListeners();
//         handPose = null;
//       }
//     };
//   }, []);

//   useEffect(() => {
//     if (!p5Instance.current) {
//       p5Instance.current = new p5(sketch);
//     } else {
//       p5Instance.current.remove(); // Remove the previous p5 instance
//       p5Instance.current = new p5(sketch);
//     }

//     return () => {
//       p5Instance.current.remove(); // Clean up the p5 instance
//     };
//   }, []);

//   const sketch = (p) => {
//     p.setup = () => {
//       p.createCanvas(1280, 575, p.WEBGL).parent(canvasRef.current);
//     };

//     p.draw = () => {
//       p.background(220);
//       p.resetMatrix(); // Reset the rotation
//       p.rotateX(angle); // Rotate the sphere around the X-axis based on hand movement
//       p.rotateY(angle); // Rotate the sphere around the Y-axis based on hand movement
//       p.rotateZ(angle); // Rotate the sphere around the Z-axis based on hand movement
//       p.noFill();
//       p.stroke(0);
//       p.sphere(100, 24, 16); // Create a grid sphere with more vertices
//     };
//   };

//   return <div ref={canvasRef} />;
// }

//pian
// import React, { useRef, useEffect } from 'react';
// import * as ml5 from 'ml5';
// import p5 from 'p5';

// const App = () => {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const pianoKeys = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
//   const audioContext = new (window.AudioContext || window.webkitAudioContext)();

//   useEffect(() => {
//     let video;
//     let handpose;
//     let isModelReady = false;
//     let oscillatorNodes = {};

//     const analyserNode = audioContext.createAnalyser();
//     analyserNode.fftSize = 2048;
//     const bufferLength = analyserNode.frequencyBinCount;
//     const dataArray = new Uint8Array(bufferLength);

//     const playNote = (key) => {
//       if (!oscillatorNodes[key]) {
//         const frequency = calculateFrequency(key);
//         const oscillator = audioContext.createOscillator();
//         oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
//         oscillator.connect(analyserNode);
//         oscillator.connect(audioContext.destination);
//         oscillator.start();
//         oscillatorNodes[key] = oscillator;
//       }
//     };

//     const stopNote = (key) => {
//       if (oscillatorNodes[key]) {
//         const oscillator = oscillatorNodes[key];
//         oscillator.stop();
//         oscillator.disconnect(analyserNode);
//         oscillator.disconnect(audioContext.destination);
//         delete oscillatorNodes[key];
//       }
//     };

//     const calculateFrequency = (key) => {
//       const baseFrequency = 261.63; // Frequency of C4 note (middle C)
//       const keyIndex = pianoKeys.indexOf(key);
//       return baseFrequency * Math.pow(2, keyIndex / 12);
//     };

//     const sketch = (p) => {
//       p.setup = () => {
//         p.createCanvas(640, 480).parent(canvasRef.current);
//         video = p.createCapture(p.VIDEO);
//         video.size(640, 480);
//         video.hide();

//         handpose = ml5.handpose(video, () => {
//           console.log('Model loaded');
//           isModelReady = true;
//         });

//         handpose.on('predict', (results) => {
//           if (results.length > 0) {
//             const handLandmarks = results[0].landmarks;
//             const fingers = handLandmarks.slice(5); // Ignore wrist landmarks

//             // Perform piano playing logic based on finger positions
//             for (let i = 0; i < fingers.length; i++) {
//               const finger = fingers[i];
//               const fingerPos = finger.slice(0, 2); // X, Y positions

//               // Calculate the key index based on finger position
//               const keyIndex = Math.floor((fingerPos[0] / p.width) * pianoKeys.length);

//               // Play or stop note based on finger position
//               if (keyIndex >= 0 && keyIndex < pianoKeys.length) {
//                 const key = pianoKeys[keyIndex];
//                 playNote(key);
//               } else {
//                 pianoKeys.forEach((key) => stopNote(key));
//               }
//             }
//           } else {
//             pianoKeys.forEach((key) => stopNote(key));
//           }
//         });
//       };

//       p.draw = () => {
//         p.background(0);
//         p.image(video, 0, 0, p.width, p.height);

//         // Get the frequency data from the analyserNode
//         analyserNode.getByteTimeDomainData(dataArray);

//         // Visualize the frequency data
//         p.stroke(255);
//         p.beginShape();
//         for (let i = 0; i < bufferLength; i++) {
//           const x = (p.width / bufferLength) * i;
//           const y = (dataArray[i] / 128) * p.height;
//           p.vertex(x, y);
//         }
//         p.endShape();
//       };
//     };

//     const myP5 = new p5(sketch);

//     return () => {
//       myP5.remove();
//       video.stop();
//       pianoKeys.forEach((key) => stopNote(key));
//     };
//   }, []);

//   return (
//     <div>
//       <video ref={videoRef} display="none" />
//       <div ref={canvasRef} />
//     </div>
//   );
// };

// export default App;

//dots
// import React, { useState, useEffect, useRef } from 'react';
// import ml5 from 'ml5';
// import './App.css';

// const App = () => {
//   const [cursor, setCursor] = useState({ x: 0, y: 0 }); // Cursor position
//   const videoRef = useRef(null);
//   const modelRef = useRef(null);

//   useEffect(() => {
//     const loadHandposeModel = async () => {
//       try {
//         modelRef.current = await ml5.handpose(videoRef.current, () => {
//           console.log('Handpose model loaded.');
//         });

//         modelRef.current.on('predict', (results) => {
//           if (results.length > 0) {
//             const hand = results[0];
//             const landmarks = hand.landmarks;

//             if (landmarks && landmarks.length >= 1) {
//               const indexFinger = landmarks[8];
//               const x = indexFinger[0];
//               const y = indexFinger[1];
//               setCursor({ x, y });
//             } else {
//               setCursor({ x: 0, y: 0 });
//             }
//           }
//         });
//       } catch (error) {
//         console.log('Error loading handpose model:', error);
//       }
//     };

//     loadHandposeModel();

//     return () => {
//       modelRef.current?.removeAllListeners();
//     };
//   }, []);

//   const getCellCharacter = (coord) => {
//     const x = Math.floor((window.innerWidth - cursor.x) / (window.innerWidth / 70));
//     const y = Math.floor(cursor.y / (window.innerHeight / 13));

//     if (coord.x === x && coord.y === y) return '┼';
//     if (coord.x === x) return '│';
//     if (coord.y === y) return '─';
//     return '·';
//   };

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

//   useEffect(() => {
//     const getVideoStream = async () => {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//         videoRef.current.srcObject = stream;
//       } catch (error) {
//         console.log('Error accessing video stream:', error);
//       }
//     };

//     getVideoStream();
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
//       <video
//         ref={videoRef}
//         style={{
//           transform: 'scaleX(-1)',
//           width: 'auto',
//           height: 'auto',
//           maxWidth: '100%',
//           maxHeight: '100%',
//           display: 'none',
//         }}
//         onLoadedMetadata={(event) => {
//           event.target.play();
//         }}
//       />
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

// import React, { useState, useEffect } from 'react';
// import '../App.css';

// const Maze = ({ width, height }) => {
//   const [maze, setMaze] = useState([]);
//   const [startX, setStartX] = useState(0);
//   const [startY, setStartY] = useState(0);
//   const [endX, setEndX] = useState(0);
//   const [endY, setEndY] = useState(0);

//   useEffect(() => {
//     // Create a 2D array for the maze
//     const newMaze = Array(height)
//       .fill(0)
//       .map(() => Array(width).fill(1));

//     const stack = [];
//     const visited = new Set();

//     // Starting point
//     const startX = Math.floor(Math.random() * width);
//     const startY = Math.floor(Math.random() * height);

//     stack.push({ x: startX, y: startY });
//     visited.add(`${startX},${startY}`);
//     newMaze[startY][startX] = 0;

//     while (stack.length > 0) {
//       const { x, y } = stack[stack.length - 1];
//       const neighbors = [];

//       // Get unvisited neighbors
//       if (x > 1 && !visited.has(`${x - 2},${y}`)) {
//         neighbors.push({ x: x - 2, y });
//       }
//       if (x < width - 2 && !visited.has(`${x + 2},${y}`)) {
//         neighbors.push({ x: x + 2, y });
//       }
//       if (y > 1 && !visited.has(`${x},${y - 2}`)) {
//         neighbors.push({ x, y: y - 2 });
//       }
//       if (y < height - 2 && !visited.has(`${x},${y + 2}`)) {
//         neighbors.push({ x, y: y + 2 });
//       }

//       if (neighbors.length === 0) {
//         stack.pop();
//       } else {
//         const randomNeighbor = neighbors[Math.floor(Math.random() * neighbors.length)];
//         const { x: nx, y: ny } = randomNeighbor;
//         newMaze[ny][nx] = 0;
//         newMaze[y + (ny - y) / 2][x + (nx - x) / 2] = 0;
//         visited.add(`${nx},${ny}`);
//         stack.push({ x: nx, y: ny });
//       }
//     }

//     setMaze(newMaze);
//     setStartX(startX);
//     setStartY(startY);
//     setEndX(width - 1);
//     setEndY(height - 1);
//   }, [width, height]);

//   return (
//     <div className="maze">
//       {maze.map((row, y) => (
//         <div key={y} className="maze-row">
//           {row.map((cell, x) => (
//             <div key={x} className={`maze-cell ${cell === 1 ? 'wall' : 'path'} ${x === startX && y === startY ? 'start' : ''} ${x === endX && y === endY ? 'end' : ''}`} />
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Maze;


//css
// .grid {
//     margin-top: 2.5%;
//     margin-left: 33%;
//     display: grid;
//     grid-template-columns: repeat(20, 20px); 
//     grid-template-rows: repeat(20, 20px); 
//     gap: 1px; 
//   }
  
//   .cell {
//     width: 20px; 
//     height: 20px; 
//     background-color: #ccc; 
//     border-radius: 15%;
//     transition: all 1s ease-in-out;
//   }
  
  
  
//   .circle {
//     border-radius: 50%; 
//     transition: all 1s ease-in-out;
//   }
  
//   .triangle {
//     width: 0;
//     height: 0;
//     border-left: 10px solid transparent;
//     border-right: 10px solid transparent;
//     border-bottom: 20px solid #ccc; 
//   }
  
//color
// import React, { useState } from 'react';
// import '../App.css';

// const Maze = () => {
//   const numRows = 20;
//   const numCols = 20;

//   const [gridColor, setGridColor] = useState('#ccc');

//   const changeColor = () => {
//     const randomColor = getRandomColor();
//     setGridColor(randomColor);
//   };

//   const getRandomColor = () => {
//     const letters = '0123456789ABCDEF';
//     let color = '#';
//     for (let i = 0; i < 6; i++) {
//       color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
//   };

//   const renderGrid = () => {
//     const grid = [];

//     for (let row = 0; row < numRows; row++) {
//       for (let col = 0; col < numCols; col++) {
//         grid.push(
//           <span
//             key={`${row}-${col}`}
//             className="cell"
//             style={{ gridColumn: col + 1, gridRow: row + 1, backgroundColor: gridColor }}
//             onClick={changeColor}
//           ></span>
//         );
//       }
//     }

//     return grid;
//   };

//   return <div className="grid">{renderGrid()}</div>;
// };

// export default Maze;

//shape
// import React, { useState } from 'react';
// import '../App.css';

// const Maze = () => {
//   const numRows = 20;
//   const numCols = 20;
//   const [isCircleGrid, setIsCircleGrid] = useState(false);

//   const renderGrid = () => {
//     const grid = [];

//     for (let row = 0; row < numRows; row++) {
//       for (let col = 0; col < numCols; col++) {
//         grid.push(
//           <span
//             key={`${row}-${col}`}
//             className={`cell ${isCircleGrid ? 'circle' : ''}`}
//             style={{ gridColumn: col + 1, gridRow: row + 1 }}
//             onClick={() => toggleGridShape()}
//           ></span>
//         );
//       }
//     }

//     return grid;
//   };

//   const toggleGridShape = () => {
//     setIsCircleGrid(!isCircleGrid);
//   };

//   return <div className="grid">{renderGrid()}</div>;
// };

// export default Maze;


//grid
// import React from 'react';
// import '../App.css';

// const Maze = () => {
//   const numRows = 20;
//   const numCols = 20;

//   const renderGrid = () => {
//     const grid = [];
  
//     for (let row = 0; row < numRows; row++) {
//       for (let col = 0; col < numCols; col++) {
//         grid.push(
//           <span
//             key={`${row}-${col}`}
//             className="cell"
//             style={{ gridColumn: col + 1, gridRow: row + 1 }}
//           ></span>
//         );
//       }
//     }
  
//     return grid;
//   };
  

//   return <div className="grid">{renderGrid()}</div>;
// };

// export default Maze;