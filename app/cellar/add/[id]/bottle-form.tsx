import { useContext, useState } from 'react';
import toast from 'react-hot-toast';

import { BottleContext } from '@/app/context/BottleContext';

import { createBottle } from '@/app/lib/bottle/bottle.create';

import { Accompaniment } from '@/components/bottle/accompaniment';
import { AddGrapeVarieties } from '@/components/bottle/add-grape-varieties';
import { AddNoseDescription } from '@/components/bottle/nose-description';
import { BottlePrice } from '@/components/bottle/bottle-price';
import { DatesBottle } from '@/components/bottle/dates-bottle';
import { FormSlider } from '@/components/bottle/form-slider';
// import { GlobalVisibility } from '@/components/bottle/global-visibility';
import { Reset } from '@/components/bottle/reset';
import { SelectMillesime } from '@/components/bottle/select-millesime';
import { SelectSizeWine } from '@/components/bottle/select-size-wine';
import { SelectTypeWine } from '@/components/bottle/select-type-wine';
import { Service } from '@/components/bottle/service';

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

      if (res.errors) {
        toast.error(res.errors, {
          duration: 4000,
          position: 'top-right',
        });
      } else {
        toast.success(res.message || 'Bouteille ajoutée avec succès à la cave', {
          duration: 4000,
          position: 'top-right',
        });

        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }
    } catch (error) {
      setLoading(false);

      if (error instanceof Error) {
        toast.error(error.message, {
          duration: 4000,
          position: 'top-right',
        });
      } else {
        toast.error('Une erreur inattendue est survenue. Veuillez réessayer.', {
          duration: 4000,
          position: 'top-right',
        });
      }
    }
};


  return (
    <div className="flex flex-col">
      <Reset />
      <div className="sm:mx-auto sm:flex sm:space-x-20 md:space-x-6">
        <div className="sm:flex sm:flex-col">
          <div className="flex flex-col">
            <Label className="pb-4 pt-2">Nom de la bouteille </Label>
            <Input
              value={bottleName}
              onChange={(e) => setBottleName(e.target.value)}
              placeholder="eg: Château Margaux 2010..."
            />
          </div>
          <SelectMillesime />
          <SelectTypeWine />
          <div className="flex flex-col">
            <Label className="pb-4 pt-2">Degrés d&apos;alcool </Label>
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
            <Label className="pb-4 pt-2">Provenance </Label>
            <Input
              value={bottleRegion}
              onChange={(e) => setBottleRegion(e.target.value)}
              placeholder="eg: Bordeaux"
            />
          </div>
          <div className="flex flex-col">
            <Label className="pb-4 pt-2" htmlFor="eye_description">
              Description visuelle (optionnel)
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
              Description globale (optionnel)
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
            <Label className="pb-4 pt-2">Quantitée de bouteilles </Label>
            <Input
              type="number"
              value={bottleQuantity}
              onChange={(e) => setBottleQuantity(parseInt(e.target.value))}
              placeholder="eg: 3"
            />
          </div>
          {/* <GlobalVisibility /> */}
          {/* <div className="flex flex-col">
            <Label className="pb-4 pt-2" htmlFor="picture">
              Picture
            </Label>
            <Input
              id="picture"
              type="file"
              value={bottleMedia}
              onChange={(e) => setBottleMedia(e.target.value)}
            />
          </div> */}
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
