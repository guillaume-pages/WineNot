import type { Cellar } from '@/types/cellar.type';
import DisplayBottle from '../bottle/display-bottle';
import { formatDate } from '@/app/lib/utils';
import { map } from 'lodash';

export default function DisplayCellar({ cellar }: { cellar: Cellar }) {
  console.log('cellar', cellar);
  console.log('cellar.cellars =================', cellar.cellars);
  console.log(
    'cellar.cellars.bottles =================',
    cellar.cellars.bottles,
  );
  const bottles = cellar.cellars.bottles || [];
  console.log('bottles', bottles)
  return (
    <div>
      <span>
        Cave créé le{' '}
        {cellar?.cellars?.created_at
          ? formatDate(cellar.cellars.created_at.toString())
          : ''}
      </span>
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
