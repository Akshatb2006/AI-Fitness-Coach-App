import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Button } from '../common/Button';
import { Dumbbell, ChevronRight, Upload } from 'lucide-react';

export const Welcome = ({ onNext, onLoadSaved, hasSavedPlan }) => {
  const { theme } = useTheme();

  return (
    <div className="text-center space-y-8 py-12">
      <div className={`w-28 h-28 mx-auto rounded-full bg-gradient-to-r ${theme.accent} flex items-center justify-center shadow-2xl`}>
        <Dumbbell className="w-14 h-14 text-white" />
      </div>
      
      <div>
        <h1 className={`text-4xl font-bold ${theme.text} mb-3`}>
          AI Fitness Coach
        </h1>
        <p className={`text-xl ${theme.subtext}`}>
          Your personalized workout & diet companion
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button onClick={onNext} icon={ChevronRight}>
          Get Started
        </Button>
        {hasSavedPlan && (
          <Button variant="secondary" onClick={onLoadSaved} icon={Upload}>
            Load Saved Plan
          </Button>
        )}
      </div>

      <div className={`grid grid-cols-3 gap-4 pt-8 max-w-md mx-auto ${theme.subtext}`}>
        <div className="text-center">
          <div className={`text-2xl font-bold ${theme.text}`}>🏋️</div>
          <p className="text-sm">Custom Workouts</p>
        </div>
        <div className="text-center">
          <div className={`text-2xl font-bold ${theme.text}`}>🥗</div>
          <p className="text-sm">Diet Plans</p>
        </div>
        <div className="text-center">
          <div className={`text-2xl font-bold ${theme.text}`}>🎯</div>
          <p className="text-sm">AI Powered</p>
        </div>
      </div>
    </div>
  );
};