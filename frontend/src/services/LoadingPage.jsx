import React, { useEffect, useState } from "react";

function LoadingPage({ onComplete }) {
  const [text, setText] = useState("");
  const fullText = "<Hello there />";
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText(fullText.substring(0, index));
      index++;

      if (index > fullText.length) {
        clearInterval(interval);

        // Simulate loading progress
        let prog = 0;
        const progressInterval = setInterval(() => {
          prog += 2;
          setProgress(prog);
          if (prog >= 100) {
            clearInterval(progressInterval);
            setTimeout(() => onComplete(), 500);
          }
        }, 30);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  const particlesCount = 50;
  const particles = Array.from({ length: particlesCount }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    left: Math.random() * 100,
    top: Math.random() * 100,
    duration: Math.random() * 10 + 5,
  }));

  return (
    <div className="loading-page">
      {/* Floating particles */}
      {particles.map(p => (
        <div
          key={p.id}
          className="particle"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: `${p.left}%`,
            top: `${p.top}%`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}

      {/* Typing Text */}
      <div className="text-container">
        <div className="typing-text">
          {text}
          <span className="cursor">|</span>
        </div>
        <div className="subtitle">Loading… please wait</div>
      </div>

      {/* Loading Bar */}
      <div className="loading-bar-container">
        <div className="loading-bar" style={{ width: `${progress}%` }}></div>
      </div>

      <style>{`
        /* Full-screen gradient background */
        .loading-page {
          position: fixed;
          top:0; left:0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: linear-gradient(270deg, #000000ff, #295d6eff, #000000ff);
          background-size: 600% 600%;
          animation: gradientBG 15s ease-in-out infinite;
          overflow: hidden;
          z-index: 1050;
          color: white;
        }

        @keyframes gradientBG {
          0%{background-position:0% 50%}
          50%{background-position:100% 50%}
          100%{background-position:0% 50%}
        }

        /* Particles */
        .particle {
          position: absolute;
          background: rgba(255,255,255,0.7);
          border-radius: 50%;
          animation-name: float;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        @keyframes float {
          0% { transform: translateY(0) translateX(0); opacity: 0.6; }
          50% { transform: translateY(-50px) translateX(20px); opacity: 1; }
          100% { transform: translateY(0) translateX(0); opacity: 0.6; }
        }

        /* Typing text */
        .text-container {
          text-align: center;
          margin-bottom: 40px;
          z-index: 2;
        }
        .typing-text {
          font-family: monospace;
          font-size: 2rem;
          font-weight: bold;
          background: linear-gradient(90deg, #60a5fa, #3b82f6, #60a5fa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 10px;
        }
        .cursor {
          display: inline-block;
          width: 1ch;
          animation: blink 1s steps(2, start) infinite;
          color: #60a5fa;
          text-shadow: 0 0 8px #60a5fa;
        }
        @keyframes blink {
          0%,50%,100% {opacity:1;}
          25%,75% {opacity:0;}
        }
        .subtitle {
          font-size: 0.9rem;
          color: rgba(255,255,255,0.7);
        }

        /* Loading bar */
        .loading-bar-container {
          width: 300px;
          height: 8px;
          background-color: rgba(255,255,255,0.1);
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 0 10px rgba(0,0,0,0.2);
          z-index: 2;
        }
        .loading-bar {
          height: 100%;
          background: linear-gradient(90deg, #60a5fa, #3b82f6, #60a5fa);
          box-shadow: 0 0 15px #3b82f6;
          border-radius: 10px;
          transition: width 0.3s ease;
        }
      `}</style>
    </div>
  );
}

export default LoadingPage;
