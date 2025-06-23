import React from 'react';
import { NavLink } from 'react-router-dom';
import { Camera, LayoutGrid, Utensils } from 'lucide-react';
import clsx from 'clsx';

const BottomNavigationBar: React.FC = () => {
  const baseItem =
    'relative flex h-10 w-10 items-center justify-center rounded-full transition-colors';

  const activePill =
    'before:absolute before:inset-0 before:-z-10 before:rounded-full ' +
    'before:bg-blue-300 before:animate-fade-in';

  return (
    <nav
      className={clsx(
        'fixed bottom-10 inset-x-0 mx-auto w-fit z-50',
        'rounded-full bg-gray-900 px-5 py-3 shadow-lg'
      )}
      aria-label="Primary"
    >
      <ul className="flex items-center gap-6">
        {/* Scan */}
        <li>
          <NavLink
            to="/scan"
            className={({ isActive }) =>
              clsx(baseItem, isActive && activePill, 'text-gray-300 hover:text-white')
            }
            aria-label="Scan meal"
          >
            <Camera className="h-6 w-6" />
          </NavLink>
        </li>

        {/* Home / Dashboard — highlight only on EXACT "/" */}
        <li>
          <NavLink
            to="/dashboard"
            end                    /* ← key change */
            className={({ isActive }) =>
              clsx(baseItem, isActive && activePill, 'text-gray-300 hover:text-white')
            }
            aria-label="Dashboard"
          >
            <LayoutGrid className="h-6 w-6" />
          </NavLink>
        </li>

        {/* Meal */}
        <li>
          <NavLink
            to="/meal"
            className={({ isActive }) =>
              clsx(baseItem, isActive && activePill, 'text-gray-300 hover:text-white')
            }
            aria-label="Meals list"
          >
            <Utensils className="h-6 w-6" />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default BottomNavigationBar;