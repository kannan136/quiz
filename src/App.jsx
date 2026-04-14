import React, { useState, useEffect } from 'react';
import './App.css';

const COURSE_DATA = {
  ReactJS: [
    { 
      id: 1, 
      type: "video",
      mediaUrl: "https://www.youtube.com/embed/SqcY0GlETPk", 
      q: "According to the video, what is the main purpose of Props?", 
      options: ["State management", "Passing data to components", "Styling", "Database storage"], 
      a: "Passing data to components" 
    },
    { 
      id: 2, 
      type: "text",
      q: "Which hook is used for side effects?", 
      options: ["useState", "useEffect", "useMemo", "useRef"], 
      a: "useEffect" 
    }
  ],
  JavaScript: [
    { 
      id: 1, 
      type: "image",
      mediaUrl: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
      q: "JavaScript is primarily a _____ side language.", 
      options: ["Client", "Server", "Both", "None"], 
      a: "Both" 
    }
  ]
};

function App() {
  const [category, setCategory] = useState(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300);

  useEffect(() => {
    if (category && timeLeft > 0 && !isFinished) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) setIsFinished(true);
  }, [category, timeLeft, isFinished]);

  const handleAnswer = (opt) => {
    if (opt === COURSE_DATA[category][currentIdx].a) setScore(score + 1);
    if (currentIdx + 1 < COURSE_DATA[category].length) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setIsFinished(true);
    }
  };

  if (!category) {
    return (
      <div className="category-screen">
        <h1>Select Your Course</h1>
        <div className="category-grid">
          {Object.keys(COURSE_DATA).map(cat => (
            <button key={cat} onClick={() => setCategory(cat)}>{cat} Exam</button>
          ))}
        </div>
      </div>
    );
  }

  const currentQ = COURSE_DATA[category][currentIdx];

  return (
    <div className="exam-wrapper">
      {isFinished ? (
        <div className="card result-card">
          <h2>{category} Complete!</h2>
          <p>Final Score: {score} / {COURSE_DATA[category].length}</p>
          <button onClick={() => window.location.reload()}>Back to Home</button>
        </div>
      ) : (
        <div className="card">
          <div className="header">
            <span>{category} Module</span>
            <span className={timeLeft < 30 ? 'timer-warn' : ''}>Time: {timeLeft}s</span>
          </div>
          
          {/* Multimedia Rendering Logic */}
          <div className="media-container">
            {currentQ.type === "video" && (
              <iframe width="100%" height="200" src={currentQ.mediaUrl} title="video" frameBorder="0" allowFullScreen></iframe>
            )}
            {currentQ.type === "image" && (
              <img src={currentQ.mediaUrl} alt="context" className="q-image" />
            )}
          </div>

          <h3 className="question-text">{currentQ.q}</h3>
          <div className="options">
            {currentQ.options.map((opt, i) => (
              <button key={i} onClick={() => handleAnswer(opt)} className="opt-btn">{opt}</button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;