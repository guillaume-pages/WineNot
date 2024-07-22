'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Bottle } from '@/types/bottle.type';
import termometer from '@/public/images/icons/termometer.png';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { DisplayWineType } from './display-wine-type';
import { InfoBlockOne } from './display-block-one';
import { InfoBlockTwo } from './display-block-two';
import { IoTrashOutline } from 'react-icons/io5';
import { Button } from '@/components/ui/button';
import { deleteBottle } from '@/app/lib/bottle/bottle.delete';

export default function DisplayBottle({ bottle, onDelete }: { bottle: Bottle, onDelete: (id: string) => void }) {
  const [showSecondBlock, setShowSecondBlock] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    await deleteBottle(bottle.bottle_id!);
    setLoading(false);
    onDelete(bottle.bottle_id!);
  };

  return (
    <div>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-left">
            {bottle.bottle_name} {bottle.millesime}, {bottle.region}
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex md:flex-row md:gap-4">
              {/* Informations générales */}
              <div className="mb-4 flex w-full space-x-3 md:mb-0">
                <div className="flex items-center">
                  <DisplayWineType typeOfWine={bottle.type_of_wine} />
                  <div className="ml-2">
                    <p>{bottle.degree} % d&apos;alcool</p>
                    <p>{bottle.price} €</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Image
                    src={termometer}
                    alt="termometer"
                    height={50}
                    width={50}
                  />
                  <div className="ml-2">
                    <p>Service : {bottle.temperature} °C</p>
                    <p>Carafage {bottle.carafage} min</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Button
                    variant="destructive"
                    size="littleIcon"
                    onClick={handleDelete}
                    disabled={loading}
                  >
                    <IoTrashOutline />
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-4 md:flex md:gap-4">
              <div
                className={`transition-all duration-300 ease-in-out md:w-1/2
                ${showSecondBlock ? 'hidden md:block' : 'block'}`}
              >
                <InfoBlockOne
                  bottle={bottle}
                  flipped={showSecondBlock}
                  flipFunction={setShowSecondBlock}
                />
              </div>

              <div
                className={`transition-all duration-300 ease-in-out md:w-1/2
                ${showSecondBlock ? 'block' : 'hidden md:block'}`}
              >
                <InfoBlockTwo
                  bottle={bottle}
                  flipped={showSecondBlock}
                  flipFunction={setShowSecondBlock}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
