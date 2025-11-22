export const FITNESS_GOALS = [
  { id: 'weight_loss', label: 'Weight Loss', icon: 'Flame' },
  { id: 'muscle_gain', label: 'Muscle Gain', icon: 'Dumbbell' },
  { id: 'maintenance', label: 'Maintenance', icon: 'Heart' },
  { id: 'endurance', label: 'Endurance', icon: 'Activity' }
];

export const FITNESS_LEVELS = ['beginner', 'intermediate', 'advanced'];
export const WORKOUT_LOCATIONS = ['home', 'gym', 'outdoor'];
export const DIETARY_PREFERENCES = ['veg', 'non_veg', 'vegan', 'keto'];
export const STRESS_LEVELS = ['low', 'moderate', 'high'];

export const INITIAL_USER_DATA = {
  name: '',
  age: '',
  gender: 'male',
  height: '',
  weight: '',
  fitnessGoal: 'weight_loss',
  fitnessLevel: 'beginner',
  workoutLocation: 'home',
  dietaryPreference: 'non_veg',
  medicalHistory: '',
  stressLevel: 'moderate',
  sleepHours: '7'
};