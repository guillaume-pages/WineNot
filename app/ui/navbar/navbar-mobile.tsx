'use client';
import Image from "next/image";

import { PiWineThin } from "react-icons/pi";
import { PiHouseLineLight } from "react-icons/pi";
import { PiChartLineUpThin } from "react-icons/pi";
import { CiLogin } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import { CiSettings } from "react-icons/ci";
import LogoPetit from '@/app/logo-petit.png'

export default function NavbarMobile() {
  const isConnected = true;
  return (
    <>
      <div className="md:hidden flex w-full h-10 space-x-6 justify-center fixed bottom-0">
        <Image src={LogoPetit} height={36} width={46} alt="Compagny logo" />
        <PiWineThin size={36} />
        <PiHouseLineLight size={36} />
        <PiChartLineUpThin size={36} />
        {isConnected ? <CiLogout size={36} /> : <CiLogin size={36} />}
        <CiSettings size={36} />
      </div>
    </>
  )
}
