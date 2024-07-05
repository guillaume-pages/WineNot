import { Label } from '@/components/ui/label';
import clsx from 'clsx';
import React from 'react';

type PriceVisibilityDisplayProps = {
  price_visibility: number | undefined;
};

export const PriceVisibilityDisplay = ({ price_visibility }: PriceVisibilityDisplayProps) => {
  console.log('price_visibility', price_visibility);
  return (
    <div className="flex flex-col">
      <Label className="pb-2 pt-2" htmlFor="price">
        Visibilité du prix
      </Label>
      <div>
        <div
          className={clsx(
            'inline-flex h-5 items-center justify-center whitespace-nowrap rounded-none rounded-bl-sm rounded-tl-sm border-r-[1px] px-2 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
            {
              'bg-primary text-primary-foreground': price_visibility === 0,
              'bg-secondary text-secondary-foreground': price_visibility !== 0,
            },
          )}
        >
          Pour soi
        </div>
        <div
          className={clsx(
            'inline-flex h-5 items-center justify-center whitespace-nowrap border-r-[1px] px-2 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
            {
              'bg-primary text-primary-foreground': price_visibility === 1,
              'bg-secondary text-secondary-foreground': price_visibility !== 1,
            },
          )}
        >
          Amis
        </div>
        <div
          className={clsx(
            'inline-flex h-5 items-center justify-center whitespace-nowrap rounded-br-sm rounded-tr-sm px-2 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
            {
              'bg-primary text-primary-foreground': price_visibility === 2,
              'bg-secondary text-secondary-foreground': price_visibility !== 2,
            },
          )}
        >
          Public
        </div>
      </div>
    </div>
  );
};
