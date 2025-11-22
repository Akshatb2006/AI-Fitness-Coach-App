import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Salad, Image, Droplets } from 'lucide-react';

export const DietPlan = ({ diet, onMealClick }) => {
  const { theme, darkMode } = useTheme();

  if (!diet?.meals) return null;

  return (
    <div className={`${theme.card} rounded-2xl p-6 border ${theme.border}`}>
      <h3 className={`text-xl font-bold ${theme.text} flex items-center gap-2 mb-4`}>
        <Salad className="w-6 h-6" /> Daily Diet Plan
      </h3>

      <div className={`mb-4 p-4 rounded-xl bg-gradient-to-r ${theme.accent} text-white`}>
        <div className="flex flex-wrap justify-center gap-4 text-center">
          <div>
            <p className="text-2xl font-bold">{diet.totalCalories}</p>
            <p className="text-sm opacity-75">Calories</p>
          </div>
          <div className="hidden sm:block w-px bg-white/30" />
          <div>
            <p className="text-xl font-bold">{diet.macros?.protein}</p>
            <p className="text-sm opacity-75">Protein</p>
          </div>
          <div>
            <p className="text-xl font-bold">{diet.macros?.carbs}</p>
            <p className="text-sm opacity-75">Carbs</p>
          </div>
          <div>
            <p className="text-xl font-bold">{diet.macros?.fats}</p>
            <p className="text-sm opacity-75">Fats</p>
          </div>
        </div>
        {diet.waterIntake && (
          <div className="flex items-center justify-center gap-1 mt-2 text-sm opacity-75">
            <Droplets className="w-4 h-4" /> {diet.waterIntake} water daily
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(diet.meals).map(([meal, data]) => (
          <div
            key={meal}
            className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-100'}`}
          >
            <div className={`font-semibold ${theme.text} capitalize mb-2 flex justify-between items-center`}>
              <span>{meal.replace(/([A-Z])/g, ' $1').trim()}</span>
              <span className={`${theme.subtext} text-xs`}>
                {data.time && `${data.time} • `}{data.calories} cal
              </span>
            </div>

            <div className="space-y-1">
              {data.items.map((item, i) => (
                <div
                  key={i}
                  onClick={() => onMealClick(item)}
                  className={`p-2 rounded-lg ${
                    darkMode ? 'bg-gray-600/50 hover:bg-gray-600' : 'bg-white hover:bg-gray-50'
                  } cursor-pointer transition-colors flex justify-between items-center`}
                >
                  <span className={theme.text}>{item}</span>
                  <Image className={`w-4 h-4 text-purple-500`} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};