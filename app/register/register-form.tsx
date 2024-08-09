'use client';

import React, { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';

import { createUser } from '@/app/lib/user/user.create';

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

  const router = useRouter();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  useEffect(() => {
    if (state.message) {
      let msg = state.message;
      if (msg.includes('succès')) {
        notifySucces(msg);
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
        notifyError(msg);
      }
    }
  }, [router, state.message]);

  return (
    <>
      <Toaster />
      <form action={dispatch} className="mt-8 grid grid-cols-6 gap-4 md:gap-2">
        {/* FIRST NAME */}
        <div className="col-span-6 sm:col-span-3">
          <Label htmlFor="FirstName" className="block text-base font-medium ">
            Votre prénom
          </Label>
          <Input
            type="text"
            id="FirstName"
            name="firstname"
            required
            className="mt-1 w-full rounded-md text-base  shadow-sm"
          />
        </div>

        {/* LAST NAME */}
        <div className="col-span-6 sm:col-span-3">
          <Label htmlFor="LastName" className="block text-base font-medium ">
            Votre nom (optionnel)
          </Label>
          <Input
            type="text"
            id="LastName"
            name="lastname"
            className="mt-1 w-full rounded-md  text-base  shadow-sm"
          />
        </div>

        {/* EMAIL */}
        <div className="col-span-6">
          <Label htmlFor="Email" className="block text-base font-medium ">
            Votre mail
          </Label>
          <Input
            type="email"
            id="Email"
            name="email"
            required
            className="mt-1 w-full rounded-md  text-base  shadow-sm"
          />
        </div>

        {/* PASSWORD */}
        <div className="col-span-6">
          <Label htmlFor="Password" className="block text-base font-medium ">
            Votre mot de passe
            <br />
            <span className="text-xs">
              doit contenir au moins : une majuscule, une minuscule, un
              chiffre, un caractère spécial et doit faire au moins 10
              caractères.
            </span>
          </Label>
          <div className="relative">
            <Input
              type={isPasswordVisible ? 'text' : 'password'}
              id="Password"
              name="password"
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
              {isPasswordVisible ? <FaRegEyeSlash aria-label="Icone oeil masqué" /> : <FaRegEye aria-label="Icone oeil ouvert" />}
            </button>
          </div>
        </div>

        {/* CONFIRM PASSWORD */}
        <div className="col-span-6">
          <Label
            htmlFor="ConfirmPassword"
            className="block text-base font-medium "
          >
            Veuillez confirmer votre mot de passe
          </Label>
          <div className="relative">
            <Input
              type={isPasswordVisible ? 'text' : 'password'}
              id="ConfirmPassword"
              name="confirmPassword"
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
              {isPasswordVisible ? <FaRegEyeSlash aria-label="Icone oeil masqué" /> : <FaRegEye aria-label="Icone oeil ouvert" />}
              </button>
          </div>
        </div>

        {/* PHONE */}
        <div className="col-span-6 sm:col-span-3">
          <Label htmlFor="Phone" className="block text-base font-medium ">
            Votre numéro de téléphone (optionnel)
          </Label>
          <Input
            type="text"
            id="Phone"
            name="phone"
            className="mt-1 w-full rounded-md  text-base  shadow-sm"
          />
        </div>

        {/* STATUS */}
        <div className="col-span-6 sm:col-span-3">
          <Label htmlFor="Status" className="block text-base font-medium ">
            Votre status
          </Label>
          <Select name="status" required>
            <SelectTrigger
              className="mt-1 w-full rounded-md text-base shadow-sm"
              id="Status"
              aria-label="Sélectionnez votre statut"
            >
              <SelectValue placeholder="Choisissez votre statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="particulier">Particulier</SelectItem>
              <SelectItem value="caviste">Caviste</SelectItem>
              <SelectItem value="Vigneron">Vigneron</SelectItem>
              <SelectItem value="restaurateur">Restaurateur</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* MARKETING ACCEPT */}
        {/* 
        <div className="col-span-6">
          <Label htmlFor="MarketingAccept" className="flex gap-4">
            <Input
              type="checkbox"
              id="MarketingAccept"
              name="marketing_accept"
              className="size-5 rounded-md  shadow-sm"
            />

            <span className="text-base ">
              Je souhaite recevoir des emails sur les événements, les mises à
              jour de produits et les annonces de l&apos;entreprise.
            </span>
          </Label>
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
          <Button className="rounded-md border border-neutral px-12 py-3 text-sm font-medium focus:outline-none focus:ring">
            Créer un compte
          </Button>
          <p className="mt-4 text-base sm:mt-0">
            Vous avez déjà un compte ?{' '}
            <Link href="/login" className="ml-1 font-bold text-primary" aria-label="Lien vers la page de connexion">
              Se connecter
            </Link>
          </p>
        </div>
      </form>
    </>
  );
}
