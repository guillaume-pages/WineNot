import { useContext } from 'react';

import { BottleContext } from '@/app/context/BottleContext';

import { FormSlider } from '@/app/ui/bottle/form-slider';
import { SelectTypeWine } from '@/app/ui/bottle/select-type-wine';
import { SelectSizeWine } from '@/app/ui/bottle/select-size-wine';
import { AddGrapeVarieties } from '@/app/ui/bottle/add-grape-varieties';
import { AddNoseDescription } from '@/app/ui/bottle/nose-description';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Service } from '@/app/ui/bottle/service';
import { Accompaniment } from '@/app/ui/bottle/accompaniment';
import { BottlePrice } from '@/app/ui/bottle/bottle-price';
import { DatesBottle } from '@/app/ui/bottle/dates-bottle';
import { GlobalVisibility } from '@/app/ui/bottle/global-visibility';

export default function BottleForm() {
  const {
    bottleName,
    setBottleName,
    bottleMillesime,
    setBottleMillesime,
    bottleRegion,
    setBottleRegion,
    setBottleEyeDescription,
    setBottleGlobalDescription,
    bottleQuantity,
    setBottleQuantity,
    bottleMedia,
    setBottleMedia,
  } = useContext(BottleContext);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        <Label className="pb-4 pt-2">Nom de la bouteille</Label>
        <Input
          value={bottleName}
          onChange={(e) => setBottleName(e.target.value)}
          placeholder="eg: Château Margaux 2010..."
        />
      </div>
      <div className="flex flex-col">
        <Label className="pb-4 pt-2">Millesime</Label>
        <Input
          value={bottleMillesime}
          onChange={(e) => setBottleMillesime(e.target.value)}
          placeholder="eg: 2010..."
        />
      </div>
      <SelectTypeWine />
      <SelectSizeWine />
      <AddGrapeVarieties />
      <div className="flex flex-col">
        <Label className="pb-4 pt-2">Provenance</Label>
        <Input
          value={bottleRegion}
          onChange={(e) => setBottleRegion(e.target.value)}
          placeholder="eg: Bordeaux"
        />
      </div>
      <div className="flex flex-col">
        <Label className="pb-4 pt-2" htmlFor="eye_description">
          Description visuelle
        </Label>
        <Textarea
          id="eye_description"
          name="eye_description"
          placeholder="eg: Robe rubis intense..."
          className="w-full rounded-md text-base shadow-sm"
          onChange={(e) => setBottleEyeDescription(e.target.value)}
        />
      </div>
      <AddNoseDescription />
      <FormSlider />
      <Service />
      <Accompaniment />
      <BottlePrice />
      <div className="flex flex-col">
        <Label className="pb-4 pt-2" htmlFor="global_description">
          Description globale
        </Label>
        <Textarea
          id="eye_description"
          name="eye_description"
          placeholder="eg: Ce type de vin est idéal pour les amateurs de rouges corsés..."
          className="w-full rounded-md text-base shadow-sm"
          onChange={(e) => setBottleGlobalDescription(e.target.value)}
        />
      </div>
      <DatesBottle />
      <div className="flex flex-col">
        <Label className="pb-4 pt-2">Quantitée de bouteilles</Label>
        <Input
          type="number"
          value={bottleQuantity}
          onChange={(e) =>
            setBottleQuantity(e.target.value as unknown as number)
          }
          placeholder="eg: 3"
        />
      </div>
      <GlobalVisibility />
      <div className="flex flex-col">
        <Label className="pb-4 pt-2" htmlFor="picture">
          Picture
        </Label>
        <Input
          id="picture"
          type="file"
          value={bottleMedia}
          onChange={(e) => setBottleMedia(e.target.value)}
        />
      </div>
    </div>
  );
}
