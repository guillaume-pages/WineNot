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
  const isConnected = false;
  return (
    <>
      <div className="md:hidden flex w-full space-x-8 justify-center fixed bottom-0">
        <Image src={LogoPetit} height={36} width={46} alt="Compagny logo" />
        <PiWineThin size={28} />
        <PiHouseLineLight size={30} />
        <PiChartLineUpThin size={32} />
        {isConnected ? <CiLogout size={34} /> : <CiLogin size={34} />}
        <CiSettings size={36} />
      </div>
    </>
  )
}
