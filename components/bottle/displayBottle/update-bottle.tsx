"use client";

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Image from 'next/image';
import { useTheme } from 'next-themes';

import { getOneBottle } from '@/app/lib/bottle/bottle.getone';
import { updateBottle } from '@/app/lib/bottle/bottle.put';

import { RxCross2 } from 'react-icons/rx';

import carafeBlack from '@/public/images/carafe-black.png';
import carafeWhite from '@/public/images/carafe-white.png';
import thermometerBlack from '@/public/images/thermometer-black.png';
import thermometerWhite from '@/public/images/thermometer-white.png';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Bottle } from '@/types/bottle.type';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

const listYears = Array.from({ length: 45 }, (_, index) =>
  (2024 - index).toString(),
);

const minutes = [
  '0',
  '5',
  '10',
  '15',
  '20',
  '25',
  '30',
  '35',
  '40',
  '45',
  '50',
  '55',
  '60',
  '65',
  '70',
  '75',
  '80',
  '85',
  '90',
  '95',
  '100',
  '105',
  '110',
  '115',
  '120',
];

const temperatures = [
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
];

type SliderItemProps = {
  label: string;
  value: number[];
  onChange: (value: number[]) => void;
};

export const SliderItem = ({ label, value, onChange }: SliderItemProps) => (
  <div className="flex items-center space-x-2">
    <Slider
      className="w-[185px]"
      onValueChange={(e) => onChange(e)}
      value={value}
      max={100}
      step={1}
    />
    <Label className="text-xs">{label}</Label>
    <span className="w-[40px] text-xs">{`${value[0]} %`}</span>
  </div>
);

