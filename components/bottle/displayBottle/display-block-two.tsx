import Image from 'next/image';

import { Bottle } from '@/types/bottle.type';

import { formatDate } from '@/app/lib/utils';

import bottleSize from '@/public/images/icons/bottle-size.png';
import calendar from '@/public/images/icons/calendar.png';
import quantity from '@/public/images/icons/quantity.png';

import { ConfidentialityDisplay } from './confidentiality-display';

export const InfoBlockTwo = ({ bottle }: { bottle: Bottle }) => (
  <div className="space-y-3">
    <div className="flex items-center justify-between">
      <h2 className="text-base">Côté cave</h2>
    </div>
    <div className="flex space-x-3">
      <Image src={calendar} alt="calendar icon" height={30} width={30} />
      <div>
        <p>Date d&apos;entrée : {formatDate(bottle.entry_date.toString())}</p>{' '}
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
    {/* <div className="pl-4">
      <ConfidentialityDisplay
        text="Confidentialité du prix"
        visibility={bottle.price_visibility}
      />
      <ConfidentialityDisplay
        text="Confidentialité de la bouteille"
        visibility={bottle.global_visibility}
      />
    </div> */}
    <div className="space-y-2 pl-4">
      {bottle.global_description && bottle.global_description?.length > 1 ? (
        <p>Description globale : {bottle.global_description}</p>
      ) : (
        ''
      )}
    </div>
    <div>
      <p>{bottle.media ? bottle.media : ''}</p>
    </div>
  </div>
);
