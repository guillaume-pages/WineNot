import { Bottle } from '@/types/bottle.type';
import { formatDate } from '@/app/lib/utils';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import { PriceVisibilityDisplay } from './price-visibility-display';
import { DisplayWineType } from './display-wine-type';

export default function DisplayBottle({ bottle }: { bottle: Bottle }) {
  console.log('bottle', bottle);
  const {
    bottle_name,
    entry_date,
    global_visibility,
    millesime,
    quantity,
    region,
    size,
    type_of_wine,
    accompaniment,
    carafage,
    degree,
    eye_description,
    global_description,
    grape_varieties,
    media,
    mouth_description,
    nose_description,
    potential_date,
    price,
    price_visibility,
    temperature,
  } = bottle;

  return (
    <>
      {/* <div className="border">
        <h1>{bottle_name}</h1>
        <p>{millesime}</p>
        <p>{type_of_wine}</p>
        <p>{size}</p>
        <p>{degree}</p>
        <p>{grape_varieties}</p>
        <p>{region}</p>
        <p>{eye_description}</p>
        <p>{nose_description}</p>
        <p>{mouth_description}</p>
        <p>{carafage}</p>
        <p>{temperature}</p>
        <p>{accompaniment}</p>
        <p>{price}</p>
        <p>{price_visibility}</p>
        <p>{global_description}</p>
        <p>{formatDate(entry_date.toString())}</p>
        <p>{potential_date ? formatDate(potential_date?.toString()) : ''}</p>
        <p>{quantity}</p>
        <p>{global_visibility}</p>
        <p>{media}</p>
      </div> */}
      <div>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-left">
              {bottle_name} {millesime}
            </AccordionTrigger>
            <AccordionContent>
              <ul>
                <li>Type de vin : {type_of_wine}</li>
                <DisplayWineType typeOfWine={type_of_wine} />
                <li>Taille de la bouteille : {size}</li>
                <li>Degré d&apos;alcool : {degree}</li>
                <li>Cépaes : {grape_varieties}</li>
                <li>Région : {region}</li>
                <li>Description visuelle : {eye_description}</li>
                <li>Description olfactive : {nose_description}</li>
                <li>Description gustative {mouth_description}</li>
                <li>Service : carafage {carafage} min</li>
                <li>Service : température {temperature} °C</li>
                <li>Accompagnement : {accompaniment}</li>
                <li>Prix de la bouteille : {price}</li>
                <PriceVisibilityDisplay price_visibility={price_visibility} />
                <li>Description globale : {global_description}</li>
                <li>Date d&apos;entrée dans la cave : {formatDate(entry_date.toString())}</li>
                <li>
                  {potential_date ? `Date de potentiel de garde : ${formatDate(potential_date?.toString())}` : ''}
                </li>
                <li>Nombre de bouteille(s) : {quantity}</li>
                <li>Visibilité globale de la bouteille : {global_visibility}</li>
                <li>{media}</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
}
