'use client';

import { useParams } from 'next/navigation';

import BottleForm from './bottle-form';

import { BottleProvider } from '@/app/context/BottleContext';

export default function AddBottle() {
  const params = useParams<{ id: string }>();
  const cellarId = params.id;

  return (
    <section className='mt-6 sm:max-w-4xl sm:rounded-md lg:border lg:shadow-2xl sm:mx-auto'>
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
