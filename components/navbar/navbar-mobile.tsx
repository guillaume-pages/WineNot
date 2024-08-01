'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import { PiWineThin } from 'react-icons/pi';
import { PiHouseLineLight } from 'react-icons/pi';
import { PiChartLineUpThin } from 'react-icons/pi';
import { CiLogin } from 'react-icons/ci';
import { VscAccount } from 'react-icons/vsc';

import logoPetit from '@/app/logo-petit.png';
import logoPetitDark from '@/app/logo-petit-dark.png';

export default function NavbarMobile() {
  const pathname = usePathname();
  const { data } = useSession();
  const { resolvedTheme } = useTheme();
  const [logo, setLogo] = useState(logoPetit);

  const user = data?.user;

  const isConnected = user ? true : false;

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
    <>
      <div className="fixed bottom-0 z-10 flex h-12 w-full justify-center space-x-6 border-t-[1px] border-accent-foreground bg-accent py-1 sm:hidden">
        <Link href="/">
          <Image src={logo} height={36} width={46} alt="Compagny logo" />
        </Link>
        <Link href="/cellar">
          <PiWineThin size={36} />
        </Link>
        {/* <Link href="/feed">
          <PiHouseLineLight size={36} />
        </Link> */}
        {/* <Link href="/dashboard">
          <PiChartLineUpThin size={36} />
        </Link> */}
        {isConnected ? (
          <>
            <Link href="/profile">
              <VscAccount size={36} />
            </Link>
          </>
        ) : (
          <>
            <Link href="/login">
              <CiLogin size={36} />
            </Link>
          </>
        )}
      </div>
    </>
  );
}
