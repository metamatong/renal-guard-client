import {useMemo} from 'react';
import {useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import clsx from 'clsx';
import {ArrowLeft as ArrowBack, BellOff as NotificationOffIcon} from 'lucide-react';

import LogoImg from '@/assets/logo-renalguard.png?as=src';
import type {RootState} from '@/store';


export type PageKind = 'logged-in' | 'landing' | 'nested';

export type GnbProps = {
  pageKind: PageKind;
  prevAction?: () => void;
  rightIconAction?: () => void;
};

const GlobalNavigationBar = ({ pageKind, prevAction, rightIconAction, }: GnbProps) => {
  const { user } = useSelector((s: RootState) => s.auth);
  const navigate = useNavigate();

  /* ---------- helpers ---------- */
  const goBack = () => (prevAction ? prevAction() : navigate(-1));

  /* ---------- LEFT SLOT ---------- */
  const leftNode = useMemo(() => {
    switch (pageKind) {
      case 'landing':
        return (
          <img
            src={LogoImg}
            alt="RenalGuard logo"
            className="w-[112px] h-auto"
          />
        );

      case 'logged-in':
        return (
          <header className="flex items-center justify-between p-4">
            <div>
              <p className="text-[1em] font-semibold text-gray-400">Welcome back,</p>
              <h1 className="text-[1.5em] text-blue-400 font-bold">Kyle</h1>
            </div>
          </header>
        );

      case 'nested':
        return (
          <ArrowBack
            className="h-7 w-7 cursor-pointer"
            onClick={goBack}
            role="button"
          />
        );
    }
  }, [pageKind, user?.name]);

  /* ---------- RIGHT SLOT ---------- */
  const rightNode = useMemo(() => {
    if (pageKind === 'nested' && user && user.name)
      return (
        <button
          // onClick={rightIconAction}
          aria-label="notifications"
          className={clsx(
            'flex items-center justify-center',
            rightIconAction && 'cursor-pointer'
          )}
        >
          <NotificationOffIcon className="h-6 w-6" />
        </button>
      );

    return null;
  }, [pageKind, rightIconAction]);

  /* ---------- render ---------- */
  return (
    <header
      className={clsx(
        'flex w-full items-center justify-between',
        pageKind === 'logged-in' ? 'h-[5em] bg-gray-100' : 'h-14 px-[1em]'
      )}
    >
      {/* ← left slot */}
      <div className="flex min-w-[28px] items-center">{leftNode}</div>

      {/* → right slot */}
      <div className="flex min-w-[28px] items-center justify-end">{rightNode}</div>
    </header>
  );
};

export default GlobalNavigationBar;