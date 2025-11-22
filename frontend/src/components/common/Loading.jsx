import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Loader2, Check } from 'lucide-react';

export const Loading = ({ stages }) => {
  const { theme } = useTheme();

  return (
    <div className="text-center space-y-6 py-12">
      <Loader2 className={`w-16 h-16 mx-auto ${theme.text} animate-spin`} />
      <h2 className={`text-2xl font-bold ${theme.text}`}>
        Creating Your Personalized Plan
      </h2>
      <div className="space-y-3">
        {stages.map((stage, i) => (
          <div
            key={i}
            className={`flex items-center justify-center gap-3 ${
              stage.active ? theme.text : stage.done ? 'text-green-500' : theme.subtext
            }`}
          >
            {stage.active ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : stage.done ? (
              <Check className="w-5 h-5" />
            ) : (
              <div className="w-5 h-5 rounded-full border-2 border-current" />
            )}
            <span>{stage.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};