import React from 'react';
import { NavLink } from 'react-router-dom';
import { Camera, LayoutGrid, Utensils } from 'lucide-react';
import clsx from 'clsx';

/**
 * Floating bottom navigation bar with three actions:
 *  - Scan  (Camera)   → /scan
 *  - Home  (Grid)     → /
 *  - Meals (Utensils) → /meals
 */
const BottomNavigationBar: React.FC = () => {
  const baseItem =
    'relative flex h-10 w-10 items-center justify-center rounded-full transition-colors';

  const activePill =
    'before:absolute before:inset-0 before:-z-10 before:rounded-full ' +
    'before:bg-blue-600 before:animate-fade-in';

  return (
    <nav
      className={clsx(
        'fixed bottom-30 inset-x-0 mx-auto w-fit z-50',
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
              clsx(
                baseItem,
                isActive && activePill,
                'text-gray-300 hover:text-white'
              )
            }
            aria-label="Scan meal"
          >
            <Camera className="h-6 w-6" />
          </NavLink>
        </li>

        {/* Home / Dashboard */}
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              clsx(
                baseItem,
                isActive && activePill,
                'text-gray-300 hover:text-white'
              )
            }
            aria-label="Dashboard"
          >
            <LayoutGrid className="h-6 w-6" />
          </NavLink>
        </li>

        {/* Meals */}
        <li>
          <NavLink
            to="/meals"
            className={({ isActive }) =>
              clsx(
                baseItem,
                isActive && activePill,
                'text-gray-300 hover:text-white'
              )
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