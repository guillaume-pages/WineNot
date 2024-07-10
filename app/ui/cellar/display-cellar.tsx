import type { Cellar } from '@/types/cellar.type';
import DisplayBottle from '../bottle/displayBottle/display-bottle';
import { formatDate } from '@/app/lib/utils';
import { map } from 'lodash';

export default function DisplayCellar({ cellar }: { cellar: Cellar }) {
  const bottles = cellar.cellars.bottles || [];
  return (
    <div>
      {bottles.length > 0 ? (
        bottles.map((bottle) => (
          <DisplayBottle key={bottle.id} bottle={bottle} />
        ))
      ) : (
        <div>Aucune bouteille dans cette cave</div>
      )}
    </div>
  );
}
