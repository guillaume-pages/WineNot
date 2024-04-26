'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';
import { TypeOf, object, string } from 'zod';
import Link from 'next/link';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

const loginUserSchema = object({
  email: string({ required_error: "L'email est requis" })
    .min(1, "L'email est requis")
    .email('Mot de passe ou email incorrect'),
  password: string({ required_error: 'Le mot de passe est requis' }).min(
    1,
    'Le mot de passe est requis',
  ),
});

type LoginUserInput = TypeOf<typeof loginUserSchema>;

export const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('/') || '/feed';

  const methods = useForm<LoginUserInput>({
    resolver: zodResolver(loginUserSchema),
  });

  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const onSubmitHandler: SubmitHandler<LoginUserInput> = async (values) => {
    try {
      setSubmitting(true);

      const res = await signIn('credentials', {
        redirect: false,
        email: values.email,
        password: values.password,
        redirectTo: callbackUrl,
      });

      setSubmitting(false);

      if (!res?.error) {
        toast.success('Vous êtes connecté');
        router.push(callbackUrl);
      } else {
        reset({ password: '' });
        const message = 'Mot de passe ou email incorrect';
        toast.error(message);
        setError(message);
      }
    } catch (error: any) {
      toast.error(error.message);
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const input_style =
    'mt-1 w-full rounded-md border-gray-200 bg-white text-base text-gray-700 shadow-sm';

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      {error && (
        <p className="mb-6 rounded bg-red-300 py-4 text-center">{error}</p>
      )}
      <div className="mb-6">
        <input
          type="email"
          {...register('email')}
          placeholder="Votre email"
          className={`${input_style}`}
        />
        {errors['email'] && (
          <span className="block pt-1 text-xs text-red-500">
            {errors['email']?.message as string}
          </span>
        )}
      </div>
      <div className="mb-6">
        <div className="relative">
          <input
            type={isPasswordVisible ? 'text' : 'password'}
            {...register('password')}
            placeholder="Mot de passe"
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
      <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
        <button
          type="submit"
          className="inline-block shrink-0 rounded-md border border-[#280000] bg-[#b10f2e] px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-[#b10f2e] focus:outline-none focus:ring active:text-[#b10f2e]"
          disabled={submitting}
        >
          {submitting ? 'Veuillez patienter...' : 'Se connecter'}
        </button>
        <p className="mt-4 text-base text-gray-500 sm:mt-0">
          Vous n&apos;avez pas encore de compte ?{' '}
          <Link href="/register" className="ml-1 font-bold text-[#B10F2E]">
            S&apos;inscrire
          </Link>
        </p>
      </div>

      {/* EN ATTENTE IMPLEMENTATION GITHUB AND GOOGLE PROVIDER */}
      {/* <div className='flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5'>
        <p className='text-center font-semibold mx-4 mb-0'>OU</p>
      </div> */}
      {/* <a
        className='px-7 py-2 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3'
        style={{ backgroundColor: '#3b5998' }}
        onClick={() => signIn('google', { callbackUrl })}
        role='button'
      >
        <Image
          className='pr-2'
          src='/images/google.svg'
          alt=''
          style={{ height: '2rem' }}
          width={35}
          height={35}
        />
        Continue with Google
      </a>
      <a
        className='px-7 py-2 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center'
        style={{ backgroundColor: '#55acee' }}
        onClick={() => signIn('github', { callbackUrl })}
        role='button'
      >
        <Image
          className='pr-2'
          src='/images/github.svg'
          alt=''
          width={40}
          height={40}
        />
        Continue with GitHub
      </a> */}
    </form>
  );
};
