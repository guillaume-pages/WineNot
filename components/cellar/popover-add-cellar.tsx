'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';

import { createCellar } from '@/app/lib/cellar/cellar.create';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function ModalAddCellar() {
  const [loading, setLoading] = useState(false);
  const [cellarName, setCellarName] = useState('');
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const { data: session } = useSession();
  const user = session?.user;

  const handleCreateCellar = async () => {
    const userId = user?.id;
    try {
      setLoading(true);
      const response = await createCellar(cellarName, userId as string);
      toast.success(response.message);
      setIsPopoverOpen(false);
    } catch (error) {
      toast.error('Erreur lors de la création de la cave. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger>Ajouter une cave</PopoverTrigger>
        <PopoverContent>
          <h3 className="pb-3 text-center text-base font-bold">
            Veuillez entrer un nom pour votre cave{' '}
            <span className="text-sm">(minimum 4 caractères)</span>
          </h3>
          <Input
            type="text"
            placeholder="Nom de la cave"
            name="cellar_name"
            className="w-64 rounded-md border p-2"
            onChange={(e) => setCellarName(e.target.value)}
          />
          <Button
            variant="default"
            className="mt-2 w-64 rounded-md p-2"
            onClick={handleCreateCellar}
            disabled={loading}
          >
            Créer une cave
          </Button>
        </PopoverContent>
      </Popover>
    </>
  );
}
