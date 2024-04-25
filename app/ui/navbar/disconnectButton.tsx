import { signOut } from  'next-auth/react';
import { CiLogout } from 'react-icons/ci';

export default function disconnectButton() {

  const handleDisconnect = async () => {
    await signOut();
  }

  return (
    <>
      <CiLogout size={36} onClick={handleDisconnect} />
    </>
  )
}
