'use client';

import { PiWineThin } from "react-icons/pi";
import { PiHouseLineLight } from "react-icons/pi";
import { PiChartLineUpThin } from "react-icons/pi";
import { CiLogin } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import { CiSettings } from "react-icons/ci";

export default function NavbarMobile() {
  const isConnected = false;
  return (
    <>
      <div className="md:hidden flex w-full space-x-8 justify-center fixed bottom-0">
        <PiWineThin size={28} />
        <PiHouseLineLight size={28} />
        <PiChartLineUpThin size={28} />
        {isConnected ? <CiLogout size={28} /> : <CiLogin size={28} />}
        <CiSettings size={28} />
      </div>
    </>
  )
}
