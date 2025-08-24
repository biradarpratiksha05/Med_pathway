import React, { useState } from 'react';
import { ChevronDown, Utensils, Apple, Coffee, Sun, Moon } from 'lucide-react';
import { Disease } from '../types';

interface MealPlan {
  time: string;
  icon: React.ReactNode;
  title: string;
  recommendations: string[];
  restrictions: string[];
}

interface DietPlanProps {
  diseases: Disease[];
}

export default function DietPlan({ diseases }: DietPlanProps) {
  const [openSection, setOpenSection] = useState<string | null>('breakfast');

  const mealPlans: Record<string, MealPlan> = {
    breakfast: {
      time: '7:00 AM - 9:00 AM',
      icon: <Coffee className="w-5 h-5" />,
      title: 'Breakfast',
      recommendations: [
        'Whole grain bread or oatmeal',
        'Low-fat milk or yogurt',
        'Fresh fruits',
        'Boiled eggs or lean protein',
      ],
      restrictions: [
        'Avoid sugary cereals',
        'Limit processed meats',
      ],
    },
    morningSnack: {
      time: '10:30 AM',
      icon: <Apple className="w-5 h-5" />,
      title: 'Morning Snack',
      recommendations: [
        'Handful of nuts',
        'Fresh fruit',
        'Low-fat yogurt',
      ],
      restrictions: [
        'Avoid packaged snacks',
        'Skip sugary drinks',
      ],
    },
    lunch: {
      time: '1:00 PM - 2:00 PM',
      icon: <Sun className="w-5 h-5" />,
      title: 'Lunch',
      recommendations: [
        'Lean protein (chicken/fish)',
        'Whole grains',
        'Steamed vegetables',
        'Healthy fats (olive oil)',
      ],
      restrictions: [
        'Limit salt intake',
        'Avoid fried foods',
      ],
    },
    dinner: {
      time: '7:00 PM - 8:00 PM',
      icon: <Moon className="w-5 h-5" />,
      title: 'Dinner',
      recommendations: [
        'Light protein options',
        'Complex carbohydrates',
        'Green vegetables',
        'Small portion sizes',
      ],
      restrictions: [
        'No heavy meals',
        'Avoid caffeine',
      ],
    },
  };

  const getDiseaseSpecificAdvice = (disease: Disease) => {
    switch (disease.name) {
      case 'Diabetes':
        return 'Monitor carbohydrate intake and maintain regular meal times';
      case 'Hypertension':
        return 'Reduce sodium intake and increase potassium-rich foods';
      case 'Cholesterol':
        return 'Choose foods low in saturated fats and high in fiber';
      default:
        return '';
    }
  };

  return (
    <div className="card p-6">
      <h2 className="text-xl font-semibold mb-6 flex items-center text-primary">
        <Utensils className="w-6 h-6 mr-2" />
        Personalized Diet Plan
      </h2>

      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3">Condition-Specific Guidelines</h3>
        <div className="space-y-3">
          {diseases.map((disease) => (
            <div
              key={disease.name}
              className="p-3 rounded-lg"
              style={{ backgroundColor: `${disease.color}10` }}
            >
              <span
                className="text-sm font-medium px-2 py-1 rounded-full"
                style={{ backgroundColor: disease.color, color: 'white' }}
              >
                {disease.name}
              </span>
              <p className="mt-2 text-sm text-text-secondary">
                {getDiseaseSpecificAdvice(disease)}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {Object.entries(mealPlans).map(([key, meal]) => (
          <div key={key} className="border rounded-lg overflow-hidden">
            <button
              className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50"
              onClick={() => setOpenSection(openSection === key ? null : key)}
            >
              <div className="flex items-center space-x-3">
                <div className="text-primary">{meal.icon}</div>
                <div>
                  <h3 className="font-medium">{meal.title}</h3>
                  <p className="text-sm text-text-secondary">{meal.time}</p>
                </div>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-gray-400 transition-transform ${
                  openSection === key ? 'transform rotate-180' : ''
                }`}
              />
            </button>
            
            {openSection === key && (
              <div className="p-4 bg-gray-50 border-t">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm text-primary mb-2">
                      Recommended Foods
                    </h4>
                    <ul className="space-y-2">
                      {meal.recommendations.map((item, index) => (
                        <li key={index} className="text-sm flex items-center">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm text-primary mb-2">
                      Foods to Avoid
                    </h4>
                    <ul className="space-y-2">
                      {meal.restrictions.map((item, index) => (
                        <li key={index} className="text-sm flex items-center">
                          <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}