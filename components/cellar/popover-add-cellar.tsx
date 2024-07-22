'use client';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import { createCellar } from '@/app/lib/cellar/cellar.create';
import { useFormState } from 'react-dom';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const notifySucces = (msg: string) =>
  toast.success(msg, {
    duration: 4000,
    position: 'top-right',
  });

const notifyError = (msg: string) =>
  toast.error(msg, {
    duration: 4000,
    position: 'top-right',
  });

export default function ModalAddCellar() {
  const { data: session } = useSession();
  const user = session?.user;
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createCellar, initialState);

  useEffect(() => {
    if (state.message) {
      let msg = state.message;
      if (msg.includes('succès')) {
        notifySucces(msg);
      } else {
        notifyError(msg);
      }
    }
  }, [state.message]);

  return (
    <>
      <Toaster />
      <Popover>
        <PopoverTrigger>Ajouter une cave</PopoverTrigger>
        <PopoverContent>
          <h3 className="text-base font-bold text-center">
            Veuillez entrer un nom pour votre cave <span className='text-sm'>(minimum 4 caractères)</span>
          </h3>
          <form className="mt-4 flex flex-col items-center" action={dispatch}>
            <Input
              type="text"
              placeholder="Nom de la cave"
              name="cellar_name"
              className="w-64 rounded-md border p-2"
            />
            {user && (
              <Input type="hidden" name="user_id" value={user && user.id} />
            )}
            <Button variant="default" className="mt-2 w-64 rounded-md p-2">
              Créer une cave
            </Button>
          </form>
        </PopoverContent>
      </Popover>
    </>
  );
}
