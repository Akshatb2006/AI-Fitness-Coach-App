import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Quote } from 'lucide-react';

export const QuoteCard = ({ quote }) => {
  const { theme } = useTheme();

  return (
    <div className={`p-6 rounded-2xl bg-gradient-to-r ${theme.accent} text-white`}>
      <Quote className="w-8 h-8 mb-2 opacity-50" />
      <p className="text-lg italic font-medium">{quote}</p>
    </div>
  );
};