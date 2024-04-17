'use client';

import { useState } from 'react';
import { useFormState } from 'react-dom';

import Image from 'next/image';
import Link from 'next/link';

import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

import bottles from '@/app/bottles.jpg';
import logoPetit from '@/app/logo-petit.png';
import { createUser } from '@/app/lib/user/user.post';

 
export default function LoginPage() {
  const initialState = { message: null };
  const [state, dispatch] = useFormState(createUser, initialState);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [status, setStatus] = useState('');


  const [isPasswordValid, setIsPasswordValid] = useState('');
  const [hasLowercase, setHasLowercase] = useState(false);
  const [hasUppercase, setHasUppercase] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSpecialChar, setHasSpecialChar] = useState(false);
  const [isMinLength, setIsMinLength] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleStatusChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setStatus(e.target.value);
  };

  const handleIsPasswordValid = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    const password = e.target.value as string;
    setHasLowercase(/[a-z]/.test(password));
    setHasUppercase(/[A-Z]/.test(password));
    setHasNumber(/\d/.test(password));
    setHasSpecialChar(/[@$!%*?&,]/.test(password));
    setIsMinLength(password.length >= 10);
    setIsPasswordValid(e.target.value);
  };

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

              <form action="#" className="mt-8 grid grid-cols-6 gap-6">
                {/* EMAIL */}
                <div className="col-span-6">
                  <label
                    htmlFor="Email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Votre mail
                  </label>

                  <input
                    type="email"
                    id="Email"
                    name="email"
                    required
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  />
                </div>

                {/* PASSWORD */}
                <div className="col-span-6">
                  <label
                    htmlFor="Password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Votre mot de passe
                    <br />
                    <span className="text-xs">
                      doit contenir au moins :{' '}
                      <span className={hasUppercase ? 'text-green-500' : undefined}>une majuscule</span>,{' '}
                      <span className={hasLowercase ? 'text-green-500' : undefined}>une minuscule</span>,{' '}
                      <span className={hasNumber ? 'text-green-500' : undefined}>un chiffre</span>,{' '}
                      <span className={hasSpecialChar ? 'text-green-500' : undefined}>un caractère spécial</span> et{' '}
                      <span className={isMinLength ? 'text-green-500' : undefined}>doit faire au moins 10 caractères</span>.
                    </span>
                  </label>

                  <div className="relative">
                    <input
                      type={isPasswordVisible ? 'text' : 'password'}
                      id="Password"
                      name="password"
                      onChange={handleIsPasswordValid}
                      required
                      pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&,])[A-Za-z\d@$!%*?&,]{10,}$"
                      title="Le mot de passe doit contenir au moins une minuscule, une majuscule, un chiffre, un caractère spécial parmi (@$!%*?&,) et être d'une longeur de 10 caractères minimum."
                      className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 px-3 py-2 text-gray-500"
                    >
                      {isPasswordVisible ? <FaRegEyeSlash /> : <FaRegEye />}
                    </button>
                  </div>
                </div>

                {/* SUBMIT */}
                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                  <button className="inline-block shrink-0 rounded-md border border-orange-600 bg-orange-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-orange-600 focus:outline-none focus:ring active:text-orange-500">
                    Se connecter
                  </button>

                  <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                    Vous n&apos;avez pas de compte ?{' '}
                    <Link href="/signin" className="text-gray-700 underline">
                      S&apos;inscrire
                    </Link>
                    .
                  </p>
                </div>
              </form>
            </div>
          </main>
        </div>
      </section>
    </>
  );
}