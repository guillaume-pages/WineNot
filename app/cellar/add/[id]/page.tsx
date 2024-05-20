'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { SliderItem } from '@/app/ui/bottle/slider-item';
import BottleForm from './bottle-form';

export default function AddBottle() {
  const params = useParams<{ id: string }>();
  const cellarId = params.id;

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

  const [submitting, setSubmitting] = useState(false);

  

  return (
    <>
      <h1 className="pt-4 text-center text-2xl font-bold">
        Création d&apos;une bouteille
      </h1>
      <div className="flex justify-center pb-14">
        <div className="w-4/5">
          <BottleForm />
        </div>
      </div>
    </>
  );
}
