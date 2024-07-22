'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';

import toast from 'react-hot-toast';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { modifMail } from '@/app/lib/user/user.mail';

export const ModifMail = () => {
  const { data: session } = useSession();

  const [oldMail, setOldMail] = useState('');
  const [newMail, setNewMail] = useState('');
  const [confirmMail, setConfirmMail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleNewMail = async () => {
    if (newMail !== confirmMail) {
      toast.error('Les mails ne correspondent pas');
      return;
    }

    try {
      setLoading(true);

      const userId = session?.user?.id;
      if (!userId) {
        throw new Error('Utilisateur non authentifié');
      }

      await modifMail(userId, oldMail, newMail);

      toast.success('Mail modifié avec succès');
    } catch (error: any) {
      toast.error(
        error.message || 'Erreur lors de la modification du mail',
      );
    } finally {
      setLoading(false);
    }
  };

  const [isMailVisible, setIsMailVisible] = useState(false);
  const toggleMailVisibility = () => {
    setIsMailVisible(!isMailVisible);
  };

  return (
    <div>
      <div className="space-y-4">
        <h2 className="text-lg">Changement de mail</h2>

        <div className="px-2 space-y-2">
        <Label htmlFor="oldMail">Mail actuel</Label>
          <Input
            type="email"
            id="oldMails"
            placeholder="Saisissez votre mail actuel"
            className="Input Input-bordered w-full"
            value={oldMail}
            onChange={(e) => setOldMail(e.target.value)}
          />
        </div>
        <div className="px-2 space-y-2">
        <Label htmlFor="newMail">Nouveau mail</Label>
          <Input
            type="email"
            placeholder="Saisissez votre nouveau mail"
            className="Input Input-bordered w-full"
            id="newMail"
            value={newMail}
            onChange={(e) => setNewMail(e.target.value)}
          />
        </div>

        <div className="px-2 space-y-2">
        <Label htmlFor="confirmMail">Confirmer le nouveau mail</Label>
          <Input
            type="email"
            placeholder="Confirmez votre nouveau mail"
            className="Input Input-bordered w-full"
            id="confirmMail"
            value={confirmMail}
            onChange={(e) => setConfirmMail(e.target.value)}
          />
        <Button onClick={handleNewMail} disabled={loading}>
          {loading ? 'Modification...' : 'Modifier le mail'}
        </Button>
        </div>
      </div>
    </div>
  );
};
