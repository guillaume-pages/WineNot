import Link from 'next/link';
import React from 'react';
import { CiEdit } from 'react-icons/ci';
import { FiChevronRight } from 'react-icons/fi';
import { RiAccountCircleLine } from 'react-icons/ri';
import { RiLockPasswordLine } from 'react-icons/ri';
import { IoIosHelpCircleOutline } from 'react-icons/io';
import { HiOutlinePaintBrush } from 'react-icons/hi2';

export default function MenuDisplayPhone() {
  return (
    <>
      <div className="mx-auto grid w-5/6 grid-cols-3 grid-rows-4 gap-4 lg:w-3/5">
        {/* Ligne 1 - Modifier le profil */}
        <div className="col-span-2 row-start-1 flex items-center gap-2">
          <CiEdit className="text-2xl" />
          <h3 className="text-lg font-semibold">Modifier mon profil</h3>
        </div>
        <div className="col-start-3 row-start-1 flex items-center">
          <Link href="/profile/edit">
            <FiChevronRight className="text-base" />
          </Link>
        </div>
        {/* Ligne 2 - Modifier la sécurité du profil */}
        <div className="col-span-2 col-start-1 row-start-2 flex items-center gap-2">
          <RiLockPasswordLine className="text-2xl" />
          <h3 className="text-lg font-semibold">Securité</h3>
        </div>
        <div className="col-start-3 row-start-2 flex items-center gap-2">
          <Link href="/profile/security">
            <FiChevronRight className="text-base" />
          </Link>
        </div>
        {/* Ligne 3 - questions et réponses */}
        <div className="col-span-2 row-start-3 flex items-center gap-2">
          <IoIosHelpCircleOutline className="text-2xl" />
          <h3 className="text-lg font-semibold">Aide</h3>
        </div>
        <div className="col-start-3 row-start-3 flex items-center gap-2">
          <Link href="/profile/help">
            <FiChevronRight className="text-base" />
          </Link>
        </div>
        {/* Ligne 4 - préférences de thèmes */}
        <div className="col-span-2 row-start-4 flex items-center gap-2">
          <HiOutlinePaintBrush className="text-2xl" />
          <h3 className="text-lg font-semibold">Thèmes</h3>
        </div>
        <div className="col-start-3 row-start-4 flex items-center gap-2">
          <Link href="/profile/preferences">
            <FiChevronRight className="text-base" />
          </Link>
        </div>
      </div>
    </>
  );
}
