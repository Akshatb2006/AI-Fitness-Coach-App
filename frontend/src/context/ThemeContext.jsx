import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const theme = darkMode
    ? {
        bg: 'bg-gray-900',
        card: 'bg-gray-800',
        text: 'text-white',
        subtext: 'text-gray-400',
        border: 'border-gray-700',
        accent: 'from-purple-600 to-pink-600',
        input: 'bg-gray-700 border-gray-600',
        hover: 'hover:bg-gray-700'
      }
    : {
        bg: 'bg-gray-50',
        card: 'bg-white',
        text: 'text-gray-900',
        subtext: 'text-gray-600',
        border: 'border-gray-200',
        accent: 'from-purple-500 to-pink-500',
        input: 'bg-white border-gray-300',
        hover: 'hover:bg-gray-100'
      };

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);