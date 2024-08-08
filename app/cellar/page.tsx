import CellarDashboard from '../../components/cellar/cellar-dashboard';

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
              className={`${shimmer} relative h-[800px] w-4xl overflow-hidden rounded-md border bg-slate-200 dark:bg-slate-500 shadow-sm mx-auto my-6 flex max-w-5xl flex-col md:max-w-4xl lg:rounded-md lg:border lg:shadow-2xl`}
            ></div>
          }
        >
          <CellarDashboard cellars={cellars} />
        </Suspense>
      </Suspense>
    </>
  );
}
