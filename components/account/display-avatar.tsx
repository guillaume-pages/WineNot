'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import NextImage from 'next/image';
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
import { UserContext } from '@/app/context/UserContext';
import { useContext, useEffect } from 'react';

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

export default function AvatarDisplay() {
  const { user } = useContext(UserContext);


  const avatar = user?.image;
  const avatarKey = user?.image && avatarMap[avatar as keyof typeof avatarMap] ? user.image : 'Ellipse1';
  const avatarImage = avatarMap[avatarKey as keyof typeof avatarMap];  
  const fallback = `${user?.firstname} ${user?.lastname}`;

  return (
    <Avatar>
      {avatarImage ? (
        <NextImage src={avatarImage} alt="Avatar" width={512} height={512} />
      ) : (
        <AvatarFallback>{fallback}</AvatarFallback>
      )}
    </Avatar>
  );
}
