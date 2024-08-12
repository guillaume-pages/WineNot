'use client';

import { useContext, useState } from 'react';

import Image from 'next/image';
import clsx from 'clsx';

import { RiAccountCircleLine } from 'react-icons/ri';

import DisconnectButton from '@/components/navbar/disconnect-button';

import { handleDisconnect } from '@/app/lib/utils';
import { UserContext } from '@/app/context/UserContext';

import Ellipse1 from '@/public/images/Ellipse-1.png';
import Ellipse2 from '@/public/images/Ellipse-2.png';
import Ellipse3 from '@/public/images/Ellipse-3.png';
import Ellipse4 from '@/public/images/Ellipse-4.png';
import Ellipse5 from '@/public/images/Ellipse-5.png';
import Ellipse6 from '@/public/images/Ellipse-6.png';
import Ellipse7 from '@/public/images/Ellipse-7.png';
import Ellipse8 from '@/public/images/Ellipse-8.png';
import Ellipse9 from '@/public/images/Ellipse-9.png';
import Ellipse10 from '@/public/images/Ellipse-10.png';

const avatarMap = {
  Ellipse1,
  Ellipse2,
  Ellipse3,
  Ellipse4,
  Ellipse5,
  Ellipse6,
  Ellipse7,
  Ellipse8,
  Ellipse9,
  Ellipse10,
};

export default function UserInfoDisplay({ component }: { component?: string }) {
  const { user } = useContext(UserContext);

  const avatar = user?.image;

  const avatarKey = user?.image && avatarMap[avatar as keyof typeof avatarMap] ? user.image : 'Ellipse1';
  const avatarImage = avatarMap[avatarKey as keyof typeof avatarMap];


  const fullName = `${user?.firstname} ${user?.lastname}`;

  return (
    <>
      <div className="flex flex-col items-center pt-6">
        <div className="avatar">
          <div
            className={clsx('rounded-full ring-2 ring-black dark:ring-white', {
              '': component === 'navbar',
              'w-40': component !== 'navbar',
            })}
          >
            {' '}
            <Image
              alt="Avatar"
              width={component === 'navbar' ? 40 : 512}
              height={component === 'navbar' ? 40 : 512}
              src={avatarImage}
            />
          </div>
        </div>
        {component === 'navbar' ? null : (
          <>
            <h1 className="pt-4 text-2xl">{fullName}</h1>
            <div className="flex items-center gap-2 pt-4">
              <h3 className="text-lg">Mon compte</h3>
              <RiAccountCircleLine className="text-2xl" />
            </div>
            <span onClick={handleDisconnect} className="flex items-center gap-1">
              Déconnexion <DisconnectButton />
            </span>
          </>
        )}
        {/* <h1 className="pt-4 text-2xl">{fullName}</h1>
        <div className="flex items-center gap-4 pt-4">
          <RiAccountCircleLine className="text-2xl" />
          <h3 className="text-lg font-semibold">Mon compte</h3>
        </div>
        <span onClick={handleDisconnect} className="flex items-center">
          Se déconnecter <DisconnectButton />
        </span> */}
      </div>
    </>
  );
}
