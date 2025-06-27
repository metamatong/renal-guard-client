import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import PageWrapper from '@/components/layouts/PageWrapper';
import type { GnbProps } from '@/components/layouts/GlobalNavigationBar';

const Confirm: React.FC = () => {
  const navigate = useNavigate();
  const gnbProps = useMemo<GnbProps>(() => ({ pageKind: 'landing' }), []);

  return (
    <PageWrapper
      gnbProps={gnbProps}
      extraComponents={{ hasFooter: true, hasBottomNavigation: false }}
    >
      <div
        className={clsx(
          'flex flex-1 flex-col items-center justify-start pt-[9em]',
          'bg-white px-[3.75em] min-h-[calc(100vh-256px)]'
        )}
      >
        <span className="mb-8 text-[1.5em] font-semibold text-center">
          Check your inbox,<br />
          verify your email,<br />
          then log in.
        </span>

        <button
          onClick={() => navigate('/signin')}
          className={clsx(
            'mt-[2em] w-full w-[12.75em] rounded-lg bg-blue-50 py-2 transition duration-200',
            'hover:bg-blue-300'
          )}
        >
          <span className="block text-center text-[1em] font-bold text-blue-900 hover:text-white">
            Back to Log In
          </span>
        </button>
      </div>
    </PageWrapper>
  );
};

export default Confirm;
