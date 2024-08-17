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
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [status, setStatus] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(false);
  
    const router = useRouter();
  
    const togglePasswordVisibility = () => {
      setIsPasswordVisible(!isPasswordVisible);
    };
  
    const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault();
      if (password !== confirmPassword) {
        toast.error('Les mots de passe ne correspondent pas');
        return;
      }
  
      try {
        setLoading(true);
        await createUser({
          firstname: firstName,
          lastname: lastName,
          email,
          password,
          confirmPassword,
          phone,
          status,
        });
        
  
        toast.success('Compte créé avec succès');
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } catch (error: any) {
        toast.error(error.message || 'Erreur lors de la création du compte');
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <>
        <Toaster />
        <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-6 gap-4 md:gap-2">
          {/* FIRST NAME */}
          <div className="col-span-6 sm:col-span-3">
            <Label htmlFor="FirstName" className="block text-base font-medium ">
              Votre prénom
            </Label>
            <Input
              type="text"
              id="FirstName"
              name="firstname"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="mt-1 w-full rounded-md text-base shadow-sm"
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
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="mt-1 w-full rounded-md text-base shadow-sm"
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full rounded-md text-base shadow-sm"
            />
          </div>
  
          {/* PASSWORD */}
          <div className="col-span-6">
            <Label htmlFor="Password" className="block text-base font-medium ">
              Votre mot de passe
              <br />
              <span className="text-xs">
                doit contenir au moins : une majuscule, une minuscule, un chiffre, un caractère spécial et doit faire au moins 10 caractères.
              </span>
            </Label>
            <div className="relative">
              <Input
                type={isPasswordVisible ? 'text' : 'password'}
                id="Password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&,#.])[A-Za-z\d@$!%*?&,#.]{10,}$"
                title="Le mot de passe doit contenir au moins une minuscule, une majuscule, un chiffre, un caractère spécial parmi (@$!%*?&,) et être d'une longueur de 10 caractères minimum."
                className="mt-1 w-full rounded-md text-base shadow-sm"
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
            <Label htmlFor="ConfirmPassword" className="block text-base font-medium ">
              Veuillez confirmer votre mot de passe
            </Label>
            <div className="relative">
              <Input
                type={isPasswordVisible ? 'text' : 'password'}
                id="ConfirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&,#.])[A-Za-z\d@$!%*?&,#.]{10,}$"
                title="Le mot de passe doit contenir au moins une minuscule, une majuscule, un chiffre, un caractère spécial parmi (@$!%*?&,) et être d'une longueur de 10 caractères minimum."
                className="mt-1 w-full rounded-md text-base shadow-sm"
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
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 w-full rounded-md text-base shadow-sm"
            />
          </div>
  
          {/* STATUS */}
          <div className="col-span-6 sm:col-span-3">
            <Label htmlFor="Status" className="block text-base font-medium ">
              Votre statut
            </Label>
            <Select name="status" required onValueChange={setStatus}>
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
                <SelectItem value="vigneron">Vigneron</SelectItem>
                <SelectItem value="restaurateur">Restaurateur</SelectItem>
              </SelectContent>
            </Select>
          </div>
  
          {/* TERMS ACCEPT */}
          <div className="col-span-6">
            <p className="text-base">
              En créant un compte, vous acceptez nos{' '}
              <Link href="#" className="underline">
                conditions générales d&apos;utilisation
              </Link>{' '}
              et{' '}
              <a href="#" className="underline">
                notre politique de confidentialité
              </a>
              .
            </p>
          </div>
  
          {/* SUBMIT */}
          <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
            <Button type="submit" disabled={loading} className="rounded-md border border-neutral px-12 py-3 text-sm font-medium focus:outline-none focus:ring">
              {loading ? 'Création...' : 'Créer un compte'}
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