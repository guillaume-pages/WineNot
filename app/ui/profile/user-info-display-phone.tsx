'use client';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

export default function UserInfoDisplayPhone() {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <>
      <div className="flex flex-col items-center pb-4 pt-6">
        <div className="avatar">
          <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
            <Image
              alt="Avatar"
              width={512}
              height={512}
              src="/images/Ellipse-6.png"
            />
          </div>
        </div>
        <h1 className='pt-4 text-2xl'>{user?.name}</h1>
      </div>
    </>
  );
}
