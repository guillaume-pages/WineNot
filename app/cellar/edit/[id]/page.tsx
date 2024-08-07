'use client';

import { useParams } from 'next/navigation';

import { BottleProvider } from '@/app/context/BottleContext';
import UpdateBottleForm from '@/components/bottle/displayBottle/update-bottle';

export default function UpdateBottle() {
  const params = useParams<{ id: string }>();
  const bottleId = params.id;

  return (
    <section className="mx-auto my-6 flex max-w-5xl flex-col md:max-w-2xl lg:max-w-4xl md:rounded-md md:border md:shadow-2xl">
      <h1 className="pt-4 text-center text-2xl font-bold">
        Editer une bouteille
      </h1>
      <div className="flex justify-center pb-14">
        <div>
          <BottleProvider>
            <UpdateBottleForm bottleId={bottleId} />
          </BottleProvider>
        </div>
      </div>
    </section>
  );
}
