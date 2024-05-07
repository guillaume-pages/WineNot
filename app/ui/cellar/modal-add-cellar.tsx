'use client';

import { useSession } from 'next-auth/react';
import { createCellar } from '@/app/lib/cellar/cellar.create';
import { useFormState } from 'react-dom';

export default function ModalAddCellar() {
  const { data: session } = useSession();
  const user = session?.user;
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createCellar, initialState);

  return (
    <>    
      <button
        className="btn"
        onClick={() => {
          const modal = document.getElementById('my_modal_3');
          if (modal instanceof HTMLDialogElement) {
            modal.showModal();
          }
        }}
      >
        Ajouter une cave
      </button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">
            Veuillez entre un nom pour votre cave (minimum 4 caractères)
          </h3>
          {/* <form method="dialog">
              <button className="btn">Close</button>
            </form> */}
          <form className="mt-4 flex flex-col items-center" action={dispatch}>
            <input
              type="text"
              placeholder="Nom de la cave"
              name="cellar_name"
              className="w-80 rounded-md border border-neutral-300 p-2"
            />
            {user && (
              <input type="hidden" name="user_id" value={user && user.id} />
            )}
            <button className="btn btn-primary mt-2 w-80 rounded-md bg-primary p-2">
              Créer une cave
            </button>
            <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div>
            {state.message && <p className="text-red-500">{state.message}</p>}
          </div>
        </div>
      </dialog>
    </>
  );
}
