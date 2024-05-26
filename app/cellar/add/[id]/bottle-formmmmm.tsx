'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useFormState } from 'react-dom';
import toast, { Toaster } from 'react-hot-toast';

import { createBottle } from '@/app/lib/bottle/bottle.create';

import { RxCross2 } from 'react-icons/rx';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { SliderItem } from '@/app/ui/bottle/form-slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

const notifySucces = (msg: string) =>
  toast.success(msg, {
    duration: 4000,
    position: 'top-right',
  });

const notifyError = (msg: string) =>
  toast.error(msg, {
    duration: 4000,
    position: 'top-right',
  });

export default function BottleForm() {
  const params = useParams<{ id: string }>();
  const cellarId = params.id;

  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createBottle, initialState);

  const [sliderPower, setSliderPower] = useState([70]);
  const [sliderComplexity, setSliderComplexity] = useState([37]);
  const [sliderSpicy, setSliderSpicy] = useState([43]);
  const [sliderFruit, setSliderFruit] = useState([25]);
  const [sliderWood, setSliderWood] = useState([65]);
  const [sliderTanin, setSliderTanin] = useState([88]);

  const handleSliderPower = (value: number[]) => {
    setSliderPower([value[0]]);
  };

  const handleSliderComplexity = (value: number[]) => {
    setSliderComplexity([value[0]]);
  };

  const handleSliderSpicy = (value: number[]) => {
    setSliderSpicy([value[0]]);
  };

  const handleSliderFruit = (value: number[]) => {
    setSliderFruit([value[0]]);
  };

  const handleSliderWood = (value: number[]) => {
    setSliderWood([value[0]]);
  };

  const handleSliderTanin = (value: number[]) => {
    setSliderTanin([value[0]]);
  };

  const slidersConfig = [
    { label: 'Puissance', value: sliderPower, onChange: handleSliderPower },
    {
      label: 'Complexité',
      value: sliderComplexity,
      onChange: handleSliderComplexity,
    },
    { label: 'Epicé', value: sliderSpicy, onChange: handleSliderSpicy },
    { label: 'Fruité', value: sliderFruit, onChange: handleSliderFruit },
    { label: 'Boisé', value: sliderWood, onChange: handleSliderWood },
    { label: 'Tannique', value: sliderTanin, onChange: handleSliderTanin },
  ];

  const [cepages, setCepages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleAddCepage = () => {
    if (inputValue.trim() && !cepages.includes(inputValue.trim())) {
      setCepages([...cepages, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleRemoveCepage = (cepageToRemove) => {
    setCepages(cepages.filter((cepage) => cepage !== cepageToRemove));
  };

  useEffect(() => {
    if (state.message) {
      let msg = state.message;
      if (msg.includes('succès')) {
        notifySucces(msg);
      } else {
        notifyError(msg);
      }
    }
  }, [state.message]);

  return (
    <>
      <Toaster />
      <form action={dispatch} className="flex flex-col space-y-4">
        <div className="flex flex-col">
          <Label className="pb-4 pt-2" htmlFor="bottle_name">
            Nom de la bouteille
          </Label>
          <Input
            type="text"
            id="bottle_name"
            name="bottle_name"
            placeholder="Nom de la bouteille"
            className="mt-1 w-full rounded-md text-base shadow-sm"
          />
        </div>
        <div className="flex flex-col">
          <Label className="pb-4 pt-2" htmlFor="millesime">
            Millésime
          </Label>
          <Input
            type="number"
            id="millesime"
            name="millesime"
            placeholder="eg: 2019"
            className="mt-1 w-full rounded-md text-base shadow-sm"
          />
        </div>
        <div className="col-span-6 sm:col-span-3">
          <Label htmlFor="Status" className="block text-base font-medium ">
            Type de vin
          </Label>
          <Select name="type_of_wine">
            <SelectTrigger
              className="mt-1 w-full rounded-md text-base shadow-sm"
              id="type_of_wine"
            >
              <SelectValue placeholder="Rouge, Blanc..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rouge">Rouge</SelectItem>
              <SelectItem value="blanc">Blanc</SelectItem>
              <SelectItem value="rose">Rosé</SelectItem>
              <SelectItem value="crémant">Crémant</SelectItem>
              <SelectItem value="champagne">Champagne</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col">
          <Label className="pb-4 pt-2" htmlFor="size">
            Taille
          </Label>
          <Select name="size">
            <SelectTrigger
              className="mt-1 w-full rounded-md text-base shadow-sm"
              id="size"
            >
              <SelectValue placeholder="Standard, Magnum..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="standard">Standard 75 cl</SelectItem>
              <SelectItem value="magnum">Magnum 1.5 L</SelectItem>
              <SelectItem value="jéroboam">Jéroboam 3 L</SelectItem>
              <SelectItem value="réhoboam">Réhoboam 4.5 L</SelectItem>
              <SelectItem value="mathusalem">Mathusalem 6 L</SelectItem>
              <SelectItem value="salmanazar">Salmanazar 9 L</SelectItem>
              <SelectItem value="balthazar">Balthazar 12 L</SelectItem>
              <SelectItem value="nabuchodonosor">
                Nabuchodonosor 15 L
              </SelectItem>
              <SelectItem value="melchior">Melchior 18 L</SelectItem>
              <SelectItem value="solomon">Solomon 20 L</SelectItem>
              <SelectItem value="souverain">Souverain 25 L</SelectItem>
              <SelectItem value="primat">Primat 27 L</SelectItem>
              <SelectItem value="melchiesedech">Melchiesedech 30 L</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col">
          <Label className="pb-4 pt-2" htmlFor="grape_varieties">
            Cépages
          </Label>
          <div className="flex w-full items-center gap-2">
            <Input
              className="flex-1"
              placeholder="Entrer une variétée de cépage"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Button onClick={handleAddCepage}>Ajouter</Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {cepages.map((cepage, index) => (
              <Badge key={index}>
                {cepage}
                <Button
                  size="nothing"
                  onClick={() => handleRemoveCepage(cepage)}
                >
                  <RxCross2 />
                </Button>
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          <Label className="pb-4 pt-2" htmlFor="region">
            Région
          </Label>
          <Input
            type="text"
            id="region"
            name="region"
            placeholder="Région"
            className="mt-1 w-full rounded-md text-base shadow-sm"
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
            className="mt-1 w-full rounded-md text-base shadow-sm"
          />
        </div>
        <div className="flex flex-col">
          <Label className="pb-4 pt-2" htmlFor="nose_description">
            Description olfactive
          </Label>
          <Textarea
            id="nose_description"
            name="nose_description"
            placeholder="eg: Un premier nez avec des notes de fruits rouges..."
            className="mt-1 w-full rounded-md text-base shadow-sm"
          />
        </div>

        <div className="flex flex-col">
          <Label className="pb-4 pt-2" htmlFor="mouth_description">
            Description gustative
          </Label>
          <div className="space-y-2">
            {slidersConfig.map((slider, index) => (
              <SliderItem
                key={index}
                label={slider.label}
                value={slider.value}
                onChange={slider.onChange}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          <Label className="pb-4 pt-2" htmlFor="carafage">
            Carafage
          </Label>
          <Input
            type="number"
            id="carafage"
            name="carafage"
            placeholder="Carafage"
            className="mt-1 w-full rounded-md text-base shadow-sm"
          />
        </div>
        <div className="flex flex-col">
          <Label className="pb-4 pt-2" htmlFor="temperature">
            Température
          </Label>
          <Input
            type="number"
            id="temperature"
            name="temperature"
            placeholder="Température"
            className="mt-1 w-full rounded-md text-base shadow-sm"
          />
        </div>
        <div className="flex flex-col">
          <Label className="pb-4 pt-2" htmlFor="degree">
            Degré
          </Label>
          <Input
            type="number"
            id="degree"
            name="degree"
            placeholder="Degré"
            className="mt-1 w-full rounded-md text-base shadow-sm"
          />
        </div>
        <div className="flex flex-col">
          <Label className="pb-4 pt-2" htmlFor="accompaniment">
            Accompagnement
          </Label>
          <Input
            type="text"
            id="accompaniment"
            name="accompaniment"
            placeholder="Accompagnement"
            className="mt-1 w-full rounded-md text-base shadow-sm"
          />
        </div>
        <div className="flex flex-col">
          <Label className="pb-4 pt-2" htmlFor="media">
            Média
          </Label>
          <Input
            type="text"
            id="media"
            name="media"
            placeholder="Média"
            className="mt-1 w-full rounded-md text-base shadow-sm"
          />
        </div>
        <div className="flex flex-col">
          <Label className="pb-4 pt-2" htmlFor="price">
            Prix
          </Label>
          <Input
            type="number"
            id="price"
            name="price"
            placeholder="Prix"
            className="mt-1 w-full rounded-md text-base shadow-sm"
          />
        </div>
        <div className="flex flex-col">
          <Label className="pb-4 pt-2" htmlFor="price_visibility">
            Visibilité du prix
          </Label>
          <Input
            type="number"
            id="price_visibility"
            name="price_visibility"
            placeholder="Visibilité du prix"
            className="mt-1 w-full rounded-md text-base shadow-sm"
          />
        </div>
        <div className="flex flex-col">
          <Label className="pb-4 pt-2" htmlFor="global_description">
            Description globale
          </Label>
          <Input
            type="text"
            id="global_description"
            name="global_description"
            placeholder="Description globale"
            className="mt-1 w-full rounded-md text-base shadow-sm"
          />
        </div>
        <div className="flex flex-col">
          <Label className="pb-4 pt-2" htmlFor="entry_date">
            Date d&apos;entrée
          </Label>
          <Input
            type="date"
            id="entry_date"
            name="entry_date"
            placeholder="Date d'entrée"
            className="mt-1 w-full rounded-md text-base shadow-sm"
          />
        </div>
        <div className="flex flex-col">
          <Label className="pb-4 pt-2" htmlFor="potential_date">
            Date de consommation
          </Label>
          <Input
            type="date"
            id="potential_date"
            name="potential_date"
            placeholder="Date de consommation"
            className="mt-1 w-full rounded-md text-base shadow-sm"
          />
        </div>
        <div className="flex flex-col">
          <Label className="pb-4 pt-2" htmlFor="quantity">
            Quantité
          </Label>
          <Input
            type="number"
            id="quantity"
            name="quantity"
            placeholder="Quantité"
            className="mt-1 w-full rounded-md text-base shadow-sm"
          />
        </div>
        <div className="flex justify-center">
          <Button type="submit" className="w-40 rounded-md p-2">
            Ajouter
          </Button>
        </div>
      </form>
    </>
  );
}
