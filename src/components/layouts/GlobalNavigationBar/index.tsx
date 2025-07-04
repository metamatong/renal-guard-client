import { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/authprovider/AuthContext.tsx';
import clsx from 'clsx';
import {ArrowLeft as ArrowBack } from 'lucide-react';

import LogoImg from '@/assets/logo-renalguard.png?as=src';


export type PageKind = 'logged-in' | 'landing' | 'nested';

export type GnbProps = {
  pageKind: PageKind;
  prevAction?: () => void;
  rightIconAction?: () => void;
};

const GlobalNavigationBar = ({ pageKind, prevAction }: GnbProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  /* ---------- helpers ---------- */
  const goBack = () => (prevAction ? prevAction() : navigate(-1));

  /* ---------- LEFT SLOT ---------- */
  const leftNode = useMemo(() => {
    switch (pageKind) {
      case 'landing':
        return (
          <Link to="/" aria-label="Home">
            <img
              src={LogoImg}
              alt="RenalGuard logo"
              className="w-[112px] h-auto"
            />
          </Link>
        );

      case 'logged-in':
        return (
          <header className="flex items-center justify-between p-4">
            <div>
              <p className="text-[1em] font-semibold text-gray-400">Welcome back,</p>
              <h1 className="text-[1.5em] text-blue-400 font-bold">
                {user?.user_metadata?.name ?? user?.email}
              </h1>
            </div>
          </header>
        );

      case 'nested':
        return (
          <ArrowBack
            className="h-7 w-7 cursor-pointer mx-[1em] mt-[1.5em]"
            onClick={goBack}
            role="button"
          />
        );
    }
  }, [pageKind, user?.user_metadata?.name, user?.email]);

  /* ---------- render ---------- */
  return (
    <header
      className={clsx(
        'flex w-full items-center justify-between',
        {
          'h-[5em] bg-gray-100' : pageKind === 'logged-in',
          'h-14 bg-gray-100'      : pageKind === 'nested',
          'h-14 px-[1em]'      : pageKind === 'landing',
        }
        )}
    >
      {/* ← left slot */}
      <div className="flex min-w-[28px] items-center">{leftNode}</div>

    </header>
  );
};

export default GlobalNavigationBar;