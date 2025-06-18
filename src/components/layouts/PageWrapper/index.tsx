import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';
import GlobalNavigationBar from '@/components/layouts/GlobalNavigationBar';
import type { GnbProps } from '@/components/layouts/GlobalNavigationBar';

type Props = {
  children: ReactNode;
  gnbProps?: GnbProps;
  extraComponents?: {
    hasFooter?: boolean;
    hasBottomNavigation?: boolean;
  };
};

const PageWrapper = ({ children, gnbProps }: Props) => {
  const { pathname } = useLocation();

  /* --------------------------- scroll reset -------------------------- */
  useEffect(() => window.scrollTo(0, 0), [pathname]);

  /* ----------------------------- render ------------------------------ */
  return (
    <div className="bg-white min-h-[100dvh] h-full overflow-x-hidden">
      <div
        className={clsx(
          'bg-white flex min-h-screen flex-col',
          'mx-auto w-full',
          'lg:max-w-[420px]',
        )}
      >
        {/* ───────────────── Main layout pieces ───────────────── */}
        {gnbProps && <GlobalNavigationBar {...gnbProps} />}
        {children}
        {/*{extraComponents?.hasFooter && <Footer />}*/}
        {/*{extraComponents?.hasBottomNavigation && <BottomNavigation />}*/}
      </div>
    </div>
  );
};

export default PageWrapper;