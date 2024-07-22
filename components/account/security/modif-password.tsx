'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';

import toast from 'react-hot-toast';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

import { modifPassword } from '@/app/lib/user/user.put.password';

export const ModifPassword = () => {
  const { data: session } = useSession();

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleNewPassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas');
      return;
    }

    try {
      setLoading(true);

      const userId = session?.user?.id;
      if (!userId) {
        throw new Error('Utilisateur non authentifié');
      }

      await modifPassword(userId, oldPassword, newPassword);

      toast.success('Mot de passe modifié avec succès');
    } catch (error: any) {
      toast.error(
        error.message || 'Erreur lors de la modification du mot de passe',
      );
    } finally {
      setLoading(false);
    }
  };

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div>
      <div className="space-y-3">
        <h2 className="text-lg">Changement de mot de passe</h2>

        <div className="space-y-2 px-2">
          <Label htmlFor="oldPassword">Ancien mot de passe</Label>
          <div className="relative">
            <Input
              type={isPasswordVisible ? 'text' : 'password'}
              id="oldPassword"
              placeholder="Saisissez votre mot de passe actuel"
              className="Input Input-bordered w-full"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 px-3 py-2"
            >
              {isPasswordVisible ? <FaRegEyeSlash /> : <FaRegEye />}
            </button>
          </div>
        </div>
        <div className="space-y-2 px-2">
          <Label htmlFor="newPassword">Nouveau mot de passe</Label>
          <div className="relative">
            <Input
              type={isPasswordVisible ? 'text' : 'password'}
              placeholder="Saisissez votre nouveau mot de passe"
              className="Input Input-bordered w-full"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 px-3 py-2"
            >
              {isPasswordVisible ? <FaRegEyeSlash /> : <FaRegEye />}
            </button>
          </div>
        </div>

        <div className="space-y-2 px-2">
          <Label htmlFor="confirmPassword">
            Confirmer le nouveau mot de passe
          </Label>
          <div className="relative">
            <Input
              type={isPasswordVisible ? 'text' : 'password'}
              placeholder="Confirmez votre nouveau mot de passe"
              className="Input Input-bordered w-full"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 px-3 py-2"
            >
              {isPasswordVisible ? <FaRegEyeSlash /> : <FaRegEye />}
            </button>
          </div>
          <Button onClick={handleNewPassword} disabled={loading} size="sm">
            {loading ? 'Modification...' : 'Modifier le mot de passe'}
          </Button>
        </div>
      </div>
    </div>
  );
};
