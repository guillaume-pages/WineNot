'use client';

import { useParams } from 'next/navigation';

export default function AddBottle() {
  const params = useParams<{ id: string }>();
  const cellarId = params.id;
  console.log("cellarId :", cellarId);
  return (
    <>
      <h1 className='text-2xl font-bold text-center pt-4'>Création d&apos;une bouteille</h1>
      <div className='flex justify-center pb-14'>
        <div className='w-1/2'>
          <form className='flex flex-col space-y-4'>
            <div className='flex flex-col'>
              <label htmlFor='bottle_name'>Nom de la bouteille</label>
              <input
                type='text'
                id='bottle_name'
                name='bottle_name'
                placeholder='Nom de la bouteille'
                className='border border-gray-300 rounded-md p-2'
              />
            </div>
            <div className='flex flex-col'>
              <label htmlFor='millesime'>Millésime</label>
              <input
                type='number'
                id='millesime'
                name='millesime'
                placeholder='Millésime'
                className='border border-gray-300 rounded-md p-2'
              />
            </div>
            <div className='flex flex-col'>
              <label htmlFor='size'>Taille</label>
              <input
                type='text'
                id='size'
                name='size'
                placeholder='Taille'
                className='border border-gray-300 rounded-md p-2'
              />
            </div>
            <div className='flex flex-col'>
              <label htmlFor='grape_varieties'>Cépages</label>
              <input
                type='text'
                id='grape_varieties'
                name='grape_varieties'
                placeholder='Cépages'
                className='border border-gray-300 rounded-md p-2'
              />
            </div>
            <div className='flex flex-col'>
              <label htmlFor='region'>Région</label>
              <input
                type='text'
                id='region'
                name='region'
                placeholder='Région'
                className='border border-gray-300 rounded-md p-2'
              />
            </div>
            <div className='flex flex-col'>
              <label htmlFor='eye_description'>Description visuelle</label>
              <input
                type='text'
                id='eye_description'
                name='eye_description'
                placeholder='Description visuelle'
                className='border border-gray-300 rounded-md p-2'
              />
            </div>
            <div className='flex flex-col'>
              <label htmlFor='nose_description'>Description olfactive</label>
              <input
                type='text'
                id='nose_description'
                name='nose_description'
                placeholder='Description olfactive'
                className='border border-gray-300 rounded-md p-2'
              />
            </div>
            <div className='flex flex-col'>
              <label htmlFor='mouth_description'>Description gustative</label>
              <input
                type='text'
                id='mouth_description'
                name='mouth_description'
                placeholder='Description gustative'
                className='border border-gray-300 rounded-md p-2'
              />
            </div>
            <div className='flex flex-col'>
              <label htmlFor='carafage'>Carafage</label>
              <input
                type='number'
                id='carafage'
                name='carafage'
                placeholder='Carafage'
                className='border border-gray-300 rounded-md p-2'
              />
            </div>
            <div className='flex flex-col'>
              <label htmlFor='temperature'>Température</label>
              <input
                type='number'
                id='temperature'
                name='temperature'
                placeholder='Température'
                className='border border-gray-300 rounded-md p-2'
              />
            </div>
            <div className='flex flex-col'>
              <label htmlFor='degree'>Degré</label>
              <input
                type='number'
                id='degree'
                name='degree'
                placeholder='Degré'
                className='border border-gray-300 rounded-md p-2'
              />
            </div>
            <div className='flex flex-col'>
              <label htmlFor='accompaniment'>Accompagnement</label>
              <input
                type='text'
                id='accompaniment'
                name='accompaniment'
                placeholder='Accompagnement'
                className='border border-gray-300 rounded-md p-2'
              />
            </div>
            <div className='flex flex-col'>
              <label htmlFor='media'>Média</label>
              <input
                type='text'
                id='media'
                name='media'
                placeholder='Média'
                className='border border-gray-300 rounded-md p-2'
              />
            </div>
            <div className='flex flex-col'>
              <label htmlFor='price'>Prix</label>
              <input
                type='number'
                id='price'
                name='price'
                placeholder='Prix'
                className='border border-gray-300 rounded-md p-2'
              />
            </div>
            <div className='flex flex-col'>
              <label htmlFor='price_visibility'>Visibilité du prix</label>
              <input
                type='number'
                id='price_visibility'
                name='price_visibility'
                placeholder='Visibilité du prix'
                className='border border-gray-300 rounded-md p-2'
              />
            </div>
            <div className='flex flex-col'>
              <label htmlFor='global_description'>Description globale</label>
              <input
                type='text'
                id='global_description'
                name='global_description'
                placeholder='Description globale'
                className='border border-gray-300 rounded-md p-2'
              />
            </div>
            <div className='flex flex-col'>
              <label htmlFor='entry_date'>Date d&apos;entrée</label>
              <input
                type='date'
                id='entry_date'
                name='entry_date'
                placeholder='Date d&apos;entrée'
                className='border border-gray-300 rounded-md p-2'
              />
            </div>
            <div className='flex flex-col'>
              <label htmlFor='potential_date'>Date de consommation</label>
              <input
                type='date'
                id='potential_date'
                name='potential_date'
                placeholder='Date de consommation'
                className='border border-gray-300 rounded-md p-2'
              />
            </div>
            <div className='flex flex-col'>
              <label htmlFor='quantity'>Quantité</label>
              <input
                type='number'
                id='quantity'
                name='quantity'
                placeholder='Quantité'
                className='border border-gray-300 rounded-md p-2'
              />
            </div>
            <div className='flex justify-center'>
              <button
                type='submit'
                className='bg-blue-500 text-white rounded-md p-2'
              >
                Ajouter
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
