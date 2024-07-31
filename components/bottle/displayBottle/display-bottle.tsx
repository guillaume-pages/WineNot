'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';

import { Bottle } from '@/types/bottle.type';
import { deleteBottle } from '@/app/lib/bottle/bottle.delete';

import { DisplayWineType } from './display-wine-type';
import { InfoBlockOne } from './display-block-one';
import { InfoBlockTwo } from './display-block-two';
import termometer from '@/public/images/icons/termometer.png';
import { IoTrashOutline } from 'react-icons/io5';
import { MdOutlineDriveFileRenameOutline } from 'react-icons/md';

import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { set } from 'lodash';

export default function DisplayBottle({
  bottle,
  onDelete,
}: {
  bottle: Bottle;
  onDelete: (id: string) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteBottle(bottle.bottle_id!);
      onDelete(bottle.bottle_id!);
      toast.success('Bouteille supprimée avec succès');
      setIsPopoverOpen(false);
    } catch (error) {
      toast.error(
        'Une erreur est survénue lors de la suppression de la bouteille',
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsPopoverOpen(false);
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
                <div className="flex flex-col items-center space-y-2">
                  <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                    <PopoverTrigger>
                      <Button
                        variant="secondary"
                        size="littleIcon"
                        onClick={() => setIsPopoverOpen(true)}
                      >
                        <IoTrashOutline />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <h3 className="pb-3 text-center text-base font-bold">
                        Êtes-vous sûr de vouloir supprimer cette cave ?
                      </h3>
                      <div className="flex justify-center space-x-4">
                        <Button
                          variant="destructive"
                          onClick={handleDelete}
                          disabled={loading}
                          size="sm"
                        >
                          Oui
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={handleCancel}
                        >
                          Non
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                  <Button
                    variant="secondary"
                    size="littleIcon"
                    disabled={loading}
                  >
                    <Link href={`/cellar/edit/${bottle.bottle_id}`}>
                      <MdOutlineDriveFileRenameOutline />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-4 md:flex md:gap-4">
              <Tabs defaultValue="degustation" className="w-auto">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="degustation">
                    Côté dégustation
                  </TabsTrigger>
                  <TabsTrigger value="cave">Côté cave</TabsTrigger>
                </TabsList>
                <TabsContent value="degustation">
                  <InfoBlockOne bottle={bottle} />
                </TabsContent>
                <TabsContent value="cave">
                  <InfoBlockTwo bottle={bottle} />
                </TabsContent>
              </Tabs>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
