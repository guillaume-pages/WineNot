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

export default function BottleForm() {
  const {
    bottleName,
    setBottleName,
    bottleMillesime,
    setBottleMillesime,
    bottleRegion,
    setBottleRegion,
    bottleEyeDescription,
    setBottleEyeDescription,
  } = useContext(BottleContext);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
      <Label className="pb-4 pt-2">Nom de la bouteille</Label>
        <Input
          value={bottleName}
          onChange={(e) => setBottleName(e.target.value)}
        />
      </div>
      <div className="flex flex-col">
      <Label className="pb-4 pt-2">Millesime</Label>
        <Input
          value={bottleMillesime}
          onChange={(e) => setBottleMillesime(e.target.value)}
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
    </div>
  );
}
