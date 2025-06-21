import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Utensils, Lightbulb, User } from 'lucide-react';

// Mock data - replace with data from your state management/API
const mockUserData = {
  name: 'Kyle Cheon',
  calories: 1253,
  nutrients: {
    sodium: 70,
    potassium: 48,
    phosphorus: 32,
    protein: 40,
  },
  meals: [
    { id: 1, name: 'Chicken and Quinoa Bowl', time: '12:30 PM' },
    { id: 2, name: 'Oatmeal with Berries', time: '8:00 AM' },
  ],
  dailyTip: 'Drink, rinse, repeat. Staying hydrated is essential for dialysis. This simple act can wash away toxins, prevent cramping, and help your body maintain a stable temperature. Aim for 8 glasses to give yourself a boost.'
};

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <header className="p-4 flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-400">Welcome back,</p>
          <h1 className="text-2xl font-bold">{mockUserData.name}</h1>
        </div>
        <button className="p-2 rounded-full bg-gray-800">
          <User className="w-6 h-6" />
        </button>
      </header>

      <main className="p-4">
        {/* Nutrient Summary */}
        <section className="bg-gray-800 rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg">Today's Intake</h2>
            <p className="font-bold text-lg">{mockUserData.calories} kcal</p>
          </div>
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold">{mockUserData.nutrients.sodium}</p>
              <p className="text-xs text-gray-400">Sodium (mg)</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{mockUserData.nutrients.potassium}</p>
              <p className="text-xs text-gray-400">Potassium (mg)</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{mockUserData.nutrients.phosphorus}</p>
              <p className="text-xs text-gray-400">Phosphorus (mg)</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{mockUserData.nutrients.protein}</p>
              <p className="text-xs text-gray-400">Protein (g)</p>
            </div>
          </div>
        </section>

        {/* Today's Food Check-in */}
        <section className="mb-6">
          <h2 className="font-bold text-lg mb-2">Today's Food Check-in</h2>
          <div className="space-y-2">
            {mockUserData.meals.map(meal => (
              <div key={meal.id} onClick={() => navigate(`/meal/${meal.id}`)} className="bg-gray-800 rounded-lg p-4 flex justify-between items-center cursor-pointer hover:bg-gray-700">
                <div>
                  <p className="font-semibold">{meal.name}</p>
                  <p className="text-sm text-gray-400">{meal.time}</p>
                </div>
                <Utensils className="w-5 h-5 text-gray-500" />
              </div>
            ))}
          </div>
        </section>

        {/* Daily Renal Tips */}
        <section>
          <h2 className="font-bold text-lg mb-2 flex items-center"><Lightbulb className="w-5 h-5 mr-2 text-yellow-400"/> Daily Renal Tips</h2>
          <div className="bg-gray-800 rounded-lg p-4">
            <p className="text-gray-300">{mockUserData.dailyTip}</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
