import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, BarChart2 } from 'lucide-react';

const Landing: React.FC = () => {
  const navigate = useNavigate();

  const handleStartChecking = () => {
    navigate('/scan'); // Navigate to the Scan page
  };

  const handleGoToDashboard = () => {
    navigate('/dashboard'); // Navigate to the Dashboard
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4 text-center">
      <ShieldCheck className="w-24 h-24 text-blue-400 mb-4" />
      <h1 className="text-5xl font-bold mb-2">RenalGuard</h1>
      <p className="text-2xl font-light mb-4">Snap. Scan. Stay Safe.</p>
      <p className="text-lg text-gray-400 max-w-md mb-8">
        Get instant, easy-to-understand nutritional insights for your meals.
      </p>

      <div className="flex flex-col space-y-4 w-full max-w-xs">
        <button
          onClick={handleStartChecking}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition-transform transform hover:scale-105"
        >
          Start Checking
        </button>
        <button
          onClick={handleGoToDashboard}
          className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg text-lg transition-transform transform hover:scale-105 flex items-center justify-center"
        >
          <BarChart2 className="w-5 h-5 mr-2" />
          Go to My Dashboard
        </button>
      </div>

      <div className="absolute bottom-4 text-xs text-gray-500">
        <p>Privacy | Terms of Service</p>
        <p>&copy; {new Date().getFullYear()} RenalGuard. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Landing;
