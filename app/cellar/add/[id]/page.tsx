'use client';

import { useParams } from 'next/navigation';

import BottleForm from './bottle-form';

import { BottleProvider } from '@/app/context/BottleContext';

export default function AddBottle() {
  const params = useParams<{ id: string }>();
  const cellarId = params.id;

  return (
    <section className="mx-auto my-6 flex max-w-5xl flex-col md:max-w-2xl lg:max-w-4xl md:rounded-md md:border md:shadow-2xl">
      <h1 className="pt-4 text-center text-2xl font-bold">
        Création d&apos;une bouteille
      </h1>
      <div className="flex justify-center pb-14">
        <div className="w-4/5">
          <BottleProvider>
            <BottleForm cellarId={cellarId} />
          </BottleProvider>
        </div>
      </div>
    </section>
  );
}
