'use client';

import Image from 'next/image';
import Link from 'next/link';

import bottles from '@/app/bottles.jpg';
import logoPetit from '@/app/logo-petit.png';
import { LoginForm } from '@/app/login/login-form'
import { Suspense } from 'react';

export default function LoginPage() {
  return (
    <>
      <section className="bg-white">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
            <Image
              alt="Des bouteilles de vin - Photo de Markus Spiske sur Unsplash"
              src={bottles}
              layout="fill"
              objectFit="cover"
              className="absolute inset-0 h-full w-full object-cover opacity-80"
            ></Image>
          </section>

          <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
            <div className="max-w-xl lg:max-w-3xl">
              <div className="relative -mt-16 block">
                <Link
                  className="size-16 sm:size-20 inline-flex items-center justify-center rounded-full bg-white text-blue-600"
                  href="/"
                >
                  <Image
                    alt="Logo entreprise"
                    src={logoPetit}
                    className="h-16 w-16 object-cover pt-1"
                  ></Image>
                </Link>

                <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                  Bon retour sur Cavavin !
                </h1>

                <p className="mt-4 leading-relaxed text-gray-500">
                  Heureux de vous revoir, reprenez où vous en étiez !
                </p>
              </div>
              <Suspense fallback={<>Chargement...</>}>
                <LoginForm />
              </Suspense>
            </div>
          </main>
        </div>
      </section>
    </>
  );
}
