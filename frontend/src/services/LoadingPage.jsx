import React, { useEffect, useState } from 'react';

function LoadingPage({ onComplete }) {
  const [text, setText] = useState("");
  const fullText = "<Hello there />";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText(fullText.substring(0, index));
      index++;

      if (index > fullText.length) {
        clearInterval(interval);

        setTimeout(() => {
          onComplete();
        }, 1000);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 bg-black text-light d-flex flex-column align-items-center justify-content-center" style={{ zIndex: 1050 }}>
      {/* Typing text */}
      <div className="mb-4 fs-1 fw-bold font-monospace">
        {text}
        <span className="animate-blink ms-1">|</span>
      </div>

      {/* Loading bar */}
      <div className="position-relative overflow-hidden rounded" style={{ width: "200px", height: "2px", backgroundColor: "#2d2d2d" }}>
        <div
          className="animate-loading-bar"
          style={{
            width: "40px",
            height: "100%",
            backgroundColor: "#60a5fa",
            boxShadow: "0 0 15px #3b8"
          }}
        >
          {" "}
        </div>
      </div>
    </div>
  );
}

export default LoadingPage;
