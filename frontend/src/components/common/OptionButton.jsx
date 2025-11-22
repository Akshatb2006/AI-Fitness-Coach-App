import React from 'react';
import { useTheme } from '../../context/ThemeContext';

export const OptionButton = ({ selected, onClick, children, icon: Icon }) => {
  const { theme } = useTheme();

  return (
    <button
      onClick={onClick}
      className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 border flex items-center justify-center gap-2 ${
        selected
          ? `bg-gradient-to-r ${theme.accent} text-white border-transparent shadow-lg`
          : `${theme.card} ${theme.text} ${theme.border} hover:border-purple-500`
      }`}
    >
      {Icon && <Icon className="w-5 h-5" />}
      {children}
    </button>
  );
};