import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Edit, Trash2 } from 'lucide-react';

// Mock data for a single meal. In a real app, you'd fetch this based on the ID.
const mockMealData = {
  id: 1,
  name: 'Chicken and Quinoa Bowl',
  imageUrl: 'https://placehold.co/600x400/1a202c/ffffff?text=Meal+Image',
  nutrients: [
    { name: 'Calories', value: '450', unit: 'kcal', status: 'safe' },
    { name: 'Sodium', value: '250', unit: 'mg', status: 'safe' },
    { name: 'Potassium', value: '300', unit: 'mg', status: 'safe' },
    { name: 'Phosphorus', value: '200', unit: 'mg', status: 'warning' },
    { name: 'Protein', value: '35', unit: 'g', status: 'safe' },
  ]
};

const statusColors = {
  safe: 'bg-green-500',
  warning: 'bg-yellow-500',
  danger: 'bg-red-500'
};

const Meal: React.FC = () => {
  const { mealId } = useParams(); // Gets the ID from the URL, e.g., /meal/1
  const navigate = useNavigate();

  // In a real app, you would have a useEffect hook here to fetch meal data
  // using the mealId. For now, we use mock data.
  // useEffect(() => {
  //   fetchMealData(mealId);
  // }, [mealId]);

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <header className="p-4 flex justify-between items-center">
        <button onClick={() => navigate(-1)} className="flex items-center">
          <ChevronLeft className="w-6 h-6 mr-1" />
          Back
        </button>
        <div>
          <button className="p-2 rounded-full hover:bg-gray-800 mr-2"><Edit className="w-5 h-5"/></button>
          <button className="p-2 rounded-full hover:bg-gray-800"><Trash2 className="w-5 h-5 text-red-500"/></button>
        </div>
      </header>

      <main className="p-4">
        <img
          src={mockMealData.imageUrl}
          alt={mockMealData.name}
          className="w-full h-48 object-cover rounded-lg mb-4"
          onError={(e) => { e.currentTarget.src = 'https://placehold.co/600x400/1a202c/ffffff?text=Image+Error'; }}
        />
        <h1 className="text-2xl font-bold mb-4">{mockMealData.name}</h1>

        <div className="space-y-3">
          {mockMealData.nutrients.map(nutrient => (
            <div key={nutrient.name} className="bg-gray-800 rounded-lg p-4 flex items-center">
              <div className={`w-3 h-3 rounded-full mr-4 ${statusColors[nutrient.status as keyof typeof statusColors]}`}></div>
              <p className="flex-grow font-semibold">{nutrient.name}</p>
              <p className="text-lg font-bold">{nutrient.value} <span className="text-sm text-gray-400">{nutrient.unit}</span></p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Meal;
