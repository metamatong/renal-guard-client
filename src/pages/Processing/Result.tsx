import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAppSelector} from '@/store/hooks';
import clsx from 'clsx';
import PageWrapper from '@/components/layouts/PageWrapper';
import MealImg from '@/assets/meal-photo.png?as=src';

const Result: React.FC = () => {
  const navigate = useNavigate();
  const {result} = useAppSelector(state => state.scan);

  useEffect(() => {
    if (!result) {
      navigate('/scan');
    }
  }, [result, navigate]);

  useEffect(() => {
    if (result) {
      const timer = setTimeout(() => navigate('/dashboard'), 8000);
      return () => clearTimeout(timer);
    }
  }, [result, navigate]);

  // parse API response
  const imgUrl = result?.imgUrl || MealImg;
  const foods = result?.openAIResponse?.split('\n').filter(Boolean) || [];
  const nutrients = result?.analysisResponse
    ?.split('\n')
    .filter(Boolean)
    .map(line => {
      const [rawName, ...rest] = line.split(',');
      return {name: rawName.trim(), value: rest.join(',').trim()};
    }) || [];

  // color & symbol mapping for nutrients
  const colors: Record<string, {symbol: string; bg: string; text: string}> = {
    sodium: {symbol: 'Na', bg: 'bg-gray-200', text: 'text-gray-700'},
    potassium: {symbol: 'K', bg: 'bg-[#FEC77B]', text: 'text-[#FD6428]'},
    phosphorus: {symbol: 'PO\u2084', bg: 'bg-[#C8A6F1]', text: 'text-[#2F12A4]'},
    water: {symbol: 'H\u2082O', bg: 'bg-[#C4DDFF]', text: 'text-[#2875DA]'},
    protein: {symbol: 'Protein', bg: 'bg-[#E39F96]', text: 'text-[#7E352C]'},
    calories: {symbol: 'kcal', bg: 'border-blue-950', text: 'text-blue-950'}
  };

  return (
    <PageWrapper extraComponents={{hasFooter: false, hasBottomNavigation: false}}>
      <div className={clsx(
        'flex flex-col flex-1 w-full min-h-[calc(100vh-256px)] items-center justify-start mt-[2em] px-4'
      )}>
        <span className='mb-4 text-center text-[1.5em] text-gray-900 font-bold'>We’ve added <br /> this meal’s nutrition to <br /> your log successfully.</span>

        <span className='mb-4 text-center text-[1em] text-gray-600 font-semibold'>Redirecting to your dashboard <br /> in just a moment...</span>

        <div className='flex flex-col items-center text-center text-gray-900 bg-gray-100 rounded-[1em] p-6 space-y-4'>
          <img src={imgUrl} alt='Meal' className='w-full rounded-lg max-w-md mb-2' />

          {/* Detected foods */}
          {foods.length > 0 && (
            <div className='w-full max-w-md text-left'>
              <p className='mb-2 font-semibold'>Identified Foods</p>
              <ul className='list-disc list-inside space-y-1'>
                {foods.map(food => (
                  <li key={food} className='text-gray-800'>{food}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Nutritional breakdown */}
          {nutrients.length > 0 && (
            <div className='w-full max-w-md'>
              <p className='mb-2 font-semibold text-left'>Estimated Nutritional Content</p>
              <div className='flex flex-wrap gap-2'>
                {nutrients.map(({name, value}) => {
                  const key = name.toLowerCase();
                  const cfg = colors[key] || {symbol: name, bg: 'bg-gray-200', text: 'text-gray-700'};
                  const isCal = key === 'calories';
                  return (
                    <div
                      key={name}
                      className={clsx(
                        'flex items-center gap-1 rounded-full px-3 py-1 text-sm font-semibold',
                        isCal ? 'border-2 ' + cfg.bg : cfg.bg,
                        'text-white'
                      )}
                    >
                      <span className={cfg.text}>{cfg.symbol}</span>
                      <span className={cfg.text}>{value}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
};

export default Result;
