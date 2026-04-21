import React, { useState, useEffect } from 'react';
import './styles/App.css';  // Make sure this path is correct

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [dotCount, setDotCount] = useState(0);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          clearInterval(dotsInterval);
          // Call onComplete when loading is done
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 500);
          return 100;
        }
        return prev + 4;
      });
    }, 120);

    const dotsInterval = setInterval(() => {
      setDotCount(prev => (prev + 1) % 4);
    }, 500);

    return () => {
      clearInterval(progressInterval);
      clearInterval(dotsInterval);
    };
  }, [onComplete]);

  return (
    <div className="loader-container">
      <h1>My Drawing Journey</h1>
      <div className="subtitle">Creating art, one sketch at a time</div>
      
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>
      
      <div className="loading-text">
        Loading<span className="dots">{'.'.repeat(dotCount)}</span>
      </div>
    </div>
  );
};

export default LoadingScreen;