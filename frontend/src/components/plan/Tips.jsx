import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Sparkles } from 'lucide-react';

export const Tips = ({ tips }) => {
  const { theme, darkMode } = useTheme();

  if (!tips?.length) return null;

  return (
    <div className={`${theme.card} rounded-2xl p-6 border ${theme.border}`}>
      <h3 className={`text-xl font-bold ${theme.text} flex items-center gap-2 mb-4`}>
        <Sparkles className="w-6 h-6" /> Personalized Tips
      </h3>

      <div className="space-y-3">
        {tips.map((tip, i) => {
          const tipText = typeof tip === 'object' ? tip.tip : tip;
          const category = typeof tip === 'object' ? tip.category : null;

          return (
            <div
              key={i}
              className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-100'} flex gap-3`}
            >
              <span className={`w-8 h-8 rounded-full bg-gradient-to-r ${theme.accent} text-white flex items-center justify-center text-sm font-bold flex-shrink-0`}>
                {i + 1}
              </span>
              <div>
                {category && (
                  <span className={`text-xs font-semibold text-purple-500 uppercase`}>
                    {category}
                  </span>
                )}
                <p className={theme.text}>{tipText}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
