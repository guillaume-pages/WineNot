import { useContext, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import { BottleContext } from '@/app/context/BottleContext';

import { createBottle } from '@/app/lib/bottle/bottle.create';

import { Accompaniment } from '@/app/ui/bottle/accompaniment';
import { AddGrapeVarieties } from '@/app/ui/bottle/add-grape-varieties';
import { AddNoseDescription } from '@/app/ui/bottle/nose-description';
import { BottlePrice } from '@/app/ui/bottle/bottle-price';
import { DatesBottle } from '@/app/ui/bottle/dates-bottle';
import { FormSlider } from '@/app/ui/bottle/form-slider';
import { GlobalVisibility } from '@/app/ui/bottle/global-visibility';
import { Reset } from '@/app/ui/bottle/reset';
import { SelectMillesime } from '@/app/ui/bottle/select-millesime';
import { SelectSizeWine } from '@/app/ui/bottle/select-size-wine';
import { SelectTypeWine } from '@/app/ui/bottle/select-type-wine';
import { Service } from '@/app/ui/bottle/service';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function BottleForm({cellarId} : {cellarId: string}) {
  const {
    bottleName,
    setBottleName,
    bottleDegree,
    setBottleDegree,
    bottleRegion,
    setBottleRegion,
    setBottleEyeDescription,
    setBottleGlobalDescription,
    bottleQuantity,
    setBottleQuantity,
    bottleMedia,
    setBottleMedia,
    bottleData
  } = useContext(BottleContext);

  const [ loading, setLoading ] = useState(false);

  const handleAddBottle = async () => {
    setLoading(true);
    console.log("data to send", bottleData);
    console.log("cellarId", cellarId);

    const data = {
      ...bottleData,
      cellar_id: cellarId
    }
    try {
    const res = await createBottle(data);
    console.log(res);
    setLoading(false);
    toast.success(res.message, {
      duration: 4000,
      position: 'top-right',
    });

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  } catch (error) {
    console.error(error);
    setLoading(false);
    if (error instanceof Error) {
      toast.error(error.message, {
        duration: 4000,
        position: 'top-right',
      });
    } else {
      // Handle cases where the error is not an instance of Error
      toast.error('An unexpected error occurred', {
        duration: 4000,
        position: 'top-right',
      });
    }
  }
  }

  return (
    <div className="flex flex-col">
      <Toaster />
      <Reset />
      <div className="flex flex-col">
        <Label className="pb-4 pt-2">Nom de la bouteille</Label>
        <Input
          value={bottleName}
          onChange={(e) => setBottleName(e.target.value)}
          placeholder="eg: Château Margaux 2010..."
        />
      </div>
      <SelectMillesime />
      <SelectTypeWine />
      <SelectSizeWine />
      <div className="flex flex-col">
        <Label className="pb-4 pt-2">Degrés d&apos;alcool</Label>
        <Input
          type="number"
          value={bottleDegree}
          onChange={(e) => {
            const value = parseFloat(e.target.value);
            setBottleDegree(isNaN(value) ? 10 : value);
          }}
          step="0.1"
          min="0"
          max="100"
          placeholder="ex: 12,5"
        />
      </div>
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
            setBottleQuantity(parseInt(e.target.value))
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
      <div className="flex flex-col pb-4 pt-2">
        <Button size="default" onClick={handleAddBottle} disabled={loading} >Ajouter</Button>
      </div>
    </div>
  );
}