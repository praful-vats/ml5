import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Orb from './components/Orb';
import Dots from './components/Dots';
import Wand from './components/Wand';
import Hand from './components/Hand';
import './App.css';

function App() {
  const [activeInstruction, setActiveInstruction] = useState('');
  const [isCursorHovering, setIsCursorHovering] = useState(false);

  const handleMouseEnter = (instruction) => {
    setTimeout(() => {
      setActiveInstruction(instruction);
      setIsCursorHovering(true);
    }, 300); // Adjust the delay duration as needed
  };
  
  const handleMouseLeave = () => {
    setTimeout(() => {
      setActiveInstruction('');
      setIsCursorHovering(false);
    }, 300); // Adjust the delay duration as needed
  };
  

  return (
    <Router>
      <div>
        <nav className="right-nav">
          <ul>
            <li
              onMouseEnter={() => handleMouseEnter(<span className={`text initial-state ${isCursorHovering ? 'hovering' : ''}`}>
                /01 <span className='ast'>*</span><br />
                <br />
                <span className="ins">
                  Show your hand to the camera and <br />
                  <span className="ins">move crosshair with your index finger<br /><br />
                    <span className="inst">^wait until the model is loaded</span>
                  </span>
                </span>
              </span>)}
              onMouseLeave={handleMouseLeave}
            >
              <Link to="/dot" className="nav-link">
                <span className="nav-n">/01</span>
                <span className="nav-h">Dot</span>
                <span className="nav-t">Move crosshair like a Jedi</span>
                <span className="nav-a">&#x1F86D;</span>
              </Link>
            </li>
            <li
              onMouseEnter={() => handleMouseEnter(<span className={`text initial-state ${isCursorHovering ? 'hovering' : ''}`}>
              /02 <span className='ast'>*</span><br />
              <br />
              <span className="ins">
                Control the sphere <br />
                <span className="ins">with your hand movement<br /><br />
                  <span className="inst">^wait until the model is loaded</span>
                </span>
              </span>
            </span>)}
              onMouseLeave={handleMouseLeave}
            >
              <Link to="/orb" className="nav-link">
                <span className="nav-n">/02</span>
                <span className="nav-h">Orb</span>
                <span className="nav-t">Control Sphere like a Sith</span>
                <span className="nav-a">&#x1F86D;</span>
              </Link>
            </li>
            <li
              onMouseEnter={() => handleMouseEnter(<span className={`text initial-state ${isCursorHovering ? 'hovering' : ''}`}>
              /03 <span className='ast'>*</span><br />
              <br />
              <span className="ins">
                Show hand to the camera <br />
                <span className="ins">and track your index finger<br /><br />
                  <span className="inst">^wait until the model is loaded</span>
                </span>
              </span>
            </span>)}
              onMouseLeave={handleMouseLeave}
            >
              <Link to="/wand" className="nav-link">
                <span className="nav-n">/03</span>
                <span className="nav-h">Wand</span>
                <span className="nav-t">Track your magical Wand</span>
                <span className="nav-a">&#x1F86D;</span>
              </Link>
            </li>
            <li
              onMouseEnter={() => handleMouseEnter(<span className={`text initial-state ${isCursorHovering ? 'hovering' : ''}`}>
              /04 <span className='ast'>*</span><br />
              <br />
              <span className="ins">
                Show your hand to the camera and <br />
                <span className="ins">see your hand that did all the magic<br /><br />
                  <span className="inst">^wait until the model is loaded</span>
                </span>
              </span>
            </span>)}
              onMouseLeave={handleMouseLeave}
            >
              <Link to="/hand" className="nav-link">
                <span className="nav-n">/04</span>
                <span className="nav-h">Hand</span>
                <span className="nav-t">See the magic hand vision</span>
                <span className="nav-a">&#x1F86D;</span>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="content">
          <Routes>
            <Route
              path="/"
              element={
                <div className="homepage">
                  {isCursorHovering ? null : (
                    <span className={`text initial-state ${isCursorHovering ? 'hovering' : ''}`}>
                      /00 <span className='ast'>*</span><br />
                      <br />
                      <span className="ins">
                        Hover over projects <br />
                        <span className="ins">to see instructions here<br /><br />
                          <span className="inst">^wait for 'model is ready' message</span>
                        </span>
                      </span>
                    </span>
                  )}
                </div>
              }
            />
            <Route path="/orb" element={<Orb />} />
            <Route path="/dot" element={<Dots />} />
            <Route path="/wand" element={<Wand />} />
            <Route path="/hand" element={<Hand />} />
          </Routes>
        </div>
      </div>
      {activeInstruction && (
        <div className="instruction-highlight">
          <p>{activeInstruction}</p>
        </div>
      )}
    </Router>
  );
}

export default App;
