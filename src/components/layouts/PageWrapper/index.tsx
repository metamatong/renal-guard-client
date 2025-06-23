import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';
import GlobalNavigationBar from '@/components/layouts/GlobalNavigationBar';
import type { GnbProps } from '@/components/layouts/GlobalNavigationBar';
import Footer from '@/components/layouts/Footer';
import BottomNavigationBar from '@/components/layouts/BottomNavigationBar';
import {createPortal} from 'react-dom';

type Props = {
  children: ReactNode;
  gnbProps?: GnbProps;
  extraComponents?: {
    hasFooter?: boolean;
    hasBottomNavigation?: boolean;
  };
};

const PageWrapper = ({ children, gnbProps, extraComponents }: Props) => {
  const { pathname } = useLocation();

  /* --------------------------- scroll reset -------------------------- */
  useEffect(() => window.scrollTo(0, 0), [pathname]);

  /* ----------------------------- render ------------------------------ */
  return (
    <div className={clsx(
      'min-[421px]:max-w-[420px]',
      'w-full',
      'mx-auto',
      'bg-white min-h-[100dvh] h-full overflow-x-hidden',
    )}>
      <div
        className={clsx(
          'bg-white flex min-h-screen flex-col',
          'w-full',
          'mx-auto',
        )}
      >
        {/* ───────────────── Main layout pieces ───────────────── */}
        {gnbProps && <GlobalNavigationBar {...gnbProps} />}
        {children}
        {extraComponents?.hasFooter && <Footer />}

        {/* floating bottom nav */}
        {extraComponents?.hasBottomNavigation && createPortal(<BottomNavigationBar /> as React.ReactNode, document.body)}
      </div>
    </div>
  );
};

export default PageWrapper;