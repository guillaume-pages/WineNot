import Image from 'next/image';

import { Bottle } from '@/types/bottle.type';

import { formatDate } from '@/app/lib/utils';

import bottleSize from '@/public/images/icons/bottle-size.png';
import calendar from '@/public/images/icons/calendar.png';
import quantity from '@/public/images/icons/quantity.png';
import flip from '@/public/images/icons/flip.png';

import { ConfidentialityDisplay } from './ConfidentialityDisplay';

export const InfoBlockTwo = ({
  bottle,
  flipped,
  flipFunction,
}: {
  bottle: Bottle;
  flipped: boolean;
  flipFunction: Function;
}) => (
  <div className="space-y-3">
    <div className="flex items-center justify-between">
      <h2 className="text-base">Côté cave</h2>
      <div className="md:hidden">
        <button
          type="button"
          onClick={() => flipFunction(!flipped)}
          className="rounded-full p-2 transition-transform duration-300 ease-in-out"
        >
          <Image
            src={flip}
            alt="flip icon"
            height={25}
            width={25}
            className={`transform transition-transform duration-300 ease-in-out 
          ${flipped ? 'rotate-180' : '-rotate-180'}`}
          />
        </button>
      </div>
    </div>
    <div className="flex space-x-3">
      <Image src={calendar} alt="calendar icon" height={30} width={30} />
      <div>
        <p>Date d&apos;entrée : {formatDate(bottle.entry_date.toString())}</p>
        <p>
          {bottle.potential_date
            ? `Potentiel de garde : ${formatDate(
                bottle.potential_date?.toString(),
              )}`
            : ''}
        </p>
      </div>
    </div>
    <div className="flex space-x-3">
      <Image src={bottleSize} alt="bottle size icon" height={30} width={30} />
      <p className="my-auto">{bottle.size}</p>
    </div>
    <div className="flex space-x-3">
      <Image src={quantity} alt="quantity icon" height={30} width={30} />
      <p className="my-auto">Quantité : {bottle.quantity}</p>
    </div>
    <div className="pl-4">
      <ConfidentialityDisplay
        text="Confidentialité du prix"
        visibility={bottle.price_visibility}
      />
      <ConfidentialityDisplay
        text="Confidentialité de la bouteille"
        visibility={bottle.global_visibility}
      />
    </div>
    <div className="space-y-2 pl-4">
      <h2>Description globale</h2>
      <p>Description globale : {bottle.global_description}</p>
    </div>
    <div>
      <p>{bottle.media ? bottle.media : ''}</p>
    </div>
  </div>
);
