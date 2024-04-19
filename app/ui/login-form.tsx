import { useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import Link from 'next/link';

import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

import { authenticate } from '@/app/lib/user/user.authenticate';
import { Button } from './button';

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <>
      <button
        aria-disabled={pending}
        className="inline-block shrink-0 rounded-md border border-[#280000] bg-[#b10f2e] px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-[#b10f2e] focus:outline-none focus:ring active:text-[#b10f2e]"
      >
        Se connecter
      </button>
      <p className="mt-4 text-sm text-gray-500 sm:mt-0">
        Vous n&apos;avez pas de compte ?{' '}
        <Link href="/signin" className="text-gray-700 underline">
          S&apos;inscrire
        </Link>
        .
      </p>
    </>
  );
}

export default function LoginForm() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <>
      <form action={dispatch} className="mt-8 grid grid-cols-6 gap-6">
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
          </label>

          <div className="relative">
            <input
              type={isPasswordVisible ? 'text' : 'password'}
              id="Password"
              name="pw"
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
          <LoginButton />
        </div>
      </form>
      <div className="flex h-8 items-end space-x-1">
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>
      </div>
    </>
  );
}
