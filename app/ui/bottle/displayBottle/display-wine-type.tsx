import champagne from '@/public/images/bottles/champagne.png';
import redWine from '@/public/images/bottles/vin-rouge.png';
import whiteWine from '@/public/images/bottles/vin-blanc.png';
import roseWine from '@/public/images/bottles/vin-rosé.png';
import cremant from '@/public/images/bottles/cremant.png';
import other from '@/public/images/bottles/bouteille-autre.png';

import Image, { StaticImageData } from 'next/image';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

type DisplayWineTypeProps = {
  typeOfWine: string;
};

type WineTypeMapper = {
  [key: string]: StaticImageData;
};

const wineTypeMapper: WineTypeMapper = {
  Champagne: champagne,
  Rouge: redWine,
  Blanc: whiteWine,
  Rose: roseWine,
  Crémant: cremant,
  Autre: other,
};

export const DisplayWineType = ({ typeOfWine }: DisplayWineTypeProps) => {
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Image
              src={wineTypeMapper[typeOfWine]}
              alt={typeOfWine}
              width={50}
              height={50}
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>{typeOfWine}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
};
