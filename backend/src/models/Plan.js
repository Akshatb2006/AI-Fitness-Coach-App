const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  name: String,
  sets: Number,
  reps: String,
  rest: String,
  notes: String
});

const daySchema = new mongoose.Schema({
  day: String,
  focus: String,
  duration: String,
  exercises: [exerciseSchema]
});

const mealSchema = new mongoose.Schema({
  time: String,
  items: [String],
  calories: Number,
  protein: String,
  carbs: String,
  fats: String
});

const planSchema = new mongoose.Schema({
  userId: { type: String, required: true, index: true },
  userData: {
    name: String,
    age: Number,
    gender: String,
    height: Number,
    weight: Number,
    fitnessGoal: String,
    fitnessLevel: String,
    workoutLocation: String,
    dietaryPreference: String,
    medicalHistory: String,
    stressLevel: String,
    sleepHours: Number
  },
  workout: {
    days: [daySchema]
  },
  diet: {
    meals: {
      breakfast: mealSchema,
      morningSnack: mealSchema,
      lunch: mealSchema,
      eveningSnack: mealSchema,
      dinner: mealSchema
    },
    totalCalories: Number,
    macros: {
      protein: String,
      carbs: String,
      fats: String
    },
    waterIntake: String
  },
  tips: [{
    category: String,
    tip: String,
    priority: String
  }],
  quote: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

planSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Plan', planSchema);