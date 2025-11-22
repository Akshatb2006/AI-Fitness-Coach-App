const generateUserProfile = (userData) => {
  return `
    Name: ${userData.name}
    Age: ${userData.age}
    Gender: ${userData.gender}
    Height: ${userData.height}cm
    Weight: ${userData.weight}kg
    Fitness Goal: ${userData.fitnessGoal.replace('_', ' ')}
    Fitness Level: ${userData.fitnessLevel}
    Workout Location: ${userData.workoutLocation}
    Dietary Preference: ${userData.dietaryPreference.replace('_', '-')}
    Medical History: ${userData.medicalHistory || 'None'}
    Stress Level: ${userData.stressLevel}
    Sleep Hours: ${userData.sleepHours} hours
  `;
};

const workoutPrompt = (userProfile) => `
Create a personalized 7-day workout plan for this user:
${userProfile}

Return ONLY valid JSON in this exact format (no markdown, no code blocks):
{
  "days": [
    {
      "day": "Monday",
      "focus": "Chest & Triceps",
      "duration": "45 mins",
      "calories_burn": 300,
      "exercises": [
        {
          "name": "Push-ups",
          "sets": 3,
          "reps": "12-15",
          "rest": "60s",
          "notes": "Keep core tight",
          "difficulty": "beginner"
        }
      ]
    }
  ],
  "weeklyGoal": "Build foundational strength",
  "restDays": ["Sunday"]
}`;

const dietPrompt = (userProfile) => `
Create a personalized daily diet plan for this user:
${userProfile}

Return ONLY valid JSON in this exact format (no markdown, no code blocks):
{
  "meals": {
    "breakfast": {
      "time": "7:00 AM",
      "items": ["Oatmeal with berries", "2 boiled eggs"],
      "calories": 350,
      "protein": "18g",
      "carbs": "45g",
      "fats": "12g"
    },
    "morningSnack": {
      "time": "10:00 AM",
      "items": ["Greek yogurt", "Handful of almonds"],
      "calories": 200,
      "protein": "12g",
      "carbs": "15g",
      "fats": "10g"
    },
    "lunch": {
      "time": "1:00 PM",
      "items": ["Grilled chicken breast", "Brown rice", "Steamed vegetables"],
      "calories": 550,
      "protein": "40g",
      "carbs": "50g",
      "fats": "15g"
    },
    "eveningSnack": {
      "time": "4:00 PM",
      "items": ["Protein shake", "Banana"],
      "calories": 250,
      "protein": "25g",
      "carbs": "30g",
      "fats": "5g"
    },
    "dinner": {
      "time": "7:00 PM",
      "items": ["Baked salmon", "Sweet potato", "Mixed salad"],
      "calories": 500,
      "protein": "35g",
      "carbs": "40g",
      "fats": "18g"
    }
  },
  "totalCalories": 1850,
  "macros": {
    "protein": "130g",
    "carbs": "180g",
    "fats": "60g"
  },
  "waterIntake": "3 liters",
  "supplements": ["Multivitamin", "Omega-3"]
}`;

const tipsPrompt = (userProfile) => `
Generate 6 personalized fitness and lifestyle tips for this user:
${userProfile}

Return ONLY a valid JSON array (no markdown, no code blocks):
[
  {
    "category": "Nutrition",
    "tip": "Your tip here",
    "priority": "high"
  }
]`;

const quotePrompt = (fitnessGoal) => `
Generate an inspiring, unique fitness motivation quote for someone focused on ${fitnessGoal.replace('_', ' ')}.
Return ONLY the quote text, nothing else. No quotation marks.`;

module.exports = {
  generateUserProfile,
  workoutPrompt,
  dietPrompt,
  tipsPrompt,
  quotePrompt
};
