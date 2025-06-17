import React, { useMemo } from 'react';
import PageWrapper from '@/components/layouts/PageWrapper';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import LandingContent from '@/pages/Landing/LandingContent.tsx';
import type { GnbProps } from '@/components/layouts/GlobalNavigationBar';

const LandingPage: React.FC = () => {
  const auth = useSelector((state: RootState) => state.auth);

  /** Decide what the Global Navigation Bar should show */
  const gnbProps = useMemo<GnbProps>(
    () => ({ pageKind: 'landing' }),
    [auth.user]
  );

  return (
    <PageWrapper
      gnbProps={gnbProps}
      extraComponents={{ hasFooter: true, hasBottomNavigation: false }}
    >
      <LandingContent />
    </PageWrapper>
  );
};

export default LandingPage;