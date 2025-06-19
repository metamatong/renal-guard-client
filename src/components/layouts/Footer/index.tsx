import React from 'react';
import LogoImg from '@/assets/logo-renalguard.png?as=src';


const Footer: React.FC = () => {
  return (
    <div className="flex flex-col mt-[5em] bg-white text-center">
      <footer className="flex flex-col items-center mt-auto py-4 text-xs text-gray-500">
        <p>Privacy&nbsp;|&nbsp;Terms&nbsp;|&nbsp;Cookie&nbsp;Preferences</p>
        <p>&copy; {new Date().getFullYear()} RenalGuard. All rights reserved.</p>
        <img
          src={LogoImg}
          alt="RenalGuard logo"
          className="w-[112px] h-auto mb-[1.5em] mt-[1em]"
        />
      </footer>
    </div>
  );
};

export default Footer;