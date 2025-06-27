import React, {useMemo, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import MealImg from '@/assets/meal-photo.png?as=src';
import PageWrapper from '@/components/layouts/PageWrapper';
import type {GnbProps} from '@/components/layouts/GlobalNavigationBar';
import clsx from 'clsx';
import { useAuth } from '@/authprovider/AuthContext.tsx';


const mockMealData = {
  id: 1,
  name: 'Chicken and Quinoa Bowl',
  time: '12:30 PM',
  imageUrl: 'https://placehold.co/600x400/1a202c/ffffff?text=Meal+Image',
  nutrients: [
    { name: 'Calories', value: '450', unit: 'kcal', status: 'safe' },
    { name: 'Sodium', value: '250', unit: 'mg', status: 'safe' },
    { name: 'Potassium', value: '300', unit: 'mg', status: 'safe' },
    { name: 'Phosphorus', value: '200', unit: 'mg', status: 'warning' },
    { name: 'Water', value: '1200', unit: 'ml', status: 'safe' },
    { name: 'Protein', value: '35', unit: 'g', status: 'safe' },
  ]
};

const Meal: React.FC = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!loading && !user) {
      navigate('/signin');
    }
  }, [loading, user, navigate]);
  // const { mealId } = useParams(); // Gets the ID from the URL, e.g., /meal/1
  const gnbProps = useMemo<GnbProps>(() => ({pageKind: 'nested'}), []);

  // In a real app, you would have a useEffect hook here to fetch meal data
  // using the mealId. For now, we use mock data.
  // useEffect(() => {
  //   fetchMealData(mealId);
  // }, [mealId]);

  return (
    <PageWrapper gnbProps={gnbProps} extraComponents={{hasFooter: false, hasBottomNavigation: true}}>
      <div className='p-4 bg-gray-100 text-white min-h-screen'>
        <main className='mt-[1.25em] mb-6 rounded-lg bg-gray-200 p-4'>
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
            <div>
              <p className='font-semibold text-gray-950'>{mockMealData.name}</p>
              <p className='text-sm text-gray-400'>{mockMealData.time}</p>
            </div>
          </div>
          {/* ── Estimated Nutritional Content ───────────────────────────── */}
          <div className="mt-[0.625em] rounded-lg bg-white p-4">
            <p className="mb-2 font-semibold text-gray-950">
              Estimated Nutritional Content
            </p>

            <div className="flex flex-wrap gap-2">
              {mockMealData.nutrients.map(({ name, value, unit }) => {
                if (name === 'Calories')
                  return (
                    <div
                      key={name}
                      className="flex items-center rounded-full border-2 border-blue-950 px-3 py-1
                       text-sm font-semibold text-blue-950"
                    >
                      {value}&nbsp;{unit}
                    </div>
                  );

                const colors: Record<
                  string,
                  { symbol: string; bg: string; text: string }
                > = {
                  sodium:     { symbol: 'Na', bg: 'bg-gray-200', text: 'text-gray-700' },
                  potassium:  { symbol: 'K', bg: 'bg-[#FEC77B]', text: 'text-[#FD6428]' },
                  phosphorus: { symbol: 'PO\u2084', bg: 'bg-[#C8A6F1]', text: 'text-[#2F12A4]' },
                  water:      { symbol: 'H\u2082O', bg: 'bg-[#C4DDFF]', text: 'text-[#2875DA]' },
                  protein:    { symbol: 'Protein', bg: 'bg-[#E39F96]', text: 'text-[#7E352C]' },
                };

                const key = name.toLowerCase() as keyof typeof colors;
                const { symbol, bg, text } = colors[key];

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
                      <span className="text-[1em] font-medium">{unit}</span>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </PageWrapper>
  );
};

export default Meal;
