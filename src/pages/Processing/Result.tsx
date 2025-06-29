import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import clsx from 'clsx';
import PageWrapper from '@/components/layouts/PageWrapper';
import MealImg from '@/assets/meal-photo.png?as=src';


const mockMealData = {
  id: 1,
  name: 'Chicken and Quinoa Bowl',
  time: '12:30 PM',
  imageUrl: 'https://placehold.co/600x400/1a202c/ffffff?text=Meal+Image',
  nutrients: [
    {name: 'Calories', value: '450', unit: 'kcal', status: 'safe'},
    {name: 'Sodium', value: '250', unit: 'mg', status: 'safe'},
    {name: 'Potassium', value: '300', unit: 'mg', status: 'safe'},
    {name: 'Phosphorus', value: '200', unit: 'mg', status: 'warning'},
    {name: 'Water', value: '1200', unit: 'ml', status: 'safe'},
    {name: 'Protein', value: '35', unit: 'g', status: 'safe'}
  ]
};

const Result: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      // Navigate to the Dashboard page after processing
      navigate('/dashboard');
    }, 3000); // 3-second delay for demonstration

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <PageWrapper extraComponents={{hasFooter: false, hasBottomNavigation: false}}>
      <div
        className={clsx(
          'flex flex-col flex-1 w-full min-h-[calc(100vh-256px)] items-center justify-start mt-[10em] px-4'
        )}
      >
        <span className='mb-2 text-[1.5em] text-gray-900 font-semibold font-bold mb-[4em]'>We’ve added <br />
            this meal’s nutrition <br />
            to your log <br />
            successfully.
        </span>

        <div className='flex flex-col items-start text-center text-white bg-gray-100 rounded-[1em] p-[1em]'>
          <div
            className={clsx(
              'flex gap-2 items-center'
            )}
          >
            <img
              src={MealImg}
              alt='Actual meal'
              className={clsx(
                'w-[2.25em] h-[2.25em]'
              )}
            />
            <div className={clsx(
              'flex flex-col items-start justify-center'
            )}>
              <p className='font-semibold text-gray-950'>{mockMealData.name}</p>
              <p className='text-sm text-gray-400'>{mockMealData.time}</p>
            </div>
          </div>
          {/* ── Estimated Nutritional Content ───────────────────────────── */}
          <div className='mt-[0.625em] rounded-lg bg-white p-4'>
            <p className='mb-2 font-semibold text-gray-950'>
              Estimated Nutritional Content
            </p>

            <div className='flex flex-wrap gap-2'>
              {mockMealData.nutrients.map(({name, value, unit}) => {
                if (name === 'Calories')
                  return (
                    <div
                      key={name}
                      className='flex items-center rounded-full border-2 border-blue-950 px-3 py-1
                       text-sm font-semibold text-blue-950'
                    >
                      {value}&nbsp;{unit}
                    </div>
                  );

                const colors: Record<
                  string,
                  { symbol: string; bg: string; text: string }
                > = {
                  sodium: {symbol: 'Na', bg: 'bg-gray-200', text: 'text-gray-700'},
                  potassium: {symbol: 'K', bg: 'bg-[#FEC77B]', text: 'text-[#FD6428]'},
                  phosphorus: {symbol: 'PO\u2084', bg: 'bg-[#C8A6F1]', text: 'text-[#2F12A4]'},
                  water: {symbol: 'H\u2082O', bg: 'bg-[#C4DDFF]', text: 'text-[#2875DA]'},
                  protein: {symbol: 'Protein', bg: 'bg-[#E39F96]', text: 'text-[#7E352C]'}
                };

                const key = name.toLowerCase() as keyof typeof colors;
                const {symbol, bg, text} = colors[key];

                return (
                  <div
                    key={name}
                    className={clsx(
                      'flex items-center gap-1 rounded-full px-3 py-1 text-sm font-semibold',
                      bg,
                      'text-white'
                    )}
                  >
                    <span className={text}>{symbol}</span>
                    <span className={text}>
                      {value}
                      <span className='text-[1em] font-medium'>{unit}</span>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </PageWrapper>
  );
};

export default Result;
