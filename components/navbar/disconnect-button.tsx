import { handleDisconnect } from '@/app/lib/utils';
import { CgLogOff } from "react-icons/cg";


export default function DisconnectButton() {

  return (
    <>
      <div className='w-auto h-auto'>
        <CgLogOff size={24} onClick={handleDisconnect} />
      </div>
    </>
  )
}
