'use client';

import { useContext } from 'react';
import { ThemeContext } from '@/app/context/ThemeContext';

export default function ChoosingTheme() {
  const { changeTheme } = useContext(ThemeContext);

  const themeLight = [
    'light',
    'cupcake',
    'bumblebee',
    'emerald',
    'corporate',
    'retro',
    'cyberpunk',
    'valentine',
    'garden',
    'lofi',
    'pastel',
    'fantasy',
    'wireframe',
    'cmyk',
    'autumn',
    'acid',
    'lemonade',
    'winter',
    'nord',
  ];
  const themeDark = [
    'dark',
    'synthwave',
    'halloween',
    'forest',
    'aqua',
    'black',
    'luxury',
    'dracula',
    'business',
    'night',
    'coffee',
    'dim',
    'sunset',
  ];

  return (
    <>
      <div>Choisissez un thème clair ou sombre parmi ces choix</div>
      <div className="dropdown mb-72">
        <div tabIndex={0} role="button" className="btn m-1">
          Theme clair
          <svg
            width="12px"
            height="12px"
            className="inline-block h-2 w-2 fill-current opacity-60"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 2048 2048"
          >
            <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
          </svg>
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content bg-base-300 rounded-box z-[1] w-52 p-2 shadow-2xl"
        >
          {themeLight.map((themeName, index) => (
            <li key={index}>
              <input
                type="radio"
                name="theme-dropdown"
                className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                aria-label={themeName}
                value={themeName}
                onClick={() => changeTheme(themeName)}
              />
            </li>
          ))}
        </ul>
      </div>
      <div className="dropdown mb-72">
        <div tabIndex={0} role="button" className="btn m-1">
          Theme sombre
          <svg
            width="12px"
            height="12px"
            className="inline-block h-2 w-2 fill-current opacity-60"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 2048 2048"
          >
            <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
          </svg>
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content bg-base-300 rounded-box z-[1] w-52 p-2 shadow-2xl"
        >
          {themeDark.map((themeName, index) => (
            <li key={index}>
              <input
                type="radio"
                name="theme-dropdown"
                className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                aria-label={themeName}
                value={themeName}
                onClick={() => changeTheme(themeName)}
              />
            </li>
          ))}
        </ul>
      </div>

    </>
  );
}
