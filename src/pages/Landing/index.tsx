import React, { useMemo } from 'react';
import PageWrapper from '@/components/layouts/PageWrapper';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import LandingContent from '@/pages/Landing/LandingContent.tsx';
import type { GnbProps } from '@/components/layouts/GlobalNavigationBar';

const LandingPage: React.FC = () => {
  const { authentication } = useSelector((state: RootState) => state.user);

  /** Decide what the Global Navigation Bar should show */
  const gnbProps = useMemo<GnbProps>(
    () => ({ pageKind: 'landing' }),
    [authentication.isLoggedIn]
  );

  return (
    <PageWrapper
      gnbProps={gnbProps}
      extraComponents={{ hasSignUpBanner: false }}
    >
      <LandingContent />          {/* purely visual; keeps your Tailwind styles */}
    </PageWrapper>
  );
};

export default LandingPage;