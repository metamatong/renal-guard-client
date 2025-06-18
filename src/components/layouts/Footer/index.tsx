import React from 'react';


const Footer: React.FC = () => {
  return (
    <div className="flex flex-col mt-[5em] bg-white text-center">
      <footer className="mt-auto py-4 text-xs text-gray-500">
        <p>Privacy&nbsp;|&nbsp;Terms&nbsp;|&nbsp;Cookie&nbsp;Preferences</p>
        <p>&copy; {new Date().getFullYear()} RenalGuard. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Footer;