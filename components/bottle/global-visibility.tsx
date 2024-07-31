import { useContext } from 'react';

import { BottleContext } from '@/app/context/BottleContext';

import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export const GlobalVisibility = () => {
  const { globalVisibility, setGlobalVisibility } = useContext(BottleContext);

  return (
    <div className="flex flex-col">
      <Label className="pb-4 pt-2" htmlFor="price">
        Visibilité la bouteille
      </Label>
      <div>
        <Button
          onClick={() => setGlobalVisibility(0)}
          variant={globalVisibility === 0 ? 'primary' : 'secondary'}
          className="rounded-bl-sm rounded-tl-sm border-r-[1px] text-sm"
          size="little"
        >
          Pour soi
        </Button>
        <Button
          onClick={() => setGlobalVisibility(1)}
          variant={globalVisibility === 1 ? 'primary' : 'secondary'}
          className="border-r-[1px] text-sm"
          size="little"
        >
          Amis
        </Button>
        <Button
          onClick={() => setGlobalVisibility(2)}
          variant={globalVisibility === 2 ? 'primary' : 'secondary'}
          className="rounded-br-sm rounded-tr-sm  text-sm"
          size="little"
        >
          Public
        </Button>
      </div>
    </div>
  );
};
