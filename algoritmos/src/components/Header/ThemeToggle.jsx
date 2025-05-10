import React, { useState, useEffect } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  const toggleTheme = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark-mode', newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      style={{
        all: 'unset',
        cursor: 'pointer',
        fontSize: '1.3rem',
        lineHeight: '1',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '2px',
      }}
    >
      {darkMode ? <FaMoon /> : <FaSun />}
    </button>
  );
}; export default ThemeToggle;