import React, { useState, useEffect } from 'react';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  
  // Thêm useEffect để lưu theme vào localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
    }
  }, []);

  // Thêm function để toggle theme
  const toggleTheme = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('theme', !darkMode ? 'dark' : 'light');
  };

  return (
    <div className={`App ${darkMode ? 'dark' : 'light'}`}>
      <button onClick={toggleTheme} className="theme-toggle">
        {darkMode ? '🌞' : '🌙'}
      </button>
      {/* Code hiện tại của bạn */}
    </div>
  );
}

export default App;