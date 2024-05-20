'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useFormState } from 'react-dom';
import toast, { Toaster } from 'react-hot-toast';

import { createBottle } from '@/app/lib/bottle/bottle.create';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { SliderItem } from '@/app/ui/bottle/slider-item';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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

  return (
    <>
      <Toaster />
      <form action={dispatch} className="flex flex-col space-y-4">
        <div className="flex flex-col">
          <Label className="pb-2" htmlFor="bottle_name">
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
          <Label className="pb-2" htmlFor="millesime">
            Millésime
          </Label>
          <Input
            type="number"
            id="millesime"
            name="millesime"
            placeholder="Millésime"
            className="mt-1 w-full rounded-md text-base shadow-sm"
          />
        </div>
        <div className="col-span-6 sm:col-span-3">
          <Label htmlFor="Status" className="block text-base font-medium ">
            Type de vin
          </Label>
          <Select name="type_of_wine" required>
            <SelectTrigger
              className="mt-1 w-full rounded-md text-base shadow-sm"
              id="type_of_wine"
            >
              <SelectValue />
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
          <Label className="pb-2" htmlFor="size">
            Taille
          </Label>
          <Input
            type="text"
            id="size"
            name="size"
            placeholder="Taille"
            className="mt-1 w-full rounded-md text-base shadow-sm"
          />
        </div>
        <div className="flex flex-col">
          <Label className="pb-2" htmlFor="grape_varieties">
            Cépages
          </Label>
          <Input
            type="text"
            id="grape_varieties"
            name="grape_varieties"
            placeholder="Cépages"
            className="mt-1 w-full rounded-md text-base shadow-sm"
          />
        </div>
        <div className="flex flex-col">
          <Label className="pb-2" htmlFor="region">
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
          <Label className="pb-2" htmlFor="eye_description">
            Description visuelle
          </Label>
          <Input
            type="text"
            id="eye_description"
            name="eye_description"
            placeholder="Description visuelle"
            className="mt-1 w-full rounded-md text-base shadow-sm"
          />
        </div>
        <div className="flex flex-col">
          <Label className="pb-2" htmlFor="nose_description">
            Description olfactive
          </Label>
          <Input
            type="text"
            id="nose_description"
            name="nose_description"
            placeholder="Description olfactive"
            className="mt-1 w-full rounded-md text-base shadow-sm"
          />
        </div>
        <div className="flex flex-col">
          <Label className="pb-2" htmlFor="mouth_description">
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
          <Label className="pb-2" htmlFor="carafage">
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
          <Label className="pb-2" htmlFor="temperature">
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
          <Label className="pb-2" htmlFor="degree">
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
          <Label className="pb-2" htmlFor="accompaniment">
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
          <Label className="pb-2" htmlFor="media">
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
          <Label className="pb-2" htmlFor="price">
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
          <Label className="pb-2" htmlFor="price_visibility">
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
          <Label className="pb-2" htmlFor="global_description">
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
          <Label className="pb-2" htmlFor="entry_date">
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
          <Label className="pb-2" htmlFor="potential_date">
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
          <Label className="pb-2" htmlFor="quantity">
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
