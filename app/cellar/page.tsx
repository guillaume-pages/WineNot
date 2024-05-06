'use client';

import Link from 'next/link';
import NoCellar from '../ui/cellar/no-cellar';
import { useSession } from 'next-auth/react';
import { createCellar } from '../lib/cellar/cellar.create';
import { useFormState } from 'react-dom';

export default function Cellar() {
  const { data: session } = useSession();
  const user = session?.user;
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createCellar, initialState);

  return (
    <>
      <form className="mt-4 flex flex-col items-center" action={dispatch}>
        <input
          type="text"
          placeholder="Nom de la cave"
          name="cellar_name"
          className="w-80 rounded-md border border-neutral-300 p-2"
        />
        <input 
          type="hidden"
          name="user_id"
          value={user && user.id}
        />
        <button className="mt-2 w-80 rounded-md bg-primary p-2 text-white">
          Créer une cave
        </button>
      </form>
      <div>{state.message && <p className="text-red-500">{state.message}</p>}</div>
    </>
  );
}
