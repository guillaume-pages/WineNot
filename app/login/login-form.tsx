'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';
import { TypeOf, object, string } from 'zod';
import Link from 'next/link';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';


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
  const callbackUrl = searchParams.get('/') || '/cellar';

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
        email: values.email.toLowerCase(),
        password: values.password,
        redirectTo: callbackUrl,
      });

      setSubmitting(false);

      if (!res?.error) {
        toast.success('Vous êtes connecté', { duration: 4000, position: 'top-right' });
        router.push(callbackUrl);
      } else {
        reset({ password: '' });
        const message = 'Mot de passe ou email incorrect';
        toast.error(message, { duration: 2500, position: 'top-right' });
        setError(message);
      }
    } catch (error: any) {
      toast.error(error.message, { duration: 4000, position: 'top-right' });
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        {error && <p className="text-error">{error}</p>}
        <div className="mb-6">
          <Input
            type="email"
            {...register('email')}
            placeholder="Votre email"
            className="w-full"
          />
          {errors['email'] && (
            <span className="block pt-1 text-xs text-error">
              {errors['email']?.message as string}
            </span>
          )}
        </div>
        <div className='mb-6'>
          <div className="relative">
            <Input
              type={isPasswordVisible ? 'text' : 'password'}
              {...register('password')}
              placeholder="Votre mot de passe"
              className="Input Input-bordered w-full"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 px-3 py-2"
            >
              {isPasswordVisible ? <FaRegEyeSlash /> : <FaRegEye />}
            </button>
          </div>
          {errors['password'] && (
            <span className="block pt-1 text-xs text-error">
              {errors['password']?.message as string}
            </span>
          )}
        </div>
        <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
          <Button
            type="submit"
            className="btn btn-primary w-36"
            disabled={submitting}
          >
            {submitting ? 'Connexion...' : 'Se connecter'}
          </Button>
          <p className="mt-4 text-base sm:mt-0">
          Vous n&apos;avez pas encore de compte ?{' '}
          <Link href="/register" className="ml-1 font-bold text-primary">
            S&apos;inscrire
          </Link>
        </p>
        </div>
      </form>
    </>
  );
};
