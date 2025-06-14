import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';

import { ReactComponent as NotificationOffIcon } from '@/icons/notification-badge-off.svg';
import { ReactComponent as ArrowBack } from '@/icons/arrow-back.svg';
import LogoImg from '@/assets/logo-renalguard.png?w=112;webp';
import type {RootState} from 'src/store';

export type PageKind = 'logged-in' | 'landing' | 'nested';

export type GnbProps = {
  pageKind: PageKind;
  prevAction?: () => void;
  rightIconAction?: () => void;
};

const Index = ({ pageKind, prevAction, rightIconAction, }: GnbProps) => {
  const { user } = useSelector((s: RootState) => s.auth);
  const dispatch = useDispatch();
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
            className="h-7 w-auto"
          />
        );

      case 'logged-in':
        return (
          <span className="font-semibold text-sm text-gray-900">
            Welcome&nbsp;back,&nbsp;{user?.name ?? 'Friend'}
          </span>
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
    <header className="flex h-14 w-full items-center justify-between px-5">
      {/* ← left slot */}
      <div className="flex min-w-[28px] items-center">{leftNode}</div>

      {/* → right slot */}
      <div className="flex min-w-[28px] items-center justify-end">{rightNode}</div>
    </header>
  );
};

export default Index;