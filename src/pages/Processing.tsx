import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {ShieldCheck} from 'lucide-react';
import LoadingImg from '@/assets/loading-image.png?as=src';
import clsx from 'clsx';


const Processing: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // TODO: Replace this with actual API call to your backend
    // This simulates waiting for the analysis to complete.
    const timer = setTimeout(() => {
      // Navigate to the Meal results page after processing
      navigate('/meal');
    }, 40000); // 4-second delay for demonstration

    // Cleanup the timer if the component unmounts
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4 text-center'>
      {/* Animated Icon Placeholder */}
      <div className='relative mb-8'>
        <img
          src={LoadingImg}
          alt='Loading'
          className={clsx(
            'w-[15em] h-auto',
            'text-blue-400',
            'animate-[spin_8s_linear_infinite,pulse_2s_ease-in-out_infinite]'
          )}
        />
      </div>

      <h1 className='text-2xl font-bold mb-2'>Getting your meal's</h1>
      <h2 className='text-2xl font-bold mb-8'>nutritional breakdown...</h2>

      {/* Optional cancel button */}
      <button
        onClick={() => navigate(-1)} // Go back to the previous page (Scan)
        className='mt-8 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full'
      >
        Cancel
      </button>
    </div>
  );
};

export default Processing;
