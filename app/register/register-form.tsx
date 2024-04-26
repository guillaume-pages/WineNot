'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { TypeOf, object, string } from 'zod';
import { signIn } from 'next-auth/react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import Link from 'next/link';

const createUserSchema = object({
  firstname: string({ required_error: 'Votre prénom est requis' }).min(
    1,
    'Name is required',
  ),
  lastname: string().optional(),
  email: string({ required_error: 'Email is required' })
    .min(1, 'Email is required')
    .email('Invalid email'),
  photo: string().optional(),
  password: string({ required_error: 'Password is required' })
    .min(1, 'Password is required')
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
  passwordConfirm: string({
    required_error: 'Please confirm your password',
  }).min(1, 'Please confirm your password'),
  phone: string().optional(),
}).refine((data) => data.password === data.passwordConfirm, {
  path: ['passwordConfirm'],
  message: 'Passwords do not match',
});

type CreateUserInput = TypeOf<typeof createUserSchema>;

export const RegisterForm = () => {
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const methods = useForm<CreateUserInput>({
    resolver: zodResolver(createUserSchema),
  });

  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const [status, setStatus] = useState('');
  const handleStatusChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setStatus(e.target.value);
  };

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const [, setIsPasswordValid] = useState('');
  const [hasLowercase, setHasLowercase] = useState(false);
  const [hasUppercase, setHasUppercase] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSpecialChar, setHasSpecialChar] = useState(false);
  const [isMinLength, setIsMinLength] = useState(false);
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

  const onSubmitHandler: SubmitHandler<CreateUserInput> = async (values) => {
    try {
      setSubmitting(true);
      const res = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setSubmitting(false);
      if (!res.ok) {
        const message = (await res.json()).message;
        toast.error(message);
        return;
      }

      signIn(undefined, { callbackUrl: '/' });
    } catch (error: any) {
      setSubmitting(false);
      toast.error(error.message);
    }
  };

  const input_style =
    'mt-1 w-full rounded-md border-gray-200 bg-white text-base text-gray-700 shadow-sm';

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className="mt-8 grid grid-cols-6 gap-4 md:gap-2"
    >
      <div className="col-span-6 sm:col-span-3">
        <label
          htmlFor="firstname"
          className="block text-base font-medium text-gray-700"
        >
          Votre prénom
        </label>
        <input
          {...register('firstname')}
          placeholder="Votre prénom"
          className={`${input_style}`}
        />
        {errors['firstname'] && (
          <span className="block pt-1 text-xs text-red-500">
            {errors['firstname']?.message as string}
          </span>
        )}
      </div>

      <div className="col-span-6 sm:col-span-3">
        <label
          htmlFor="lastname"
          className="block text-base font-medium text-gray-700"
        >
          Votre nom (optionnel)
        </label>
        <input
          {...register('lastname')}
          placeholder="Votre nom"
          className={`${input_style}`}
        />
        {errors['lastname'] && (
          <span className="block pt-1 text-xs text-red-500">
            {errors['lastname']?.message as string}
          </span>
        )}
      </div>

      <div className="col-span-6">
        <label
          htmlFor="email"
          className="block text-base font-medium text-gray-700"
        >
          Votre email
        </label>
        <input
          type="email"
          {...register('email')}
          placeholder="email@exemple.com"
          className={`${input_style}`}
        />
        {errors['email'] && (
          <span className="block pt-1 text-xs text-red-500">
            {errors['email']?.message as string}
          </span>
        )}
      </div>

      <div className="col-span-6">
        <label
          htmlFor="password"
          className="block text-base font-medium text-gray-700"
        >
          Votre mot de passe
          <br />
            <span className="text-xs">
              doit contenir au moins :{' '}
              <span className={hasUppercase ? 'text-green-500' : undefined}>
                une majuscule
              </span>
              ,{' '}
              <span className={hasLowercase ? 'text-green-500' : undefined}>
                une minuscule
              </span>
              ,{' '}
              <span className={hasNumber ? 'text-green-500' : undefined}>
                un chiffre
              </span>
              ,{' '}
              <span className={hasSpecialChar ? 'text-green-500' : undefined}>
                un caractère spécial
              </span>{' '}
              et{' '}
              <span className={isMinLength ? 'text-green-500' : undefined}>
                doit faire au moins 10 caractères
              </span>
              .
            </span>
        </label>
        <div className="relative">
          <input
            type={isPasswordVisible ? 'text' : 'password'}
            {...register('password')}
            placeholder="Votre mot de passe"
            onChange={handleIsPasswordValid}
            className={`${input_style}`}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 px-3 py-2 text-gray-500"
          >
            {isPasswordVisible ? <FaRegEyeSlash /> : <FaRegEye />}
          </button>
        </div>
        {errors['password'] && (
          <span className="block pt-1 text-xs text-red-500">
            {errors['password']?.message as string}
          </span>
        )}
      </div>

      <div className="col-span-6">
        <label
          htmlFor="passwordConfirm"
          className="block text-base font-medium text-gray-700"
        >
          Confirmez votre mot de passe
        </label>
        <div className="relative">
          <input
            type={isPasswordVisible ? 'text' : 'password'}
            {...register('passwordConfirm')}
            placeholder="Confirmez votre mot de passe"
            className={`${input_style}`}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 px-3 py-2 text-gray-500"
          >
            {isPasswordVisible ? <FaRegEyeSlash /> : <FaRegEye />}
          </button>
        </div>

        {errors['passwordConfirm'] && (
          <span className="block pt-1 text-xs text-red-500">
            {errors['passwordConfirm']?.message as string}
          </span>
        )}
      </div>

      <div className="col-span-6 sm:col-span-3">
        <label
          htmlFor="phone"
          className="block text-base font-medium text-gray-700"
        >
          Votre numéro de téléphone (optionnel)
        </label>
        <input
          type="text"
          {...register('phone')}
          placeholder="Veuillez entrer votre numéro de téléphone"
          className={`${input_style}`}
        />
        {errors['phone'] && (
          <span className="block pt-1 text-xs text-red-500">
            {errors['phone']?.message as string}
          </span>
        )}
      </div>

      <div className="col-span-6 sm:col-span-3">
        <label
          htmlFor="Status"
          className="block text-base font-medium text-gray-700"
        >
          Votre status
        </label>
        <select
          id="Status"
          name="status"
          value={status}
          onChange={handleStatusChange}
          required
          className="mt-1 w-full rounded-md border-gray-200 bg-white text-base text-gray-700 shadow-sm"
        >
          <option value="">Choisissez votre statut</option>
          <option value="particulier">Particulier</option>
          <option value="caviste">Caviste</option>
          <option value="vigneron">Vigneron</option>
          <option value="restaurateur">Restaurateur</option>
        </select>
      </div>

      <div className="col-span-6">
        <p className="text-base text-gray-500">
          En créant un compte, vous acceptez nos{' '}
          <Link href="#" className="text-gray-700 underline">
            conditions générales d&apos;utilisation
          </Link>{' '}
          et{' '}
          <a href="#" className="text-gray-700 underline">
            notre politique de confidentialité
          </a>
          .
        </p>
      </div>

      <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
        <button
          type="submit"
          className="inline-block shrink-0 rounded-md border border-[#280000] bg-[#b10f2e] px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-[#b10f2e] focus:outline-none focus:ring active:text-[#b10f2e]"
          disabled={submitting}
        >
          {submitting ? 'Veuillez patienter...' : "S'inscrire"}
        </button>
        <p className="mt-4 text-base text-gray-500 sm:mt-0">
          Vous avez déjà un compte ?{' '}
          <Link href="/login" className="ml-1 font-bold text-[#B10F2E]">
            Se connecter
          </Link>
        </p>
      </div>
    </form>
  );
};
