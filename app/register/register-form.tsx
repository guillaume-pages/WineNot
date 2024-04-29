'use client';

import React, { useEffect } from 'react';

import { useState } from 'react';
import { useFormState } from 'react-dom';

import Link from 'next/link';

import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import clsx from 'clsx';
import toast, { Toaster } from 'react-hot-toast';

import { createUser } from '@/app/lib/user/user.post';

const notifySucces = (msg: string) =>
  toast.success(msg, {
    duration: 4000,
    position: 'top-right',
  });

const notifyError = (msg: string) =>
  toast.error(msg, {
    duration: 4000,
    position: 'top-right',
  });

export default function RegisterForm() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createUser, initialState);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [status, setStatus] = useState('');

  const [isPasswordValid, setIsPasswordValid] = useState('');
  const [hasLowercase, setHasLowercase] = useState(false);
  const [hasUppercase, setHasUppercase] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSpecialChar, setHasSpecialChar] = useState(false);
  const [isMinLength, setIsMinLength] = useState(false);

  const [isSamePassword, setIsSamePassword] = useState('');

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

  const handleIsSamePassword = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setIsSamePassword(e.target.value);
  };

  useEffect(() => {
    if (state.message) {
      let msg = state.message;
      if (msg.includes('succès')) {
        notifySucces(msg);
      } else {
        notifyError(msg);
      }
    }
  }, [state.message]);

  return (
    <>
      <Toaster />
      <form action={dispatch} className="mt-8 grid grid-cols-6 gap-4 md:gap-2">
        {/* FIRST NAME */}
        <div className="col-span-6 sm:col-span-3">
          <label
            htmlFor="FirstName"
            className="block text-base font-medium "
          >
            Votre prénom
          </label>
          <input
            type="text"
            id="FirstName"
            name="firstname"
            required
            className="mt-1 w-full rounded-md text-base  shadow-sm"
          />
        </div>

        {/* LAST NAME */}
        <div className="col-span-6 sm:col-span-3">
          <label
            htmlFor="LastName"
            className="block text-base font-medium "
          >
            Votre nom (optionnel)
          </label>
          <input
            type="text"
            id="LastName"
            name="lastname"
            className="mt-1 w-full rounded-md  text-base  shadow-sm"
          />
        </div>

        {/* EMAIL */}
        <div className="col-span-6">
          <label
            htmlFor="Email"
            className="block text-base font-medium "
          >
            Votre mail
          </label>
          <input
            type="email"
            id="Email"
            name="email"
            required
            className="mt-1 w-full rounded-md  text-base  shadow-sm"
          />
        </div>

        {/* PASSWORD */}
        <div className="col-span-6">
          <label
            htmlFor="Password"
            className="block text-base font-medium "
          >
            Votre mot de passe
            <br />
            <span className="text-xs">
              doit contenir au moins :{' '}
              <span className={hasUppercase ? 'text-success' : undefined}>
                une majuscule
              </span>
              ,{' '}
              <span className={hasLowercase ? 'text-success' : undefined}>
                une minuscule
              </span>
              ,{' '}
              <span className={hasNumber ? 'text-success' : undefined}>
                un chiffre
              </span>
              ,{' '}
              <span className={hasSpecialChar ? 'text-success' : undefined}>
                un caractère spécial
              </span>{' '}
              et{' '}
              <span className={isMinLength ? 'text-success' : undefined}>
                doit faire au moins 10 caractères
              </span>
              .
            </span>
          </label>
          <div className="relative">
            <input
              type={isPasswordVisible ? 'text' : 'password'}
              id="Password"
              name="password"
              onChange={handleIsPasswordValid}
              required
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&,#.])[A-Za-z\d@$!%*?&,#.]{10,}$"
              title="Le mot de passe doit contenir au moins une minuscule, une majuscule, un chiffre, un caractère spécial parmi (@$!%*?&,) et être d'une longeur de 10 caractères minimum."
              className="mt-1 w-full rounded-md  text-base  shadow-sm"
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

        {/* CONFIRM PASSWORD */}
        <div className="col-span-6">
          <label
            htmlFor="ConfirmPassword"
            className="block text-base font-medium "
          >
            Veuillez confirmer votre mot de passe
            {isSamePassword.length < 1
              ? ''
              : isSamePassword === isPasswordValid
              ? ''
              : ' (les mots de passe ne correspondent pas)'}
          </label>
          <div className="relative">
            <input
              type={isPasswordVisible ? 'text' : 'password'}
              id="ConfirmPassword"
              name="confirmPassword"
              onChange={handleIsSamePassword}
              required
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&,#.])[A-Za-z\d@$!%*?&,#.]{10,}$"
              title="Le mot de passe doit contenir au moins une minuscule, une majuscule, un chiffre, un caractère spécial parmi (@$!%*?&,) et être d'une longeur de 10 caractères minimum."
              className={clsx(
                'mt-1 w-full rounded-md  text-base  shadow-sm',
                {
                  'border-red-500':
                    isSamePassword.length < 1
                      ? ''
                      : isSamePassword !== isPasswordValid,
                },
              )}
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

        {/* PHONE */}
        <div className="col-span-6 sm:col-span-3">
          <label
            htmlFor="Phone"
            className="block text-base font-medium "
          >
            Votre numéro de téléphone (optionnel)
          </label>
          <input
            type="text"
            id="Phone"
            name="phone"
            className="mt-1 w-full rounded-md  text-base  shadow-sm"
          />
        </div>

        {/* STATUS */}
        <div className="col-span-6 sm:col-span-3">
          <label
            htmlFor="Status"
            className="block text-base font-medium "
          >
            Votre status
          </label>
          <select
            id="Status"
            name="status"
            value={status}
            onChange={handleStatusChange}
            required
            className="mt-1 w-full rounded-md  text-base  shadow-sm"
          >
            <option value="">Choisissez votre statut</option>
            <option value="particulier">Particulier</option>
            <option value="caviste">Caviste</option>
            <option value="vigneron">Vigneron</option>
            <option value="restaurateur">Restaurateur</option>
          </select>
        </div>

        {/* MARKETING ACCEPT */}
        {/* 
        <div className="col-span-6">
          <label htmlFor="MarketingAccept" className="flex gap-4">
            <input
              type="checkbox"
              id="MarketingAccept"
              name="marketing_accept"
              className="size-5 rounded-md  shadow-sm"
            />

            <span className="text-base ">
              Je souhaite recevoir des emails sur les événements, les mises à
              jour de produits et les annonces de l&apos;entreprise.
            </span>
          </label>
        </div> */}

        {/* TERMS ACCEPT */}
        <div className="col-span-6">
          <p className="text-base">
            En créant un compte, vous acceptez nos{' '}
            <Link href="#" className=" underline">
              conditions générales d&apos;utilisation
            </Link>{' '}
            et{' '}
            <a href="#" className=" underline">
              notre politique de confidentialité
            </a>
            .
          </p>
        </div>

        {/* SUBMIT */}
        <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
          <button className="btn btn-primary rounded-md border border-neutral px-12 py-3 text-sm font-medium focus:outline-none focus:ring">
            Créer un compte
          </button>
          <p className="mt-4 text-base sm:mt-0">
            Vous avez déjà un compte ?{' '}
            <Link href="/login" className="ml-1 font-bold text-primary">
              Se connecter
            </Link>
          </p>
        </div>
        <div className="col-span-6">
          {state.message && (
            <p
              className={clsx('mt-2 text-base', {
                'text-success': state.message.includes('succès'),
                'text-error': !state.message.includes('succès'),
              })}
            >
              {state.message}
            </p>
          )}
        </div>
      </form>
    </>
  );
}