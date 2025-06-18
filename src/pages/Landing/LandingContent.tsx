import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart2 } from 'lucide-react';
import logo from '@/assets/renalguard-transparent.png';
import meal from '@/assets/meal-image.png?as=src';
import nutrition from '@/assets/nutrition-circles.png?as=src';
import lightbulb from '@/assets/lightbulb-image.png?as=src';

const LandingContent: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center min-h-screen bg-white text-white text-center px-[1.25em] mt-[3.5em]">
      <p className="text-2xl font-semibold mb-4 text-gray-900">Snap. Scan. Stay Safe.</p>
      <p className="text-lg font-regular leading-tight
 text-gray-700 max-w-md">
        Snap your food. <br/>
        Get instant kidney-friendly insights.
      </p>
      <img
        src={logo}
        alt="RenalGuard logo"
        className="w-[11.25em] h-[11.25em] mt-[2em]"
      />
      <div className="flex flex-col space-y-[0.5em] w-full max-w-xs mt-[2em]">
        <button
          onClick={() => navigate('/scan')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-lg transition-transform hover:scale-101"
        >
          Start Checking
        </button>
        <button
          onClick={() => navigate('/dashboard')}
          className="ring-[0.0625em] ring-inset ring-blue-800 border-blue-800 text-blue-800 font-bold rounded-lg text-lg transition-transform hover:scale-101 flex items-center justify-center"
        >
          <BarChart2 className="w-5 h-5 mr-2" />
          Go to My Dashboard
        </button>
      </div>

      <p className="text-2xl font-semibold mb-4 text-gray-900 mt-[3.5em] leading-tight">
        Your camera is now <br/>
        a renal nutritionist.
      </p>
      <p className="text-lg font-regular text-gray-700 max-w-md">
        RenalGuard scans your food <br/>
        to reveal key nutrients like <br/>
        sodium, potassium, and <br/>
        phosphorus.
      </p>
      <img
        src={meal}
        alt="RenalGuard logo"
        className="w-[11.25em] h-[11.25em] mt-[2em]"
      />

      <p className="text-2xl font-semibold mb-4 text-gray-900 mt-[3.5em] leading-tight">
        Your daily <br/>
        renal dashboard.
      </p>
      <p className="text-lg font-regular text-gray-700 max-w-md">
        Automatically updates visual <br/>
        insights into phosphorus, <br/>
        potassium, sodium, water, <br/>
        and protein.
      </p>
      <img
        src={nutrition}
        alt="RenalGuard logo"
        className="w-[11.25em] h-[11.25em] mt-[2em]"
      />

      <p className="text-2xl font-semibold mb-4 text-gray-900 mt-[3.5em] leading-tight">
        Small tips, <br/>
        big changes.
      </p>
      <p className="text-lg font-regular text-gray-700 max-w-md">
        Real science. Real food. <br/>
        Real impact—one day at a time.
      </p>
      <img
        src={lightbulb}
        alt="RenalGuard logo"
        className="w-[11.25em] h-[11.25em] mt-[2em]"
      />

    </div>
  );
};

export default LandingContent;