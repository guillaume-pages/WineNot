// 'use client';

// import { useState } from 'react';

// import Image from 'next/image';

// import { Bottle } from '@/types/bottle.type';

// import flip from '@/public/images/icons/flip.png';
// import termometer from '@/public/images/icons/termometer.png';

// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from '@/components/ui/accordion';

// import { DisplayWineType } from './display-wine-type';

// import { InfoBlockOne } from './display-block-one';
// import { InfoBlockTwo } from './display-block-two';

// export default function DisplayBottle({ bottle }: { bottle: Bottle }) {
//   const [showSecondBlock, setShowSecondBlock] = useState(false);

//   return (
//     <div>
//       <Accordion type="single" collapsible className="w-full">
//         <AccordionItem value="item-1">
//           <AccordionTrigger className="text-left">
//             {bottle.bottle_name} {bottle.millesime}, {bottle.region}
//           </AccordionTrigger>
//           <AccordionContent>
//             <div className="md:flex md:gap-4">
//               <div className="flex md:w-1/2">
//                 <div className="flex text-xs md:text-base">
//                   <div className="flex">
//                     <DisplayWineType typeOfWine={bottle.type_of_wine} />
//                     <div>
//                       <p>{bottle.degree} % d&apos;alcool</p>
//                       <p>{bottle.price} €</p>
//                     </div>
//                   </div>
//                   <div className="flex">
//                     <Image
//                       src={termometer}
//                       alt="termometer"
//                       height={50}
//                       width={50}
//                     />
//                     <div>
//                       <p>Service : {bottle.temperature} °C</p>
//                       <p>Carafage {bottle.carafage} min</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div
//                 className={`mt-2  transition-all duration-300 ease-in-out md:block md:h-auto md:opacity-100
//               ${
//                 showSecondBlock
//                   ? 'h-0 overflow-hidden opacity-0'
//                   : 'opacity-100'
//               }`}
//               >
//                 <InfoBlockOne bottle={bottle} flipped={showSecondBlock} flipFunction={setShowSecondBlock}/>
//               </div>
//               <div className="md:w-1/2">
//                 <div
//                   className={`mt-2 transition-all duration-300 ease-in-out md:block md:h-auto md:opacity-100
//               ${
//                 showSecondBlock
//                   ? 'opacity-100'
//                   : 'h-0 overflow-hidden opacity-0'
//               }`}
//                 >
//                   <InfoBlockTwo bottle={bottle} flipped={showSecondBlock} flipFunction={setShowSecondBlock} />
//                 </div>
//               </div>
//             </div>
//           </AccordionContent>
//         </AccordionItem>
//       </Accordion>
//     </div>
//   );
// }
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Bottle } from '@/types/bottle.type';
import termometer from '@/public/images/icons/termometer.png';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { DisplayWineType } from './display-wine-type';
import { InfoBlockOne } from './display-block-one';
import { InfoBlockTwo } from './display-block-two';

export default function DisplayBottle({ bottle }: { bottle: Bottle }) {
  const [showSecondBlock, setShowSecondBlock] = useState(false);

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
              <div className="w-full mb-4 md:mb-0 flex">
                <div className="flex items-center">
                  <DisplayWineType typeOfWine={bottle.type_of_wine} />
                  <div className="ml-2">
                    <p>{bottle.degree} % d&apos;alcool</p>
                    <p>{bottle.price} €</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Image src={termometer} alt="termometer" height={50} width={50} />
                  <div className="ml-2">
                    <p>Service : {bottle.temperature} °C</p>
                    <p>Carafage {bottle.carafage} min</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 md:flex md:gap-4">
              <div className={`md:w-1/2 transition-all duration-300 ease-in-out
                ${showSecondBlock ? 'hidden md:block' : 'block'}`}>
                <InfoBlockOne 
                  bottle={bottle} 
                  flipped={showSecondBlock} 
                  flipFunction={setShowSecondBlock}
                />
              </div>
              
              <div className={`md:w-1/2 transition-all duration-300 ease-in-out
                ${showSecondBlock ? 'block' : 'hidden md:block'}`}>
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