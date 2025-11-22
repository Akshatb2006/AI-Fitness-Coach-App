import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Button } from '../common/Button';
import { OptionButton } from '../common/OptionButton';
import { Target, ChevronLeft, ChevronRight, Flame, Dumbbell, Heart, Activity, MapPin } from 'lucide-react';
import { FITNESS_GOALS, FITNESS_LEVELS, WORKOUT_LOCATIONS } from '../../utils/constants';

const iconMap = { Flame, Dumbbell, Heart, Activity };

export const FitnessGoals = ({ userData, updateUser, onNext, onBack }) => {
  const { theme } = useTheme();

  return (
    <div className="space-y-6">
      <h2 className={`text-2xl font-bold ${theme.text} flex items-center gap-2`}>
        <Target className="w-6 h-6" /> Fitness Goals
      </h2>

      <div>
        <label className={`block mb-2 ${theme.subtext} font-medium`}>
          What's your goal?
        </label>
        <div className="grid grid-cols-2 gap-3">
          {FITNESS_GOALS.map((g) => (
            <OptionButton
              key={g.id}
              selected={userData.fitnessGoal === g.id}
              onClick={() => updateUser('fitnessGoal', g.id)}
              icon={iconMap[g.icon]}
            >
              {g.label}
            </OptionButton>
          ))}
        </div>
      </div>

      <div>
        <label className={`block mb-2 ${theme.subtext} font-medium`}>
          Fitness Level
        </label>
        <div className="grid grid-cols-3 gap-3">
          {FITNESS_LEVELS.map((l) => (
            <OptionButton
              key={l}
              selected={userData.fitnessLevel === l}
              onClick={() => updateUser('fitnessLevel', l)}
            >
              {l.charAt(0).toUpperCase() + l.slice(1)}
            </OptionButton>
          ))}
        </div>
      </div>

      <div>
        <label className={`block mb-2 ${theme.subtext} font-medium flex items-center gap-1`}>
          <MapPin className="w-4 h-4" /> Workout Location
        </label>
        <div className="grid grid-cols-3 gap-3">
          {WORKOUT_LOCATIONS.map((l) => (
            <OptionButton
              key={l}
              selected={userData.workoutLocation === l}
              onClick={() => updateUser('workoutLocation', l)}
            >
              {l.charAt(0).toUpperCase() + l.slice(1)}
            </OptionButton>
          ))}
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="secondary" onClick={onBack} icon={ChevronLeft}>
          Back
        </Button>
        <Button onClick={onNext} icon={ChevronRight}>
          Next
        </Button>
      </div>
    </div>
  );
};
