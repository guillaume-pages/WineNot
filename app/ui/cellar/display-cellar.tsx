import type { Cellar } from '@/types/cellar.type';
import DisplayBottle from '../bottle/display-bottle';

export default function DisplayCellar({ cellar }: { cellar: Cellar }) {
  return (
    <div>
      <div>
        <p>user_cellar_id : {cellar.user_cellar_id}</p>
        <p>user_id : {cellar.user_id}</p>
        <p>cellar_id : {cellar.cellars.cellar_id}</p>
        <p>cellar_name : {cellar.cellars.cellar_name}</p>
        <p>created_at : {cellar.cellars.created_at.toISOString()}</p>
        <p>updated_at : {cellar.cellars.updated_at?.toISOString()}</p>
        <p>deleted_at : {cellar.cellars.deleted_at?.toISOString()}</p>
        <p>bottles : {cellar.cellars.bottles.map((b, i) => <p key={i}>{b}</p>)}</p>
        {cellar.cellars.bottles.length > 0 ? <div><DisplayBottle /></div> : <div>Vous n&apos;avez pas encore de bouteilles</div> }
      </div>
    </div>
  );
}
