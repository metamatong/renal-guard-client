import React, {useMemo} from 'react';
import PageWrapper from '@/components/layouts/PageWrapper';
import LandingContent from '@/pages/Landing/LandingContent.tsx';
import type {GnbProps} from '@/components/layouts/GlobalNavigationBar';


const LandingPage: React.FC = () => {

  /** Decide what the Global Navigation Bar should show */
  const gnbProps = useMemo<GnbProps>(
    () => ({ pageKind: 'landing' }),
    []
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