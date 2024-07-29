'use client';

import { useContext, useState } from 'react';

import toast from 'react-hot-toast';

import { UserContext } from '@/app/context/UserContext';
import { updatePhone } from '@/app/lib/user/user.put.phone';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const ModifPhone = () => {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);

  const handleUpdatePhone = async () => {
    try {
      setLoading(true);
      await updatePhone(user?.user_id as string, phone);
      toast.success('Téléphone mis à jour avec succès');
    } catch (error) {
      console.error('Erreur lors de la mise à jour du téléphone:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='space-y-4'>
      <h2 className="text-lg">Changer votre numéro de téléphone</h2>
      <div className="space-y-4 px-2">
        <Label>Modifier votre numéro de téléphone</Label>
        <Input
          type="tel"
          placeholder="Nouveau numéro de téléphone"
          onChange={(e) => setPhone(e.target.value)}
        />
        <Button
          variant="secondary"
          size="sm"
          onClick={handleUpdatePhone}
          disabled={loading}
        >
          Mettre à jour
        </Button>
      </div>
    </div>
  );
};