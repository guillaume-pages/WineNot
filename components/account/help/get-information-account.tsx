'use client';

import { useContext, useState } from 'react';

import { UserContext } from '@/app/context/UserContext';
import { getUserInformation } from '@/app/lib/user/user.getjson';
import { downloadJSON } from '@/app/lib/utils';

import { Button } from '@/components/ui/button';

export const GetInformationAccount = () => {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const handleGetInformation = async () => {
    try {
      setLoading(true);
      const informations = await getUserInformation(user?.user_id as string);
      downloadJSON(informations, 'informations_personnelles.json');
    } catch (error) {
      console.error('Erreur lors de la récupération des informations:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg">Télécharger les informations de votre compte</h2>
      <Button
        variant="secondary"
        size="sm"
        onClick={handleGetInformation}
        disabled={loading}
      >
        Obtenir mes informations
      </Button>
    </div>
  );
};
