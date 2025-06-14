import { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';
import GlobalNavigationBar, {GnbProps} from '@/components/layouts/GlobalNavigationBar';

type Props = {
  children: ReactNode;
  gnbProps?: GnbProps;
  extraComponents?: {
    hasSignUpBanner?: boolean;
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
    <div className="bg-gray-200 min-h-screen">                     {/* Wrapper */}
      <div
        className={clsx(
          'bg-white flex min-h-screen flex-col',
          'mx-auto w-full',
          'lg:max-w-[420px]'
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