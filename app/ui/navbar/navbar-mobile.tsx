'use client';
import Image from "next/image";

import { PiWineThin } from "react-icons/pi";
import { PiHouseLineLight } from "react-icons/pi";
import { PiChartLineUpThin } from "react-icons/pi";
import { CiLogin } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import { CiSettings } from "react-icons/ci";
import LogoMoyen from '@/app/logo-moyen.png'

export default function NavbarMobile() {
  const isConnected = false;
  return (
    <>
      <div className="md:hidden flex w-full space-x-8 justify-center fixed bottom-0">
        <Image src={LogoMoyen} height={28} width={28} alt="Compagny logo" />
        <PiWineThin size={28} />
        <PiHouseLineLight size={30} />
        <PiChartLineUpThin size={32} />
        {isConnected ? <CiLogout size={34} /> : <CiLogin size={34} />}
        <CiSettings size={36} />
      </div>
    </>
  )
}
