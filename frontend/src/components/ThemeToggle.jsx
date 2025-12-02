import React from 'react';
import { useTheme } from '../context/ThemeContext';

function ThemeToggle({ inNavbar = false }) {
  const { theme, toggleTheme } = useTheme();

  const baseStyle = {
    width: inNavbar ? '40px' : '50px',
    height: inNavbar ? '40px' : '50px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: inNavbar ? 'transparent' : 'var(--card-bg)',
    border: inNavbar ? 'none' : '2px solid var(--border-color)',
    boxShadow: inNavbar ? 'none' : '0 4px 12px var(--card-shadow)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    color: inNavbar ? 'white' : 'var(--text-primary)',
    fontSize: inNavbar ? '1.3rem' : '1.5rem',
    padding: 0,
  };

  if (inNavbar) {
    return (
      <button
        onClick={toggleTheme}
        className="btn"
        style={{
          ...baseStyle,
          backgroundColor: theme === 'light' 
            ? 'rgba(13, 110, 253, 0.2)' 
            : 'rgba(255, 215, 0, 0.2)',
          border: `2px solid ${theme === 'light' ? '#0d6efd' : '#ffd700'}`,
          color: theme === 'light' ? '#0d6efd' : '#ffd700',
          boxShadow: `0 2px 8px ${theme === 'light' ? 'rgba(13, 110, 253, 0.3)' : 'rgba(255, 215, 0, 0.3)'}`,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.15) rotate(15deg)';
          e.currentTarget.style.backgroundColor = theme === 'light' 
            ? 'rgba(13, 110, 253, 0.3)' 
            : 'rgba(255, 215, 0, 0.3)';
          e.currentTarget.style.boxShadow = `0 4px 12px ${theme === 'light' ? 'rgba(13, 110, 253, 0.5)' : 'rgba(255, 215, 0, 0.5)'}`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
          e.currentTarget.style.backgroundColor = theme === 'light' 
            ? 'rgba(13, 110, 253, 0.2)' 
            : 'rgba(255, 215, 0, 0.2)';
          e.currentTarget.style.boxShadow = `0 2px 8px ${theme === 'light' ? 'rgba(13, 110, 253, 0.3)' : 'rgba(255, 215, 0, 0.3)'}`;
        }}
        aria-label="Toggle theme"
      >
        {theme === 'light' ? (
          <i className="bi bi-moon-fill"></i>
        ) : (
          <i className="bi bi-sun-fill"></i>
        )}
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="btn"
      style={{
        ...baseStyle,
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 1000,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.1) rotate(15deg)';
        e.currentTarget.style.boxShadow = '0 6px 20px var(--card-shadow)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
        e.currentTarget.style.boxShadow = '0 4px 12px var(--card-shadow)';
      }}
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <i className="bi bi-moon-fill"></i>
      ) : (
        <i className="bi bi-sun-fill"></i>
      )}
    </button>
  );
}

export default ThemeToggle;
