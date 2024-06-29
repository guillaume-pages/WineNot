import { useContext } from 'react';

import { BottleContext } from '@/app/context/BottleContext';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export const BottlePrice = () => {
  const { bottlePrice, setBottlePrice, visibilityPrice, setVisibilityPrice } =
    useContext(BottleContext);

  return (
    <div className="flex flex-col">
      <div className="flex space-x-8">
        <div>
          <Label className="pb-4 pt-2" htmlFor="price">
            Prix
          </Label>
          <div className="w-20">
            <Input
              type="number"
              placeholder="eg: 10 €"
              value={bottlePrice}
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                setBottlePrice(isNaN(value) ? 10 : value);
              }}
              step="0.1"
              min="0"
              max="10000000"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <Label className="pb-4 pt-2" htmlFor="price">
            Visibilité du prix
          </Label>
          <div>
            <Button
              onClick={() => setVisibilityPrice(0)}
              variant={visibilityPrice === 0 ? 'primary' : 'secondary'}
              className="rounded-bl-sm rounded-tl-sm border-r-[1px] text-sm"
              size="little"
            >
              Pour soi
            </Button>
            <Button
              onClick={() => setVisibilityPrice(1)}
              variant={visibilityPrice === 1 ? 'primary' : 'secondary'}
              className="border-r-[1px] text-sm"
              size="little"
            >
              Amis
            </Button>
            <Button
              onClick={() => setVisibilityPrice(2)}
              variant={visibilityPrice === 2 ? 'primary' : 'secondary'}
              className="rounded-br-sm rounded-tr-sm  text-sm"
              size="little"
            >
              Public
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
