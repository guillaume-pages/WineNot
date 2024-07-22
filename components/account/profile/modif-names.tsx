'use client';

import { useState, useContext, useEffect } from 'react';
import { useSession } from 'next-auth/react';

import toast from 'react-hot-toast';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { UserContext } from '@/app/context/UserContext';

import { modifNames } from '@/app/lib/user/user.put.name';

export const ModifNames = () => {
  
  const { data: session } = useSession();
  const user = useContext(UserContext);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      return;
    }
    setFirstName(user.firstname ?? '');
    setLastName(user.lastname ?? '');
  }, [user]);

  const handleNewNames = async () => {
    try {
      setLoading(true);

      const userId = session?.user?.id;
      if (!userId) {
        throw new Error('Utilisateur non authentifié');
      }

      await modifNames(userId, firstName, lastName);

      toast.success('Noms modifié avec succès');
    } catch (error: any) {
      toast.error(
        error.message || 'Erreur lors de la modification des noms',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="space-y-4">
        <h2 className="text-lg">Changement de noms</h2>

        <div className="px-2 space-y-2">
        <Label htmlFor="oldMail">Remplacez votre prénom</Label>
          <Input
            type="text"
            id="firstName"
            placeholder="Saisissez votre nouveau prénom"
            className="Input Input-bordered w-full"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="px-2 space-y-2">
        <Label htmlFor="newMail">Remplacez votre nom</Label>
          <Input
            type="text"
            placeholder="Saisissez votre nouveau nom"
            className="Input Input-bordered w-full"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        <Button onClick={handleNewNames} disabled={loading} size="sm">
          {loading ? 'Modification...' : 'Modifier vos noms'}
        </Button>
        </div>
      </div>
    </div>
  );
};
