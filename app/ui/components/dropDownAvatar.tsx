import React from 'react';
import DisconnectButton from '../navbar/disconnectButton';
import Link from 'next/link';
import Avatar from './avatar';
import { handleDisconnect } from '@/app/lib/utils';

export default function DropDownAvatar() {
  return (
    <>
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost m-1">
          <Avatar />
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
        >
          <li>
            <Link href="/profile">Mon profil</Link>
          </li>
          <li>
            <span onClick={handleDisconnect}>Se déconnecter <DisconnectButton /></span>
          </li>
        </ul>
      </div>
    </>
  );
}
