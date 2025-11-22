import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Dumbbell, Image, Clock, Flame } from 'lucide-react';

export const WorkoutPlan = ({ workout, onExerciseClick }) => {
  const { theme, darkMode } = useTheme();

  if (!workout?.days) return null;

  return (
    <div className={`${theme.card} rounded-2xl p-6 border ${theme.border}`}>
      <h3 className={`text-xl font-bold ${theme.text} flex items-center gap-2 mb-4`}>
        <Dumbbell className="w-6 h-6" /> Weekly Workout Plan
      </h3>

      <div className="space-y-4">
        {workout.days.map((day, i) => (
          <div
            key={i}
            className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-100'}`}
          >
            <div className={`font-semibold ${theme.text} mb-3 flex items-center justify-between`}>
              <span>{day.day} - {day.focus}</span>
              {day.duration && (
                <span className={`${theme.subtext} text-sm flex items-center gap-1`}>
                  <Clock className="w-4 h-4" /> {day.duration}
                </span>
              )}
            </div>

            <div className="space-y-2">
              {day.exercises.map((ex, j) => (
                <div
                  key={j}
                  onClick={() => onExerciseClick(ex.name)}
                  className={`flex justify-between items-center p-3 rounded-lg ${
                    darkMode ? 'bg-gray-600/50 hover:bg-gray-600' : 'bg-white hover:bg-gray-50'
                  } cursor-pointer transition-colors`}
                >
                  <div>
                    <span className={`${theme.text} font-medium`}>{ex.name}</span>
                    {ex.notes && (
                      <p className={`${theme.subtext} text-sm`}>{ex.notes}</p>
                    )}
                  </div>
                  <div className={`${theme.subtext} text-sm flex items-center gap-3`}>
                    <span>{ex.sets}×{ex.reps}</span>
                    <span className="hidden sm:inline">Rest: {ex.rest}</span>
                    <Image className="w-4 h-4 text-purple-500" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};