'use client';

import { useState, useContext } from 'react';

import toast from 'react-hot-toast';

import { UserContext } from '@/app/context/UserContext';
import { deleteUser } from '@/app/lib/user/user.delete';
import { handleDisconnect } from '@/app/lib/utils';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export const DeleteAccount = () => {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const { user } = useContext(UserContext);

  const handleDeleteAccount = async () => {
    try {
      setLoading(true);
      await deleteUser(user?.user_id as string, password);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
      handleDisconnect();
    }
  }

  return (
    <div className="my-6 flex items-center justify-center">
        <Popover>
          <PopoverTrigger className="underline text-lg font-semibold">
            Supprimer votre compte
            </PopoverTrigger>
          <PopoverContent className='space-y-4'>
              <Label>Attention, cette action est irreversible, êtes vous sur de vouloir
              supprimer votre compte ? Entrez votre mot de passe pour valider la suppression</Label>
            <Input
              type="password"
              placeholder="Mot de passe pour confirmer"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              onClick={handleDeleteAccount}
              disabled={loading}
              size="sm"
              variant="destructive" 
            >
              Supprimer le compte
            </Button>
          </PopoverContent>
        </Popover>
    </div>
  );
};
