import Image from 'next/image';

import { Bottle } from '@/types/bottle.type';

import accompaniement from '@/public/images/icons/accompaniement.png';
import cepages from '@/public/images/icons/cepages.png';
import eyes from '@/public/images/icons/eyes.png';
import mouth from '@/public/images/icons/mouth.png';
import nose from '@/public/images/icons/nose.png';
import flip from '@/public/images/icons/flip.png';

import { Badge } from '@/components/ui/badge';

import { DisplayMouth } from './display-mouth';

export const InfoBlockOne = ({
  bottle,
}: {
  bottle: Bottle;
}) => (
  <div className="space-y-3">
    <div className="flex items-center justify-between">
      <h2 className="text-base">Côté dégustation</h2>
    </div>
    <div className="flex space-x-3 max-w-xs">
      <Image src={eyes} alt="eyes icon" height={30} width={30} />
      <p>
        {bottle.eye_description && bottle.eye_description?.length > 1
          ? bottle.eye_description
          : 'Pas de description pour le visuel.'}
      </p>
    </div>
    <div className="flex space-x-3">
      <Image src={nose} alt="nose icon" height={30} width={30} />
      <div className="my-auto space-x-2">
        {bottle.nose_description && bottle.nose_description.length > 0 ? (
          bottle.nose_description.map((nose, index) => (
            <Badge className="h-6" key={index}>
              {nose}
            </Badge>
          ))
        ) : (
          <p>Pas de description pour le nez.</p>
        )}
      </div>
    </div>
    <div className="flex space-x-3">
      <div className="my-auto">
        <Image src={mouth} alt="mouth icon" height={30} width={30} />
      </div>
      <DisplayMouth mouthDescription={bottle.mouth_description} />
    </div>
    <div className="flex space-x-3">
      <Image
        src={accompaniement}
        alt="accompaniement icon"
        height={30}
        width={30}
      />
      <div className="my-auto space-x-2">
        {bottle.accompaniment && bottle.accompaniment.length > 0 ? (
          bottle.accompaniment.map((accompaniment, index) => (
            <Badge className="h-6" key={index}>
              {accompaniment}
            </Badge>
          ))
        ) : (
          <p>Pas d&apos;accompagnements renseignés.</p>
        )}
      </div>
    </div>
    <div className="flex space-x-3">
      <Image src={cepages} alt="cepages icon" height={30} width={30} />
      <div className="my-auto space-x-2">
        {bottle.grape_varieties && bottle.grape_varieties.length > 0 ? (
          bottle.grape_varieties.map((grape, index) => (
            <Badge className="h-6" key={index}>
              {grape}
            </Badge>
          ))
        ) : (
          <p>Pas de cépages renseignés.</p>
        )}
      </div>
    </div>
  </div>
);
