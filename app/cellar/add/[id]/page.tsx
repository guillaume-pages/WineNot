'use client';

import { useParams } from 'next/navigation';

import BottleFormmmmm from './bottle-formmmmm';
import BottleForm from './bottle-form';

import { BottleProvider } from '@/app/context/BottleContext';

export default function AddBottle() {
  const params = useParams<{ id: string }>();
  const cellarId = params.id;

  

  return (
    <>
      <h1 className="pt-4 text-center text-2xl font-bold">
        Création d&apos;une bouteille
      </h1>
      <div className="flex justify-center pb-14">
        <div className="w-4/5">
          {/* <BottleFormmmmm /> */}
          <BottleProvider>
            <BottleForm />
          </BottleProvider>
        </div>
      </div>
    </>
  );
}
