import React, {useMemo} from 'react';
import MealImg from '@/assets/meal-photo.png?as=src';
import PageWrapper from '@/components/layouts/PageWrapper';
import type {GnbProps} from '@/components/layouts/GlobalNavigationBar';
import {useSelector} from 'react-redux';
import type {RootState} from '@/store';
import clsx from 'clsx';


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

const statusColors = {
  safe: 'bg-green-500',
  warning: 'bg-yellow-500',
  danger: 'bg-red-500'
};

const Meal: React.FC = () => {
  // const { mealId } = useParams(); // Gets the ID from the URL, e.g., /meal/1
  const auth = useSelector((state: RootState) => state.auth);
  const gnbProps = useMemo<GnbProps>(() => ({pageKind: 'nested'}), [auth.user]);

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
          <div className='space-y-3 mt-[0.625em]'>
            {mockMealData.nutrients.map(nutrient => (
              <div key={nutrient.name} className='bg-gray-800 rounded-lg p-4 flex items-center'>
                <div className={`w-3 h-3 rounded-full mr-4 ${statusColors[nutrient.status as keyof typeof statusColors]}`}></div>
                <p className='flex-grow font-semibold'>{nutrient.name}</p>
                <p className='text-lg font-bold'>{nutrient.value}
                  <span className='text-sm text-gray-400'>{nutrient.unit}</span></p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </PageWrapper>
  );
};

export default Meal;
