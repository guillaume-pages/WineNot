import { Bottle } from '@/types/bottle.type';
import { formatDate } from '@/app/lib/utils';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

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
            <AccordionTrigger>{bottle_name} {millesime}</AccordionTrigger>
            <AccordionContent>
              <ul>
                <li>{type_of_wine}</li>
                <li>{size}</li>
                <li>{degree}</li>
                <li>{grape_varieties}</li>
                <li>{region}</li>
                <li>{eye_description}</li>
                <li>{nose_description}</li>
                <li>{mouth_description}</li>
                <li>{carafage}</li>
                <li>{temperature}</li>
                <li>{accompaniment}</li>
                <li>{price}</li>
                <li>{price_visibility}</li>
                <li>{global_description}</li>
                <li>{formatDate(entry_date.toString())}</li>
                <li>
                  {potential_date ? formatDate(potential_date?.toString()) : ''}
                </li>
                <li>{quantity}</li>
                <li>{global_visibility}</li>
                <li>{media}</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
}
