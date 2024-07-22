import CellarDashboard from '../../components/cellar/CellarDashboard';

import { getCellars } from '../lib/cellar/cellar.get';
import { Suspense } from 'react';
import { Cellar } from '@/types/cellar.type';

export default async function PageCellar() {
  const cellars: Cellar[] = await getCellars();

  const shimmer =
    'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Suspense
          fallback={
            <div
              className={`${shimmer} relative h-9 w-[220px] overflow-hidden rounded-md border bg-gray-100 shadow-sm`}
            ></div>
          }
        >
          <CellarDashboard cellars={cellars} />
        </Suspense>
      </Suspense>
    </>
  );
}
