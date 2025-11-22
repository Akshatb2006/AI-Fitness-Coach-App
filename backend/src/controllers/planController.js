const geminiService = require('../services/geminiService');

const fallbackWorkout = {
  days: [
    { day: "Monday", focus: "Full Body Strength", duration: "45 mins", exercises: [
      { name: "Bodyweight Squats", sets: 3, reps: "15", rest: "60s", notes: "Keep chest up" },
      { name: "Push-ups", sets: 3, reps: "10-12", rest: "60s", notes: "Modify on knees if needed" },
      { name: "Dumbbell Rows", sets: 3, reps: "12 each", rest: "60s", notes: "Keep back flat" },
      { name: "Plank", sets: 3, reps: "30-45s", rest: "45s", notes: "Engage core" }
    ]},
    { day: "Tuesday", focus: "Cardio & Core", duration: "30 mins", exercises: [
      { name: "Jumping Jacks", sets: 3, reps: "30", rest: "30s", notes: "Land softly" },
      { name: "High Knees", sets: 3, reps: "20 each", rest: "30s", notes: "Drive knees up" },
      { name: "Mountain Climbers", sets: 3, reps: "20", rest: "45s", notes: "Keep hips level" },
      { name: "Bicycle Crunches", sets: 3, reps: "20", rest: "30s", notes: "Slow and controlled" }
    ]},
    { day: "Wednesday", focus: "Active Recovery", duration: "20 mins", exercises: [
      { name: "Light Walking", sets: 1, reps: "15 min", rest: "-", notes: "Easy pace" },
      { name: "Stretching", sets: 1, reps: "10 min", rest: "-", notes: "Full body" }
    ]},
    { day: "Thursday", focus: "Upper Body", duration: "40 mins", exercises: [
      { name: "Diamond Push-ups", sets: 3, reps: "8-10", rest: "60s", notes: "Hands close together" },
      { name: "Pike Push-ups", sets: 3, reps: "8", rest: "60s", notes: "Shoulders focus" },
      { name: "Tricep Dips", sets: 3, reps: "12", rest: "45s", notes: "Use sturdy surface" }
    ]},
    { day: "Friday", focus: "Lower Body", duration: "45 mins", exercises: [
      { name: "Lunges", sets: 3, reps: "12 each", rest: "60s", notes: "Keep torso upright" },
      { name: "Glute Bridges", sets: 3, reps: "15", rest: "45s", notes: "Squeeze at top" },
      { name: "Calf Raises", sets: 3, reps: "20", rest: "30s", notes: "Full range" },
      { name: "Wall Sit", sets: 3, reps: "30-45s", rest: "60s", notes: "Thighs parallel" }
    ]},
    { day: "Saturday", focus: "HIIT", duration: "25 mins", exercises: [
      { name: "Burpees", sets: 4, reps: "10", rest: "45s", notes: "Full extension" },
      { name: "Squat Jumps", sets: 4, reps: "12", rest: "45s", notes: "Land soft" },
      { name: "Speed Skaters", sets: 4, reps: "20", rest: "30s", notes: "Side to side" }
    ]},
    { day: "Sunday", focus: "Rest", duration: "15 mins", exercises: [
      { name: "Yoga/Stretching", sets: 1, reps: "15 min", rest: "-", notes: "Relax and recover" }
    ]}
  ]
};

const fallbackDiet = {
  meals: {
    breakfast: { time: "7:00 AM", items: ["Oatmeal with banana", "2 boiled eggs", "Green tea"], calories: 420, protein: "20g", carbs: "55g", fats: "14g" },
    morningSnack: { time: "10:00 AM", items: ["Greek yogurt", "Handful of almonds"], calories: 220, protein: "14g", carbs: "18g", fats: "10g" },
    lunch: { time: "1:00 PM", items: ["Grilled chicken breast", "Brown rice", "Mixed vegetables"], calories: 550, protein: "42g", carbs: "52g", fats: "16g" },
    eveningSnack: { time: "4:30 PM", items: ["Protein shake", "Apple"], calories: 280, protein: "25g", carbs: "35g", fats: "5g" },
    dinner: { time: "7:30 PM", items: ["Baked salmon", "Sweet potato", "Steamed broccoli"], calories: 480, protein: "38g", carbs: "42g", fats: "15g" }
  },
  totalCalories: 1950,
  macros: { protein: "139g", carbs: "202g", fats: "60g" },
  waterIntake: "2.5-3 liters"
};

const fallbackTips = [
  { category: "Hydration", tip: "Drink water first thing in the morning to boost metabolism", priority: "high" },
  { category: "Nutrition", tip: "Include protein in every meal for muscle recovery", priority: "high" },
  { category: "Sleep", tip: "Aim for 7-8 hours of quality sleep each night", priority: "high" },
  { category: "Workout", tip: "Always warm up 5-10 minutes before exercising", priority: "medium" },
  { category: "Recovery", tip: "Rest days are when muscles grow - take them seriously", priority: "medium" },
  { category: "Mindset", tip: "Track weekly progress - small wins add up!", priority: "medium" }
];

const generateUserProfile = (userData) => `
Name: ${userData.name || 'User'}
Age: ${userData.age || 25}
Gender: ${userData.gender || 'not specified'}
Height: ${userData.height || 170}cm
Weight: ${userData.weight || 70}kg
Goal: ${(userData.fitnessGoal || 'fitness').replace('_', ' ')}
Level: ${userData.fitnessLevel || 'beginner'}
Location: ${userData.workoutLocation || 'home'}
Diet: ${(userData.dietaryPreference || 'non_veg').replace('_', '-')}
Medical: ${userData.medicalHistory || 'None'}
Stress: ${userData.stressLevel || 'moderate'}
Sleep: ${userData.sleepHours || 7} hours
`.trim();

