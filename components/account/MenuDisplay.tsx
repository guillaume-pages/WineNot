import React from 'react';
import { CiEdit } from 'react-icons/ci';
import { RiLockPasswordLine } from 'react-icons/ri';
import { IoIosHelpCircleOutline } from 'react-icons/io';
import { HiOutlinePaintBrush } from 'react-icons/hi2';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import { BoxChoosingTheme } from '@/components/boxChoosingTheme';
import { Security } from '@/components/account/security/security';
import { Profile } from '@/components/account/profile/profile';

export default function MenuDisplay() {
  return (
    <>
      <div className="px-4 pb-6">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-left">
              <div className="flex space-x-2 no-underline">
                <HiOutlinePaintBrush className="text-2xl" />
                <h3 className="text-lg font-semibold ">Thèmes</h3>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex items-center space-x-2">
                <p>Choisissez le thème de l&apos;application : </p>
                <BoxChoosingTheme />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-left">
              <div className="flex space-x-2 no-underline">
                <CiEdit className="text-2xl" />
                <h3 className="text-lg font-semibold">Modifier mon profil</h3>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <Profile />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-left">
              <div className="flex space-x-2 no-underline">
                <RiLockPasswordLine className="text-2xl" />
                <h3 className="text-lg font-semibold">Securité</h3>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <Security />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-left">
              <div className="flex space-x-2 no-underline">
                <IoIosHelpCircleOutline className="text-2xl" />
                <h3 className="text-lg font-semibold">Aide</h3>
              </div>
            </AccordionTrigger>
            <AccordionContent></AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
}
