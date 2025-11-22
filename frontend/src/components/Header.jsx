import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Dumbbell, Sun, Moon } from 'lucide-react';

export const Header = () => {
  const { darkMode, setDarkMode, theme } = useTheme();

  return (
    <header className={`${theme.card} border-b ${theme.border} sticky top-0 z-40`}>
      <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${theme.accent} flex items-center justify-center`}>
            <Dumbbell className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className={`font-bold ${theme.text} text-lg`}>FitCoach AI</span>
            <p className={`text-xs ${theme.subtext}`}>Powered by Gemini</p>
          </div>
        </div>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`p-2 rounded-lg ${theme.card} border ${theme.border} ${theme.hover} transition-colors`}
        >
          {darkMode ? (
            <Sun className={`w-5 h-5 ${theme.text}`} />
          ) : (
            <Moon className={`w-5 h-5 ${theme.text}`} />
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;