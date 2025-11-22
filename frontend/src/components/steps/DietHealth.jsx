import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Button } from '../common/Button';
import { OptionButton } from '../common/OptionButton';
import { TextArea } from '../common/Input';
import { Apple, Brain, Stethoscope, ChevronLeft, Sparkles } from 'lucide-react';
import { DIETARY_PREFERENCES, STRESS_LEVELS } from '../../utils/constants';

export const DietHealth = ({ userData, updateUser, onBack, onGenerate, loading }) => {
  const { theme } = useTheme();

  const formatDiet = (d) => d.replace('_', '-').split('-').map(
    w => w.charAt(0).toUpperCase() + w.slice(1)
  ).join('-');

  return (
    <div className="space-y-6">
      <h2 className={`text-2xl font-bold ${theme.text} flex items-center gap-2`}>
        <Apple className="w-6 h-6" /> Diet & Health
      </h2>

      <div>
        <label className={`block mb-2 ${theme.subtext} font-medium`}>
          Dietary Preference
        </label>
        <div className="grid grid-cols-2 gap-3">
          {DIETARY_PREFERENCES.map((d) => (
            <OptionButton
              key={d}
              selected={userData.dietaryPreference === d}
              onClick={() => updateUser('dietaryPreference', d)}
            >
              {formatDiet(d)}
            </OptionButton>
          ))}
        </div>
      </div>

      <div>
        <label className={`block mb-2 ${theme.subtext} font-medium flex items-center gap-1`}>
          <Brain className="w-4 h-4" /> Stress Level
        </label>
        <div className="grid grid-cols-3 gap-3">
          {STRESS_LEVELS.map((s) => (
            <OptionButton
              key={s}
              selected={userData.stressLevel === s}
              onClick={() => updateUser('stressLevel', s)}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </OptionButton>
          ))}
        </div>
      </div>

      <div>
        <label className={`block mb-2 ${theme.subtext} font-medium`}>
          Sleep Hours: {userData.sleepHours}
        </label>
        <input
          type="range"
          min="4"
          max="10"
          value={userData.sleepHours}
          onChange={(e) => updateUser('sleepHours', e.target.value)}
          className="w-full accent-purple-500"
        />
      </div>

      <div>
        <label className={`block mb-2 ${theme.subtext} font-medium flex items-center gap-1`}>
          <Stethoscope className="w-4 h-4" /> Medical History (optional)
        </label>
        <TextArea
          placeholder="Any injuries, conditions, or limitations..."
          value={userData.medicalHistory}
          onChange={(e) => updateUser('medicalHistory', e.target.value)}
        />
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="secondary" onClick={onBack} icon={ChevronLeft}>
          Back
        </Button>
        <Button onClick={onGenerate} loading={loading} icon={Sparkles}>
          Generate My Plan
        </Button>
      </div>
    </div>
  );
};