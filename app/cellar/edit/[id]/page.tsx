'use client';

import { useParams } from 'next/navigation';

import { BottleProvider } from '@/app/context/BottleContext';
import UpdateBottleForm from '@/components/bottle/displayBottle/update-bottle';

export default function UpdateBottle() {
  const params = useParams<{ id: string }>();
  const bottleId = params.id;

  return (
    <section className='mt-6 sm:max-w-4xl sm:rounded-md lg:border lg:shadow-2xl sm:mx-auto'>
      <h1 className="pt-4 text-center text-2xl font-bold">
        Editer une bouteille
      </h1>
      <div className="flex justify-center pb-14">
        <div className="w-4/5">
          <BottleProvider>
            <UpdateBottleForm bottleId={bottleId} />
          </BottleProvider>
        </div>
      </div>
    </section>
  );
}
