import React, {useMemo} from 'react';
import {useNavigate} from 'react-router-dom';
import {Utensils, Lightbulb, User} from 'lucide-react';
import {useSelector} from 'react-redux';

import PageWrapper from '@/components/layouts/PageWrapper';
import type {RootState} from '@/store';
import type {GnbProps} from '@/components/layouts/GlobalNavigationBar';
import clsx from 'clsx';


const mockUserData = {
  name: 'Kyle Cheon',
  calories: 1253,
  nutrients: {
    sodium: 70,
    potassium: 48,
    phosphorus: 32,
    water: 700,
    protein: 40
  },
  meals: [
    {id: 1, name: 'Chicken and Quinoa Bowl', time: '12:30 PM'},
    {id: 2, name: 'Oatmeal with Berries', time: '8:00 AM'}
  ],
  dailyTip:
    'Drink, rinse, repeat. Staying hydrated is essential for dialysis. This simple act can wash away toxins, ' +
    'prevent cramping, and help your body maintain a stable temperature. Aim for 8 glasses to give yourself a boost.',
  reference: {
    sodium: 2000,
    potassium: 2000,
    phosphorus: 1000,
    water: 2000, // in ml
    protein: 70 // in grams
  }
};

const toPercent = (val: number, ref: number) =>
  `${Math.min(100, (val / ref) * 100)}%`;

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  /* ---------- GNB props (landing style) ---------- */
  const auth = useSelector((state: RootState) => state.auth);
  const gnbProps = useMemo<GnbProps>(() => ({pageKind: 'logged-in'}), [auth.user]);

  return (
    <PageWrapper gnbProps={gnbProps} extraComponents={{hasFooter: true, hasBottomNavigation: false}}>
      <div className='min-h-[calc(100vh-256px)] w-full bg-gray-100 text-gray-900'>
        <main className='p-4'>
          {/* ── Nutrient Summary ─────────────────────────────────────────────── */}
          <section className='mb-6 rounded-lg bg-gray-200 p-4'>
            <div className='flex justify-center gap-[2em] text-center'>
              {[
                {
                  key: 'sodium',
                  symbol: 'Na',
                  unit: 'mg',
                  barColor: 'bg-[#9CA3AF]',
                  symbolColor: 'text-[#E5E7EB]'
                },
                {
                  key: 'potassium',
                  symbol: 'K',
                  unit: 'mg',
                  barColor: 'bg-[#FEC77B]',
                  symbolColor: 'text-[#FD6428]'
                },
                {
                  key: 'phosphorus',
                  symbol: 'PO\u2084',
                  unit: 'mg',
                  barColor: 'bg-[#C8A6F1]',
                  symbolColor: 'text-[#2F12A4]'
                },
                {
                  key: 'water',
                  symbol: 'H\u2082O',
                  unit: 'ml',
                  barColor: 'bg-[#C4DDFF]',
                  symbolColor: 'text-[#2875DA]'
                },
                {
                  key: 'protein',
                  symbol: 'Pro',
                  unit: 'g',
                  barColor: 'bg-[#E39F96]',
                  symbolColor: 'text-[#7E352C]'
                }
              ].map(({key, symbol, unit, barColor, symbolColor}) => {
                const value =
                  mockUserData.nutrients[key as keyof typeof mockUserData.nutrients];
                const ref =
                  mockUserData.reference[key as keyof typeof mockUserData.reference];

                return (
                  <div key={key} className='flex w-[2.25em] flex-col items-center'>
                    {/* pill-shaped bar */}
                    <div className='relative h-32 w-9 overflow-hidden rounded-t-[1.5em] rounded-b-[0.5em] bg-gray-300'>
                      {/* fill */}
                      <div
                        className={clsx(
                          'absolute bottom-0 left-0 w-full transition-all',
                          'min-h-[4em]',
                          barColor
                        )}
                        style={{height: toPercent(value, ref)}}
                      >
                        {/* numeric value */}
                        <span className='absolute top-2 left-1/2 -translate-x-1/2 text-base font-bold text-gray-800'>
                          {value}
                        </span>
                      </div>
                      {/* symbol + unit, stacked */}
                      <div className='absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center leading-none'>
                        <span
                          className={clsx(
                            'text-sm font-semibold',
                            symbolColor
                          )}
                        >
                          {symbol}
                        </span>
                        <span className='text-[0.6rem] text-gray-900'>{unit}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* total cals */}
            <div className='my-4 flex items-center justify-center'>
              <p className='text-lg font-bold'>{mockUserData.calories} kcal</p>
            </div>
          </section>

          {/* Today's Food Check-in */}
          <section className='mb-6'>
            <h2 className='mb-2 text-lg font-bold'>Today&apos;s Food Check-in</h2>
            <div className='space-y-2'>
              {mockUserData.meals.map((meal) => (
                <div
                  key={meal.id}
                  onClick={() => navigate(`/meal/${meal.id}`)}
                  className='flex cursor-pointer items-center justify-between rounded-lg bg-gray-200 p-4 hover:bg-gray-700'
                >
                  <div>
                    <p className='font-semibold'>{meal.name}</p>
                    <p className='text-sm text-gray-400'>{meal.time}</p>
                  </div>
                  <Utensils className='h-5 w-5 text-gray-500' />
                </div>
              ))}
            </div>
          </section>

          {/* Daily Renal Tips */}
          <section>
            <h2 className='mb-2 flex items-center text-lg font-bold'>
              <Lightbulb className='mr-2 h-5 w-5 text-yellow-400' /> Daily Renal Tips
            </h2>
            <div className='rounded-lg bg-gray-200 p-4'>
              <p className='text-gray-900'>{mockUserData.dailyTip}</p>
            </div>
          </section>
        </main>
      </div>
    </PageWrapper>
  );
};

export default Dashboard;
