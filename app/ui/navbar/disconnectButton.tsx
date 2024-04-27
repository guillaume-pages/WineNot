import { signOut } from  'next-auth/react';
import { CiLogout } from 'react-icons/ci';
import { handleDisconnect } from '@/app/lib/utils';

export default function DisconnectButton() {

  return (
    <>
      <div className='w-auto h-auto'>
        <CiLogout size={36} onClick={handleDisconnect} />
      </div>
    </>
  )
}
