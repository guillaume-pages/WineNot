'use client';

import { useTransition, useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { UserContext } from '@/app/context/UserContext';
import { modifAvatar } from '@/app/lib/user/user.put.avatar';

import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';


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

const avatarChoices = [
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
];

export const ModifAvatar = () => {
  const [avatarIndex, setAvatarIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const { user, setUser } = useContext(UserContext);

  const handleChangingAvatar = async () => {
    try {
      setLoading(true);
      const userId = user?.user_id;
      if (!userId) {
        throw new Error('Utilisateur non authentifié');
      }

      const avatar = `Ellipse${avatarIndex + 1}`;
      await modifAvatar(userId, avatar);

      setUser({ ...user, image: avatar });

      toast.success('Avatar modifié avec succès');
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg">Changement d&apos;avatar</h2>

      {avatarChoices.map((avatar, index) => (
        <button
          key={index}
          onClick={() => setAvatarIndex(index)}
          className={`${
            avatarIndex === index ? 'border-green-500' : 'border-transparent'
          } rounded-3xl border-2 p-1`}
        >
          <Avatar>
            <AvatarImage src={avatar.src} />
          </Avatar>
        </button>
      ))}
      <div className="px-2">
        <Button
          onClick={handleChangingAvatar}
          disabled={loading}
          size="sm"
          variant="secondary"
        >
          Valider cette icone
        </Button>
      </div>
    </div>
  );
};