class PlanController {
  
  async generateFullPlan(req, res, next) {
    console.log('\n========================================');
    console.log('📥 Generate Full Plan Request');
    console.log('========================================');

    try {
      const userData = req.body;
      console.log('👤 User:', userData.name);
      
      const userProfile = generateUserProfile(userData);

      const workoutPrompt = `Create a 7-day workout plan for:
${userProfile}

Return ONLY valid JSON (no markdown):
{"days":[{"day":"Monday","focus":"Chest","duration":"45 mins","exercises":[{"name":"Push-ups","sets":3,"reps":"12","rest":"60s","notes":"Keep form"}]}]}`;

      const dietPrompt = `Create a daily meal plan for:
${userProfile}

Return ONLY valid JSON (no markdown):
{"meals":{"breakfast":{"time":"7:00 AM","items":["Oatmeal"],"calories":400,"protein":"15g","carbs":"50g","fats":"10g"},"lunch":{"time":"12:00 PM","items":["Chicken"],"calories":500,"protein":"35g","carbs":"40g","fats":"15g"},"dinner":{"time":"7:00 PM","items":["Fish"],"calories":450,"protein":"30g","carbs":"35g","fats":"18g"},"morningSnack":{"time":"10:00 AM","items":["Yogurt"],"calories":150,"protein":"10g","carbs":"15g","fats":"5g"},"eveningSnack":{"time":"4:00 PM","items":["Nuts"],"calories":200,"protein":"8g","carbs":"10g","fats":"15g"}},"totalCalories":1700,"macros":{"protein":"98g","carbs":"150g","fats":"63g"},"waterIntake":"2.5L"}`;

      const tipsPrompt = `Give 6 fitness tips for:
${userProfile}

Return ONLY valid JSON array (no markdown):
[{"category":"Nutrition","tip":"Tip here","priority":"high"}]`;

      const quotePrompt = `Short fitness quote for ${userData.fitnessGoal || 'fitness'}. Return only the quote, no quotes.`;

      console.log('🚀 Calling Gemini API...');

      const results = await Promise.allSettled([
        geminiService.generateContent(workoutPrompt),
        geminiService.generateContent(dietPrompt),
        geminiService.generateContent(tipsPrompt),
        geminiService.generateContent(quotePrompt)
      ]);

      console.log('✅ API calls completed');

      const plan = {
        workout: results[0].status === 'fulfilled' 
          ? geminiService.parseJSON(results[0].value, fallbackWorkout) 
          : fallbackWorkout,
        diet: results[1].status === 'fulfilled' 
          ? geminiService.parseJSON(results[1].value, fallbackDiet) 
          : fallbackDiet,
        tips: results[2].status === 'fulfilled' 
          ? geminiService.parseJSON(results[2].value, fallbackTips) 
          : fallbackTips,
        quote: results[3].status === 'fulfilled' && results[3].value
          ? results[3].value.trim().replace(/^["']|["']$/g, '')
          : "The only bad workout is the one that didn't happen.",
        generatedAt: new Date().toISOString()
      };

      console.log('📤 Sending response');
      res.json({ success: true, data: plan });

    } catch (error) {
      console.error('❌ Error:', error.message);
      
      res.json({
        success: true,
        data: {
          workout: fallbackWorkout,
          diet: fallbackDiet,
          tips: fallbackTips,
          quote: "Every step forward is progress. Keep moving!",
          generatedAt: new Date().toISOString(),
          note: "Using default plan"
        }
      });
    }
  }

  async generateWorkout(req, res, next) {
    try {
      const userData = req.body;
      const userProfile = generateUserProfile(userData);
      
      const prompt = `Create a 7-day workout for: ${userProfile}
Return ONLY JSON: {"days":[{"day":"Monday","focus":"Full Body","duration":"45 mins","exercises":[{"name":"Squats","sets":3,"reps":"12","rest":"60s","notes":"Form first"}]}]}`;

      const result = await geminiService.generateContent(prompt);
      const workout = geminiService.parseJSON(result, fallbackWorkout);

      res.json({ success: true, data: workout });
    } catch (error) {
      res.json({ success: true, data: fallbackWorkout });
    }
  }

  async generateDiet(req, res, next) {
    try {
      const userData = req.body;
      const userProfile = generateUserProfile(userData);
      
      const prompt = `Create a meal plan for: ${userProfile}
Return ONLY JSON with meals object, totalCalories, macros, waterIntake.`;

      const result = await geminiService.generateContent(prompt);
      const diet = geminiService.parseJSON(result, fallbackDiet);

      res.json({ success: true, data: diet });
    } catch (error) {
      res.json({ success: true, data: fallbackDiet });
    }
  }

  async generateTips(req, res, next) {
    try {
      const userData = req.body;
      const userProfile = generateUserProfile(userData);
      
      const prompt = `Give 6 tips for: ${userProfile}
Return ONLY JSON array: [{"category":"Nutrition","tip":"text","priority":"high"}]`;

      const result = await geminiService.generateContent(prompt);
      const tips = geminiService.parseJSON(result, fallbackTips);

      res.json({ success: true, data: tips });
    } catch (error) {
      res.json({ success: true, data: fallbackTips });
    }
  }

  async generateQuote(req, res, next) {
    try {
      const { fitnessGoal } = req.body;
      const prompt = `Short inspiring fitness quote for ${fitnessGoal || 'fitness'}. Only return the quote text.`;
      
      const result = await geminiService.generateContent(prompt);
      
      res.json({ 
        success: true, 
        data: { quote: result?.trim() || "Push yourself!" } 
      });
    } catch (error) {
      res.json({ 
        success: true, 
        data: { quote: "Your only limit is you!" } 
      });
    }
  }
}

module.exports = new PlanController();