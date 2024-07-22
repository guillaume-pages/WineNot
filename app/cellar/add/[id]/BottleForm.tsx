import { useContext, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import { BottleContext } from '@/app/context/BottleContext';

import { createBottle } from '@/app/lib/bottle/bottle.create';

import { Accompaniment } from '@/components/bottle/Accompaniment';
import { AddGrapeVarieties } from '@/components/bottle/AddGrapeVarieties';
import { AddNoseDescription } from '@/components/bottle/NoseDescription';
import { BottlePrice } from '@/components/bottle/BottlePrice';
import { DatesBottle } from '@/components/bottle/DatesBottle';
import { FormSlider } from '@/components/bottle/FormSlider';
import { GlobalVisibility } from '@/components/bottle/GlobalVisibility';
import { Reset } from '@/components/bottle/Reset';
import { SelectMillesime } from '@/components/bottle/SelectMillesime';
import { SelectSizeWine } from '@/components/bottle/SelectSizeWine';
import { SelectTypeWine } from '@/components/bottle/SelectTypeWine';
import { Service } from '@/components/bottle/Service';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function BottleForm({ cellarId }: { cellarId: string }) {
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
    bottleData,
  } = useContext(BottleContext);

  const [loading, setLoading] = useState(false);

  const handleAddBottle = async () => {
    setLoading(true);

    const data = {
      ...bottleData,
      cellar_id: cellarId,
    };
    try {
      const res = await createBottle(data);
      setLoading(false);
      toast.success(res.message, {
        duration: 4000,
        position: 'top-right',
      });

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
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
  };

  return (
    <div className="flex flex-col">
      <Toaster />
      <Reset />
      <div className="sm:mx-auto sm:flex sm:space-x-20 md:space-x-6">
        <div className="sm:flex sm:flex-col">
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
          <FormSlider />
        </div>

        <div className="sm:flex sm:flex-col">
          <AddNoseDescription />
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
              onChange={(e) => setBottleQuantity(parseInt(e.target.value))}
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
            <Button size="default" onClick={handleAddBottle} disabled={loading}>
              Ajouter
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}