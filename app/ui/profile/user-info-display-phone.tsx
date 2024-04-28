'use client';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

export default function UserInfoDisplayPhone() {
  const { data } = useSession();
  const user = data?.user;
  console.log(user)

  return (
    <>
          <div className="flex justify-center pb-4 pt-6">
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
      </div>

    </>
  )
}