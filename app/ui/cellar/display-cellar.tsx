'use client';
import { useState, useEffect } from 'react';
import type { Cellar } from '@/types/cellar.type';
import DisplayBottle from '../bottle/displayBottle/display-bottle';

export default function DisplayCellar({ cellar }: { cellar: Cellar }) {
  // const bottles = cellar.cellars.bottles || [];
  const [bottles, setBottles] = useState(cellar.cellars.bottles || []);
  console.log('cellar', cellar);
  console.log('bottles', bottles);

  useEffect(() => {
    setBottles(cellar.cellars.bottles || []);
  }, [cellar]);

  const handleDelete = (id: string) => {
    setBottles(bottles.filter(bottle => bottle.bottle_id !== id));
  };


  return (
    <div>
      {bottles.length > 0 ? (
        bottles.map((bottle) => (
          <DisplayBottle key={bottle.bottle_id} bottle={bottle} onDelete={handleDelete}/>
        ))
      ) : (
        <div>Aucune bouteille dans cette cave</div>
      )}
    </div>
  );
}
