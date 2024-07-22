'use client';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { RiAccountCircleLine } from 'react-icons/ri';
import { handleDisconnect } from '@/app/lib/utils';
import DisconnectButton from '../navbar/disconnect-button';

export default function UserInfoDisplayPhone() {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <>
      <div className="flex flex-col items-center pb-4 pt-6">
        <div className="avatar">
          <div className="w-24 rounded-full ring-2 ring-black dark:ring-white">
            <Image
              alt="Avatar"
              width={512}
              height={512}
              src="/images/Ellipse-1.png"
            />
          </div>
        </div>
        <h1 className="pt-4 text-2xl">{user?.name}</h1>
        <div className="flex items-center gap-4 pt-4">
          <RiAccountCircleLine className="text-2xl" />
          <h3 className="text-lg font-semibold">Mon compte</h3>
        </div>
        <span onClick={handleDisconnect} className="flex items-center">
          Se déconnecter <DisconnectButton />
        </span>
      </div>
    </>
  );
}
