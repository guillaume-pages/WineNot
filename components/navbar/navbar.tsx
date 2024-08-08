'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import logoPetit from '@/app/logo-petit.png';
import logoPetitDark from '@/app/logo-petit-dark.png';
import { BoxChoosingTheme } from '@/components/box-choosing-theme';
import { Button } from '@/components/ui/button';
import { VscAccount } from "react-icons/vsc";


// // TODO: affichage de tableau de bord si le user est un professionnel

// // TODO: affichage d'une barre sous la page pour indiquer la page actuelle

export default function Navbar() {
  const pathname = usePathname();
  const { data } = useSession();
  const { resolvedTheme } = useTheme();
  const [logo, setLogo] = useState(logoPetit);
  const user = data?.user;
  const isSigninOrLogin = pathname === '/login' || pathname === '/register';

  useEffect(() => {
    if (resolvedTheme === 'dark') {
      setLogo(logoPetitDark);
    } else {
      setLogo(logoPetit);
    }
  }
  , [resolvedTheme]);

  if (isSigninOrLogin) {
    return null;
  }

  return (
      <header className="hidden sm:block">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex-1 md:flex md:items-center md:gap-12">
              <Link href="/">
                <Image
                  src={logo}
                  alt="Logo entreprise Cavavin"
                  width={64}
                  height={64}
                />
              </Link>
            </div>

            <div className="sm:flex sm:items-center md:gap-12">
              <nav aria-label="Global" className="hidden sm:flex">
                <ul className="flex items-center gap-6 text-sm">
                  {/* <li>
                    <Link
                      className="transition hover:text-gray-500/75"
                      href="/feed"
                    >
                      {' '}
                      ACCUEIL{' '}
                    </Link>
                  </li> */}
                  {user && (
                    <>
                      <li>
                        <Link
                          className="transition hover:text-gray-500/75"
                          href="/cellar"
                        >
                          MA CAVE
                        </Link>
                      </li>
                    </>
                  )}

                  {/* <li>
                <Link className="transition hover:text-gray-500/75" href="/dashboard">TABLEAU DE BORD</Link>
              </li> */}
                </ul>
              </nav>

              <div className="flex items-center gap-4">
                {!user && (
                  <div className="sm:flex sm:gap-4">
                    <Button variant={'secondary'}>
                      <Link
                        className="rounded-md text-sm font-medium"
                        href="/register"
                      >
                        S&apos;inscrire
                      </Link>
                    </Button>
                    <Button className="hidden sm:flex">
                      <Link
                        className="rounded-md text-sm font-medium"
                        href="/login"
                      >
                        Se connecter
                      </Link>
                    </Button>
                  </div>
                )}
                {user && (
                  <>
                    <Link href="/profile" aria-label='Profile'>
                      <VscAccount className='text-2xl'/>
                    </Link>
                  </>
                )}
                <BoxChoosingTheme />
              </div>
            </div>
          </div>
        </div>
      </header>
  );
}
