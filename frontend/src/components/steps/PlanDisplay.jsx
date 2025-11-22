import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Button } from '../common/Button';
import { QuoteCard } from '../plan/QuoteCard';
import { WorkoutPlan } from '../plan/WorkoutPlan';
import { DietPlan } from '../plan/DietPlan';
import { Tips } from '../plan/Tips';
import { 
  Volume2, VolumeX, Download, RefreshCw, 
  Save, ChevronLeft 
} from 'lucide-react';

export const PlanDisplay = ({
  plan,
  speaking,
  onSpeak,
  onExportPDF,
  onSave,
  onRegenerate,
  onStartOver,
  onExerciseClick,
  onMealClick,
  exportLoading
}) => {
  const { theme } = useTheme();

  const getWorkoutSpeechText = () => {
    if (!plan?.workout?.days) return '';
    return plan.workout.days.map(d =>
      `${d.day}, ${d.focus}. ${d.exercises.map(e => 
        `${e.name}, ${e.sets} sets of ${e.reps}`
      ).join('. ')}`
    ).join('. ');
  };

  const getDietSpeechText = () => {
    if (!plan?.diet?.meals) return '';
    return Object.entries(plan.diet.meals).map(([meal, data]) =>
      `${meal}: ${data.items.join(', ')}`
    ).join('. ');
  };

  return (
    <div className="space-y-6">
      {plan?.quote && <QuoteCard quote={plan.quote} />}

      <div className="flex flex-wrap gap-3">
        <Button
  variant="secondary"
  onClick={() => {
    const text = getWorkoutSpeechText();
    onSpeak(text, 'workout');
  }}
  icon={speaking === 'workout' ? VolumeX : Volume2}
>
  {speaking === 'workout' ? 'Stop' : 'Read Workout'}
</Button>

<Button
  variant="secondary"
  onClick={() => {
    const text = getDietSpeechText();
    onSpeak(text, 'diet');
  }}
  icon={speaking === 'diet' ? VolumeX : Volume2}
>
  {speaking === 'diet' ? 'Stop' : 'Read Diet'}
</Button>


        <Button
          variant="secondary"
          onClick={onExportPDF}
          loading={exportLoading}
          icon={Download}
        >
          Export PDF
        </Button>

        <Button variant="secondary" onClick={onSave} icon={Save}>
          Save
        </Button>

        <Button variant="secondary" onClick={onRegenerate} icon={RefreshCw}>
          Regenerate
        </Button>
      </div>

      <WorkoutPlan workout={plan?.workout} onExerciseClick={onExerciseClick} />

      <DietPlan diet={plan?.diet} onMealClick={onMealClick} />

      <Tips tips={plan?.tips} />

      <Button
        variant="secondary"
        onClick={onStartOver}
        icon={ChevronLeft}
        className="w-full"
      >
        Start Over
      </Button>
    </div>
  );
};