'use client';

import { BoxChoosingTheme } from '@/components/boxChoosingTheme';

export default function PagePreference() {
  return (
    <>
      <div className="mx-auto pt-8 md:w-4/6 lg:w-3/5">
        <p className="text-center">
          Choisissez un thème clair ou sombre parmi ces choix.
        </p>
        <hr className="mx-auto my-4 w-5/6 border-neutral-300 md:w-4/6 lg:w-3/5" />
        <BoxChoosingTheme />
      </div>
    </>
  );
}
