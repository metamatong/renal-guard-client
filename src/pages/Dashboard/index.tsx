import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Utensils, Lightbulb, User } from 'lucide-react';
import { useSelector } from 'react-redux';

import PageWrapper from '@/components/layouts/PageWrapper';
import type { RootState } from '@/store';
import type { GnbProps } from '@/components/layouts/GlobalNavigationBar';

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
  dailyTip:
    'Drink, rinse, repeat. Staying hydrated is essential for dialysis. This simple act can wash away toxins, ' +
    'prevent cramping, and help your body maintain a stable temperature. Aim for 8 glasses to give yourself a boost.',
  reference: {
    sodium: 2000,
    potassium: 2000,
    phosphorus: 1000,
    protein: 70 // in grams
  }
};

const toPercent = (val: number, ref: number) =>
  `${Math.min(100, (val / ref) * 100)}%`;

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  /* ---------- GNB props (landing style) ---------- */
  const auth = useSelector((state: RootState) => state.auth);
  const gnbProps = useMemo<GnbProps>(() => ({ pageKind: 'logged-in' }), [auth.user]);

  return (
    <PageWrapper gnbProps={gnbProps} extraComponents={{ hasFooter: true, hasBottomNavigation: false }}>
      <div className="min-h-[calc(100vh-256px)] w-full bg-gray-100 text-gray-900">
        <main className="p-4">
          {/* Nutrient Summary */}
          <section className="mb-6 rounded-lg bg-gray-200 p-4">
            <div className="grid grid-cols-4 gap-4 text-center">
              {/* Sodium */}
              <div className="flex flex-col items-center">
                {/* bar track */}
                <div className="relative h-32 w-6 rounded overflow-hidden">
                  {/* filled part */}
                  <div
                    className="absolute bottom-0 left-0 w-full bg-blue-500 transition-all"
                    style={{ height: toPercent(mockUserData.nutrients.sodium,
                        mockUserData.reference.sodium) }}
                  />
                </div>
                <p className="mt-2 text-2xl font-bold">{mockUserData.nutrients.sodium}</p>
                <p className="text-xs text-gray-400">Sodium&nbsp;(mg)</p>
              </div>

              {/* Potassium */}
              <div className="flex flex-col items-center">
                <div className="relative h-32 w-6 rounded overflow-hidden">
                  <div
                    className="absolute bottom-0 left-0 w-full bg-green-500 transition-all"
                    style={{ height: toPercent(mockUserData.nutrients.potassium,
                        mockUserData.reference.potassium) }}
                  />
                </div>
                <p className="mt-2 text-2xl font-bold">{mockUserData.nutrients.potassium}</p>
                <p className="text-xs text-gray-400">Potassium&nbsp;(mg)</p>
              </div>

              {/* Phosphorus */}
              <div className="flex flex-col items-center">
                <div className="relative h-32 w-6 rounded overflow-hidden">
                  <div
                    className="absolute bottom-0 left-0 w-full bg-purple-500 transition-all"
                    style={{ height: toPercent(mockUserData.nutrients.phosphorus,
                        mockUserData.reference.phosphorus) }}
                  />
                </div>
                <p className="mt-2 text-2xl font-bold">{mockUserData.nutrients.phosphorus}</p>
                <p className="text-xs text-gray-400">Phosphorus&nbsp;(mg)</p>
              </div>

              {/* Protein */}
              <div className="flex flex-col items-center">
                <div className="relative h-32 w-6 rounded overflow-hidden">
                  <div
                    className="absolute bottom-0 left-0 w-full bg-yellow-400 transition-all"
                    style={{ height: toPercent(mockUserData.nutrients.protein,
                        mockUserData.reference.protein) }}
                  />
                </div>
                <p className="mt-2 text-2xl font-bold">{mockUserData.nutrients.protein}</p>
                <p className="text-xs text-gray-400">Protein&nbsp;(g)</p>
              </div>
            </div>
            <div className="my-4 flex items-center justify-center">
              <p className="text-lg font-bold">{mockUserData.calories} kcal</p>
            </div>
          </section>

          {/* Today's Food Check-in */}
          <section className="mb-6">
            <h2 className="mb-2 text-lg font-bold">Today&apos;s Food Check-in</h2>
            <div className="space-y-2">
              {mockUserData.meals.map((meal) => (
                <div
                  key={meal.id}
                  onClick={() => navigate(`/meal/${meal.id}`)}
                  className="flex cursor-pointer items-center justify-between rounded-lg bg-gray-200 p-4 hover:bg-gray-700"
                >
                  <div>
                    <p className="font-semibold">{meal.name}</p>
                    <p className="text-sm text-gray-400">{meal.time}</p>
                  </div>
                  <Utensils className="h-5 w-5 text-gray-500" />
                </div>
              ))}
            </div>
          </section>

          {/* Daily Renal Tips */}
          <section>
            <h2 className="mb-2 flex items-center text-lg font-bold">
              <Lightbulb className="mr-2 h-5 w-5 text-yellow-400" /> Daily Renal Tips
            </h2>
            <div className="rounded-lg bg-gray-200 p-4">
              <p className="text-gray-900">{mockUserData.dailyTip}</p>
            </div>
          </section>
        </main>
      </div>
    </PageWrapper>
  );
};

export default Dashboard;
