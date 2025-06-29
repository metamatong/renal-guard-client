import React, {useMemo, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '@/store/hooks';
import {useAuth} from '@/authprovider/AuthContext.tsx';
import {fetchMealHistory} from '@/store/historySlice';

import PageWrapper from '@/components/layouts/PageWrapper';
import type {RootState} from '@/store';
import type {GnbProps} from '@/components/layouts/GlobalNavigationBar';
import clsx from 'clsx';
import ArrowImg from '@/assets/right-arrow-button.png?as=src';
import MealImg from '@/assets/meal-photo.png?as=src';
import {dailyRenalTips} from '@/assets/renalTips.tsx';


const reference = {
  sodium: 2000,
  potassium: 2000,
  phosphorus: 1000,
  water: 2000,
  protein: 70
};

const toPercent = (val: number, ref: number) =>
  `${Math.min(100, (val / ref) * 100)}%`;

const Dashboard: React.FC = () => {
  const {user, loading} = useAuth();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // redirect if unauthenticated
  useEffect(() => {
    if (!loading && !user) navigate('/signin');
  }, [loading, user, navigate]);

  const { title: dailyTipTitle, message: dailyTip } = useMemo(() => {
    const today = new Date();
    const index = today.getDate() % dailyRenalTips.length;
    return dailyRenalTips[index];
  }, []);

  const analysis = useAppSelector((state: RootState) => state.scan.result?.analysis);
  const meals = useAppSelector((state: RootState) => state.history.meals);
  const recentMeals = useMemo(
    () =>
      [...meals]
        .sort(
          (a, b) =>
            new Date(b.created_at).getTime() -
            new Date(a.created_at).getTime()
        )
        .slice(0, 5),
    [meals]
  );
  const gnbProps = useMemo<GnbProps>(() => ({pageKind: 'logged-in'}), [user]);

  // initial fetch of today's meals if not already loaded
  useEffect(() => {
    if (user && !loading && meals.length === 0) {
      dispatch(fetchMealHistory({uid: user.id}));
    }
  }, [user, loading, meals.length, dispatch]);

  const todayStr = useMemo(
    () =>
      new Intl.DateTimeFormat('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }).format(new Date()),
    []
  );

  const totals = useMemo(() => {
    return meals.reduce(
      (acc, m) => ({
        sodium: acc.sodium + (m.sodium ?? 0),
        potassium: acc.potassium + (m.potassium ?? 0),
        phosphorus: acc.phosphorus + (m.phosphorus ?? 0),
        water: acc.water + (m.water ?? 0),
        protein: acc.protein + 0, // protein not in API yet
        calories: acc.calories + (m.calories ?? 0)
      }),
      {sodium: 0, potassium: 0, phosphorus: 0, water: 0, protein: 0, calories: 0}
    );
  }, [meals]);

  return (
    <PageWrapper gnbProps={gnbProps} extraComponents={{hasFooter: true, hasBottomNavigation: true}}>
      <div className='min-h-[calc(100vh-256px)] w-full bg-gray-100 text-gray-900'>
        <main className='p-4'>
          {/* ── Nutrient Summary ─────────────────────────────────────────────── */}

          <section className='mb-6 rounded-lg bg-gray-200 p-4'>
            <div className='flex justify-center gap-[2em] text-center'>
              {[
                {key: 'sodium', symbol: 'Na', unit: 'mg', barColor: 'bg-gray-400', symbolColor: 'text-gray-700'},
                {key: 'potassium', symbol: 'K', unit: 'mg', barColor: 'bg-[#FEC77B]', symbolColor: 'text-[#FD6428]'},
                {
                  key: 'phosphorus',
                  symbol: 'PO\u2084',
                  unit: 'mg',
                  barColor: 'bg-[#C8A6F1]',
                  symbolColor: 'text-[#2F12A4]'
                },
                {key: 'water', symbol: 'H\u2082O', unit: 'ml', barColor: 'bg-[#C4DDFF]', symbolColor: 'text-[#2875DA]'},
                {key: 'protein', symbol: 'Pro', unit: 'g', barColor: 'bg-[#E39F96]', symbolColor: 'text-[#7E352C]'}
              ].map(({key, symbol, unit, barColor, symbolColor}) => {
                const value = totals[key as keyof typeof totals];
                const ref = reference[key as keyof typeof reference];

                return (
                  <div key={key} className='flex w-[2.5em] flex-col items-center'>
                    {/* pill-shaped bar */}
                    <div className='relative h-32 w-full overflow-hidden rounded-t-[1.5em] rounded-b-[0.5em] bg-gray-300'>
                      {/* fill */}
                      <div
                        className={clsx(
                          'absolute bottom-0 left-0 w-full transition-all',
                          'min-h-[2.5em]',
                          barColor
                        )}
                        style={{height: toPercent(value, ref)}}
                      >
                        {/* numeric value */}
                        <span className={clsx('absolute top-2 left-1/2 -translate-x-1/2 text-base font-bold', symbolColor)}>
                          {value}
                        </span>
                      </div>
                    </div>

                    {/* symbol + unit */}
                    <div className='mt-1 flex flex-col items-center leading-none'>
                      <span className={clsx('text-sm font-semibold', symbolColor)}>
                        {symbol}
                      </span>
                      <span className='text-[0.6rem] text-gray-400'>{unit}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* total cals */}
            <div className='mt-4 mb-1 flex flex-col items-center justify-center'>
              <p className='text-lg font-bold'>{totals.calories} kcal</p>
              <p className='text-sm text-gray-500'>{todayStr}</p>
            </div>
          </section>

          {/* Today's Food Check-in */}
          <section className='flex flex-col gap-[0.5em] mb-6 rounded-lg bg-gray-200 p-4'>
            <span className='mb-2 text-[1.25em] font-semibold'>Today&#39;s Food Check-in</span>
            <div className='space-y-2'>
              {recentMeals.map((meal: any) => (
                <Link
                  key={meal.id}
                  to={`/meal/${meal.id}`}
                  className='flex items-center justify-between
                   rounded-lg bg-gray-50 p-4
                   hover:bg-gray-700 focus:outline-none
                   focus:ring-2 focus:ring-blue-500'
                >
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
                      <p className='font-semibold'>{meal.dish_name ?? `Meal ${meal.id}`}</p>
                      <p className='text-sm text-gray-400'>
                        {new Date(meal.created_at).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}
                      </p>
                    </div>
                  </div>
                  <img
                    src={ArrowImg}
                    alt='Arrow Button'
                    className={clsx(
                      'w-[2.25em] h-auto'
                    )}
                  />
                </Link>
              ))}
            </div>
          </section>

          {/* Daily Renal Tips */}
          <section className='flex flex-col gap-[0.5em] mb-6'>
            <span className='mb-2 text-[1.25em] font-semibold'>
              Daily Renal Tips
            </span>
            <div className='rounded-lg bg-gray-200 p-4'>
              <p className='text-gray-950 text-[1em] font-semibold mb-1'>{dailyTipTitle}</p>
              <p className='text-gray-500'>{dailyTip}</p>
            </div>
          </section>

          {/* Analysis from last scan */}
          {analysis && (
            <section className='mb-6 rounded-lg bg-gray-200 p-4'>
              <span className='mb-2 text-[1.25em] font-semibold'>Analysis</span>
              <div className='whitespace-pre-wrap text-gray-700'>{analysis}</div>
            </section>
          )}
        </main>
      </div>
    </PageWrapper>
  );
};

export default Dashboard;
