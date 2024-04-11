'use client';
import Image from 'next/image';
import Link from 'next/link';

import { PiWineThin } from 'react-icons/pi';
import { PiHouseLineLight } from 'react-icons/pi';
import { PiChartLineUpThin } from 'react-icons/pi';
import { CiLogin } from 'react-icons/ci';
import { CiLogout } from 'react-icons/ci';
import { CiSettings } from 'react-icons/ci';
import LogoPetit from '@/app/logo-petit.png';

export default function NavbarMobile() {
  const isConnected = true;
  return (
    <>
      <div className="fixed bottom-0 flex h-11 w-full justify-center space-x-6 py-1 bg-slate-50 md:hidden">
        <Link href="/">
          <Image src={LogoPetit} height={36} width={46} alt="Compagny logo" />
        </Link>
        <Link href="/cellar">
          <PiWineThin size={36} />
        </Link>
        <Link href="/feed">
          <PiHouseLineLight size={36} />
        </Link>
        {/* <Link href="/dashboard">
          <PiChartLineUpThin size={36} />
        </Link> */}
        {isConnected ? <CiLogout size={36} /> : <CiLogin size={36} />}
        <Link href="#">
          <CiSettings size={36} />
        </Link>
      </div>
    </>
  );
}
