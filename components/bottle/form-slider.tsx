'use client';

import { useState, useContext } from 'react';

import { BottleContext } from '@/app/context/BottleContext';

import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

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
      defaultValue={value}
      max={100}
      step={1}
      aria-label={`Valeur de ${label}`}
    />
    <Label className="text-xs">{label}</Label>
    <span className="w-[40px] text-xs">{`${value} %`}</span>
  </div>
);

export const FormSlider = () => {
  const {
    sliderPower,
    setSliderPower,
    sliderComplexity,
    setSliderComplexity,
    sliderSpicy,
    setSliderSpicy,
    sliderFruit,
    setSliderFruit,
    sliderWood,
    setSliderWood,
    sliderTanin,
    setSliderTanin,
  } = useContext(BottleContext);

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
      <Label className="pb-4 pt-2" htmlFor="mouth_description">
        Description gustative (optionnel)
      </Label>
      <div className="space-y-2">
        {slidersConfig.map((slider, index) => (
          <SliderItem
            key={index}
            label={slider.label}
            value={slider.value}
            onChange={slider.onChange}
            aria-label={`Valeur de ${slider.label}`}
          />
        ))}
      </div>
    </>
  );
};
