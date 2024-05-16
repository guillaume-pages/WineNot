import SelectCellar from '../ui/cellar/select-cellar';

import PopoverAddCellar from '../ui/cellar/popover-add-cellar';
import { getCellars } from '../lib/cellar/cellar.get';
import { Suspense } from 'react';
import { Cellar } from '@/types/cellar.type';


export default async function PageCellar() {
  const cellars: Cellar[] = await getCellars();
  console.log(cellars);

  
  const shimmer =
    'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <section className="mx-auto flex max-w-7xl flex-col rounded-md border">
          <div className="flex space-x-4 border-b px-4 py-2">
            <Suspense
              fallback={
                <div
                  className={`${shimmer} w-[220px] h-9 border relative overflow-hidden rounded-md bg-gray-100 shadow-sm`}
                >
                </div>
              }
            >
              <SelectCellar cellars={cellars}/>
            </Suspense>
            <PopoverAddCellar />
          </div>
        </section>
      </Suspense>
    </>
  );
}