export default function UpdateBottleForm({ bottleId }: { bottleId: string }) {
  const [bottle, setBottle] = useState<Bottle>({
    bottle_id: bottleId,
    bottle_name: '',
    millesime: 0,
    type_of_wine: '',
    size: '',
    grape_varieties: [],
    region: '',
    eye_description: '',
    nose_description: [],
    mouth_description: [0, 0, 0, 0, 0, 0],
    carafage: 0,
    temperature: 0,
    degree: 0,
    accompaniment: [],
    media: '',
    price: 0,
    price_visibility: 0,
    global_description: '',
    entry_date: new Date(),
    potential_date: new Date(),
    quantity: 0,
    global_visibility: 0,
    cellar_id: '',
  });

  const [entryInputValue, setEntryInputValue] = useState('');
  const [potentialInputValue, setPotentialInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const { resolvedTheme } = useTheme();

  const [inputValue, setInputValue] = useState('');
  const [inputValueGrape, setInputValueGrape] = useState('');
  const [inputValueNose, setInputValueNose] = useState('');
  const [inputValueAccompaniment, setInputValueAccompaniment] = useState('');

  const slidersConfig = [
    { label: 'Puissance', index: 0 },
    { label: 'Complexité', index: 1 },
    { label: 'Epicé', index: 2 },
    { label: 'Fruité', index: 3 },
    { label: 'Boisé', index: 4 },
    { label: 'Tannique', index: 5 },
  ];

  useEffect(() => {
    const fetchBottle = async () => {
      const res = await getOneBottle(bottleId);
      if (res) {
        setBottle(res);
      }
    };

    fetchBottle();
  }, [bottleId]);

  const handleAddGrapeVarietie = () => {
    if (
      inputValueGrape.trim() &&
      !bottle.grape_varieties?.includes(inputValueGrape.trim())
    ) {
      setBottle((prevBottle) => ({
        ...prevBottle,
        grape_varieties: [
          ...(prevBottle.grape_varieties ?? []),
          inputValueGrape.trim(),
        ],
      }));
      setInputValueGrape('');
    }
  };

  const handleRemoveGrapeVarietie = (grapeVarietieToRemove: string) => {
    setBottle((prevBottle) => ({
      ...prevBottle,
      grape_varieties: prevBottle.grape_varieties?.filter(
        (grapeVarietie) => grapeVarietie !== grapeVarietieToRemove,
      ),
    }));
  };

  const handleAddNose = () => {
    if (
      inputValueNose.trim() &&
      !bottle.nose_description?.includes(inputValueNose.trim())
    ) {
      setBottle((prevBottle) => ({
        ...prevBottle,
        nose_description: [
          ...(prevBottle.nose_description ?? []),
          inputValueNose.trim(),
        ],
      }));
      setInputValueNose('');
    }
  };

  const handleRemoveNose = (noseToRemove: string) => {
    setBottle((prevBottle) => ({
      ...prevBottle,
      nose_description: prevBottle.nose_description?.filter(
        (nose) => nose !== noseToRemove,
      ),
    }));
  };

  const handleAddAccompaniment = () => {
    if (
      inputValueAccompaniment.trim() &&
      !bottle.accompaniment?.includes(inputValueAccompaniment.trim())
    ) {
      setBottle((prevBottle) => ({
        ...prevBottle,
        accompaniment: [...(prevBottle.accompaniment ?? []), inputValueAccompaniment.trim()],
      }));
      setInputValueAccompaniment('');
    }
  };

  const handleRemoveAccompaniment = (accompanimentToRemove: string) => {
    setBottle((prevBottle) => ({
      ...prevBottle,
      accompaniment: prevBottle.accompaniment?.filter(
        (accompaniment) => accompaniment !== accompanimentToRemove,
      ),
    }));
  };

  const handleSliderChange = (index: number, value: number[]) => {
    setBottle((prevBottle) => {
      const updatedMouthDescription = [...(prevBottle.mouth_description ?? [])];
      updatedMouthDescription[index] = value[0];
      return {
        ...prevBottle,
        mouth_description: updatedMouthDescription,
      };
    });
  };

  useEffect(() => {
    if (
      typeof entryInputValue === 'string' &&
      entryInputValue.length === 10 &&
      bottle.entry_date !== entryInputValue
    ) {
      setBottle((prevBottle) => ({
        ...prevBottle,
        entry_date: entryInputValue,
      }));
    }
    if (
      typeof potentialInputValue === 'string' &&
      potentialInputValue.length === 10 &&
      bottle.potential_date !== potentialInputValue
    ) {
      setBottle((prevBottle) => ({
        ...prevBottle,
        potential_date: potentialInputValue,
      }));
    }
  }, [
    bottle.entry_date,
    bottle.potential_date,
    entryInputValue,
    potentialInputValue,
  ]);

  const handleUpdateBottle = async () => {
    setLoading(true);

    const data = {
      ...bottle,
    };

    console.log('data', data);
    try {
      const res = await updateBottle(data);
      setLoading(false);
      toast.success(res.message || 'Bouteille ajoutée avec succès à la cave', {
        duration: 2000,
        position: 'top-right',
      });

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } catch (error) {
      setLoading(false);
      if (error instanceof Error) {
        toast.error(error.message, {
          duration: 4000,
          position: 'top-right',
        });
      } else {
        toast.error('An unexpected error occurred', {
          duration: 4000,
          position: 'top-right',
        });
      }
    }
  };

  return (
    <div className="flex flex-col">
      <div className="sm:mx-auto sm:flex sm:space-x-20 md:space-x-6">
        <div className="sm:flex sm:flex-col">
          <div className="flex flex-col">
            <Label className="pb-4 pt-2">Nom de la bouteille </Label>
            <Input
              value={bottle.bottle_name}
              onChange={(e) =>
                setBottle({ ...bottle, bottle_name: e.target.value })
              }
              placeholder="eg: Château Margaux 2010..."
            />
          </div>
          <div className="flex flex-col">
            <Label className="pb-4 pt-2">Millesime </Label>
            <Select
              onValueChange={(value) =>
                setBottle({ ...bottle, millesime: parseInt(value) })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="2024" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {listYears.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col">
            <Label className="pb-4 pt-2">Type de vin </Label>
            <Select
              onValueChange={(value) =>
                setBottle({ ...bottle, type_of_wine: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Rouge, Blanc...">
                  {bottle.type_of_wine}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Rouge">Rouge</SelectItem>
                <SelectItem value="Blanc">Blanc</SelectItem>
                <SelectItem value="Rosé">Rosé</SelectItem>
                <SelectItem value="Champagne">Champagne</SelectItem>
                <SelectItem value="Crémant">Crémant</SelectItem>
                <SelectItem value="Autre">Autre</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col">
            <Label className="pb-4 pt-2">Degrés d&apos;alcool </Label>
            <Input
              type="number"
              value={bottle.degree}
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                setBottle({ ...bottle, degree: isNaN(value) ? 10 : value });
              }}
              step="0.1"
              min="0"
              max="100"
              placeholder="ex: 12,5"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col">
              <Label className="pb-4 pt-2" htmlFor="size_bottle">
                Taille de la bouteille
              </Label>
            </div>
            <Select
              onValueChange={(value) => setBottle({ ...bottle, size: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Standard, Magnum...">
                  {bottle.size}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Standard 75 cl">Standard 75 cl</SelectItem>
                <SelectItem value="Magnum 1.5 L">Magnum 1.5 L</SelectItem>
                <SelectItem value="Jéroboam 3 L">Jéroboam 3 L</SelectItem>
                <SelectItem value="Réhoboam 4.5 L">Réhoboam 4.5 L</SelectItem>
                <SelectItem value="Mathusalem 6 L">Mathusalem 6 L</SelectItem>
                <SelectItem value="Salmanazar 9 L">Salmanazar 9 L</SelectItem>
                <SelectItem value="Balthazar 12 L">Balthazar 12 L</SelectItem>
                <SelectItem value="Nabuchodonosor 15 L">
                  Nabuchodonosor 15 L
                </SelectItem>
                <SelectItem value="Melchior 18 L">Melchior 18 L</SelectItem>
                <SelectItem value="Solomon 20 L">Solomon 20 L</SelectItem>
                <SelectItem value="Souverain 25 L">Souverain 25 L</SelectItem>
                <SelectItem value="Primat 27 L">Primat 27 L</SelectItem>
                <SelectItem value="Melchiesedech 30 L">
                  Melchiesedech 30 L
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col">
            <Label className="pb-4 pt-2" htmlFor="grape_varieties">
              Cépages (optionnel)
            </Label>
            <div className="flex w-full items-center gap-2">
              <Input
                className="flex-1"
                placeholder="eg: Syrah, Grenache..."
                value={inputValueGrape}
                onChange={(e) => setInputValueGrape(e.target.value)}
              />
              <Button onClick={handleAddGrapeVarietie}>Ajouter</Button>
            </div>
            <div className="flex flex-wrap items-center gap-2 pt-2">
              {bottle &&
                bottle.grape_varieties &&
                bottle.grape_varieties.map((grapeVarietie, index) => (
                  <Badge key={index}>
                    {grapeVarietie}
                    <Button
                      size="nothing"
                      onClick={() => handleRemoveGrapeVarietie(grapeVarietie)}
                    >
                      <RxCross2 />
                    </Button>
                  </Badge>
                ))}
            </div>
          </div>
          <div className="flex flex-col">
            <Label className="pb-4 pt-2">Provenance </Label>
            <Input
              value={bottle.region}
              onChange={(e) => setBottle({ ...bottle, region: e.target.value })}
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
              value={bottle.eye_description}
              onChange={(e) =>
                setBottle({ ...bottle, eye_description: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col">
            <Label className="pb-4 pt-2" htmlFor="mouth_description">
              Description gustative (optionnel)
            </Label>
            <div className="space-y-2">
              {slidersConfig.map((slider, index) => (
                <SliderItem
                  key={index}
                  label={slider.label}
                  value={
                    bottle.mouth_description
                      ? [bottle.mouth_description[slider.index]]
                      : [0]
                  }
                  onChange={(value) => handleSliderChange(slider.index, value)}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="sm:flex sm:flex-col">
          <div className="flex flex-col">
            <Label className="pb-4 pt-2" htmlFor="grape_varieties">
              Description olfactive (optionnel)
            </Label>
            <div className="flex w-full items-center gap-2">
              <Input
                className="flex-1"
                placeholder="eg: Fruits rouges, épices..."
                value={inputValueNose}
                onChange={(e) => setInputValueNose(e.target.value)}
              />
              <Button onClick={handleAddNose}>Ajouter</Button>
            </div>
            <div className="flex flex-wrap items-center gap-2 pt-2">
              {bottle.nose_description &&
                bottle.nose_description.map((nose, index) => (
                  <Badge key={index}>
                    {nose}
                    <Button
                      size="nothing"
                      onClick={() => handleRemoveNose(nose)}
                    >
                      <RxCross2 />
                    </Button>
                  </Badge>
                ))}
            </div>
          </div>
          <div className="flex flex-col">
            <Label className="pb-4 pt-2" htmlFor="service">
              Service (optionnel)
            </Label>
            <div className="flex space-x-2">
              <div className="flex space-x-2">
                <Image src={resolvedTheme === 'light' ? carafeBlack : carafeWhite} alt="Carafe" />
                <div className="self-end">
                  <Select
                    onValueChange={(value) =>
                      setBottle({ ...bottle, carafage: parseInt(value) })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="... min">
                        {bottle.carafage} min
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {minutes.map((minute) => (
                        <SelectItem key={minute} value={minute}>
                          {minute} min
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex space-x-2">
                <Image src={resolvedTheme === 'light' ? thermometerBlack : thermometerWhite} alt="thermomètre"/>
                <div className="self-end">
                  <Select
                    onValueChange={(value) =>
                      setBottle({ ...bottle, temperature: parseInt(value) })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="... °C">
                        {bottle.temperature} °C
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {temperatures.map((temperature) => (
                        <SelectItem key={temperature} value={temperature}>
                          {temperature} °C
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <Label className="pb-4 pt-2" htmlFor="accompaniment">
              Accompagnements (optionnel)
            </Label>
            <div className="flex w-full items-center gap-2">
              <Input
                className="flex-1"
                placeholder="eg: Fromage, viande..."
                value={inputValueAccompaniment}
                onChange={(e) => setInputValueAccompaniment(e.target.value)}
              />
              <Button onClick={handleAddAccompaniment}>Ajouter</Button>
            </div>
            <div className="flex flex-wrap items-center gap-2 pt-2">
              {bottle.accompaniment &&
                bottle.accompaniment.map((accompaniment, index) => (
                  <Badge key={index}>
                    {accompaniment}
                    <Button
                      size="nothing"
                      onClick={() => handleRemoveAccompaniment(accompaniment)}
                    >
                      <RxCross2 />
                    </Button>
                  </Badge>
                ))}
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex space-x-8">
              <div>
                <Label className="pb-4 pt-2" htmlFor="price">
                  Prix
                </Label>
                <div className="w-20">
                  <Input
                    type="number"
                    placeholder="eg: 10 €"
                    value={bottle.price}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value);
                      setBottle({
                        ...bottle,
                        price: value,
                      });
                    }}
                    step="0.1"
                    min="0"
                    max="10000000"
                  />
                </div>
              </div>
              {/* <div className="flex flex-col">
                <Label className="pb-4 pt-2" htmlFor="price">
                  Visibilité du prix 
                </Label>
                <div>
                  <Button
                    onClick={() =>
                      setBottle({ ...bottle, price_visibility: 0 })
                    }
                    variant={
                      bottle.price_visibility === 0 ? 'primary' : 'secondary'
                    }
                    className="rounded-bl-sm rounded-tl-sm border-r-[1px] text-sm"
                    size="little"
                  >
                    Pour soi
                  </Button>
                  <Button
                    onClick={() =>
                      setBottle({ ...bottle, price_visibility: 1 })
                    }
                    variant={
                      bottle.price_visibility === 1 ? 'primary' : 'secondary'
                    }
                    className="border-r-[1px] text-sm"
                    size="little"
                  >
                    Amis
                  </Button>
                  <Button
                    onClick={() =>
                      setBottle({ ...bottle, price_visibility: 2 })
                    }
                    variant={
                      bottle.price_visibility === 2 ? 'primary' : 'secondary'
                    }
                    className="rounded-br-sm rounded-tr-sm  text-sm"
                    size="little"
                  >
                    Public
                  </Button>
                </div>
              </div> */}
            </div>
          </div>
          <div className="flex flex-col">
            <Label className="pb-4 pt-2" htmlFor="global_description">
              Description globale (optionnel)
            </Label>
            <Textarea
              id="eye_description"
              name="eye_description"
              placeholder="eg: Ce type de vin est idéal pour les amateurs de rouges corsés..."
              className="w-full rounded-md text-base shadow-sm"
              value={bottle.global_description}
              onChange={(e) => {
                if (e.target.value.length < 1) {
                  setBottle({ ...bottle, global_description: '' });
                }
                setBottle({ ...bottle, global_description: e.target.value });
              }}
            />
          </div>
          <div className="flex flex-col">
            <div>
              <Label>Date d&apos;entrée dans la cave </Label>
              <Input
                type="date"
                id="entry_date"
                value={entryInputValue as unknown as string}
                onChange={(e) => setEntryInputValue(e.target.value)}
                placeholder="JJ/MM/AAAA"
              />
            </div>
            <div>
              <Label>Date de potentiel de garde (optionnel)</Label>
              <Input
                type="date"
                id="potential_date"
                value={potentialInputValue as unknown as string}
                onChange={(e) => setPotentialInputValue(e.target.value)}
                placeholder="JJ/MM/AAAA"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <Label className="pb-4 pt-2">Quantitée de bouteilles </Label>
            <Input
              type="number"
              value={bottle.quantity}
              onChange={(e) =>
                setBottle({ ...bottle, quantity: parseInt(e.target.value) })
              }
              placeholder="eg: 3"
            />
          </div>
          {/* <div className="flex flex-col">
            <Label className="pb-4 pt-2" htmlFor="price">
              Visibilité la bouteille
            </Label>
            <div>
              <Button
                onClick={() => setBottle({ ...bottle, global_visibility: 0 })}
                variant={
                  bottle.global_visibility === 0 ? 'primary' : 'secondary'
                }
                className="rounded-bl-sm rounded-tl-sm border-r-[1px] text-sm"
                size="little"
              >
                Pour soi
              </Button>
              <Button
                onClick={() => setBottle({ ...bottle, global_visibility: 1 })}
                variant={
                  bottle.global_visibility === 1 ? 'primary' : 'secondary'
                }
                className="border-r-[1px] text-sm"
                size="little"
              >
                Amis
              </Button>
              <Button
                onClick={() => setBottle({ ...bottle, global_visibility: 2 })}
                variant={
                  bottle.global_visibility === 2 ? 'primary' : 'secondary'
                }
                className="rounded-br-sm rounded-tr-sm  text-sm"
                size="little"
              >
                Public
              </Button>
            </div>
          </div> */}
          {/* <div className="flex flex-col">
            <Label className="pb-4 pt-2" htmlFor="picture">
              Picture
            </Label>
            <Input
              id="picture"
              type="file"
              value={bottle.media}
              onChange={(e) => setBottle({...bottle, media: e.target.value})}
            />
          </div> */}
          <div className="flex flex-col pb-4 pt-2">
            <Button
              size="default"
              onClick={handleUpdateBottle}
              disabled={loading}
            >
              Ajouter
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
