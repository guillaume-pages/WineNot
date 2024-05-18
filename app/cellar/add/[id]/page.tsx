'use client';

import { useParams } from 'next/navigation';

import { useState } from 'react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from "@/components/ui/slider"


export default function AddBottle() {
  const params = useParams<{ id: string }>();
  const cellarId = params.id;

  const [sliderPower, setSliderPower] = useState([70]);
  const [sliderComplexity, setSliderComplexity] = useState([37]);
  const [sliderSpicy, setSliderSpicy] = useState([43]);
  const [sliderFruit, setSliderFruit] = useState([25]);
  const [sliderWood, setSliderWood] = useState([65]);
  const [sliderTannin, setSliderTannin] = useState([88]);

  const handleSliderPower = (value: number[]) => {
    console.log('power :',value[0]);
    setSliderPower([value[0]]);
  }

  const handleSliderComplexity = (value: number[]) => {
    console.log('complexity :',value[0])
    setSliderComplexity([value[0]]);
  }

  const handleSliderSpicy = (value: number[]) => {
    console.log('spicy :',value[0])
    setSliderSpicy([value[0]]);
  }

  const handleSliderFruit = (value: number[]) => {
    console.log('fruit :',value[0])
    setSliderFruit([value[0]]);
  }

  const handleSliderWood = (value: number[]) => {
    console.log('wood :',value[0])
    setSliderWood([value[0]]);
  }

  const handleSliderTannin = (value: number[]) => {
    console.log('tannin :',value[0])
    setSliderTannin([value[0]]);
  }


  return (
    <>
      <h1 className='text-2xl font-bold text-center pt-4'>Création d&apos;une bouteille</h1>
      <div className='flex justify-center pb-14'>
        <div className='w-4/5'>
          <form className='flex flex-col space-y-4'>
            <div className='flex flex-col'>
              <Label className='pb-2'htmlFor='bottle_name'>Nom de la bouteille</Label>
              <Input
                type='text'
                id='bottle_name'
                name='bottle_name'
                placeholder='Nom de la bouteille'
                className="mt-1 w-full rounded-md text-base shadow-sm"
              />
            </div>
            <div className='flex flex-col'>
              <Label className='pb-2'htmlFor='millesime'>Millésime</Label>
              <Input
                type='number'
                id='millesime'
                name='millesime'
                placeholder='Millésime'
                className="mt-1 w-full rounded-md text-base shadow-sm"
              />
            </div>
            <div className='flex flex-col'>
              <Label className='pb-2'htmlFor='size'>Taille</Label>
              <Input
                type='text'
                id='size'
                name='size'
                placeholder='Taille'
                className="mt-1 w-full rounded-md text-base shadow-sm"
              />
            </div>
            <div className='flex flex-col'>
              <Label className='pb-2'htmlFor='grape_varieties'>Cépages</Label>
              <Input
                type='text'
                id='grape_varieties'
                name='grape_varieties'
                placeholder='Cépages'
                className="mt-1 w-full rounded-md text-base shadow-sm"
              />
            </div>
            <div className='flex flex-col'>
              <Label className='pb-2'htmlFor='region'>Région</Label>
              <Input
                type='text'
                id='region'
                name='region'
                placeholder='Région'
                className="mt-1 w-full rounded-md text-base shadow-sm"
              />
            </div>
            <div className='flex flex-col'>
              <Label className='pb-2'htmlFor='eye_description'>Description visuelle</Label>
              <Input
                type='text'
                id='eye_description'
                name='eye_description'
                placeholder='Description visuelle'
                className="mt-1 w-full rounded-md text-base shadow-sm"
              />
            </div>
            <div className='flex flex-col'>
              <Label className='pb-2'htmlFor='nose_description'>Description olfactive</Label>
              <Input
                type='text'
                id='nose_description'
                name='nose_description'
                placeholder='Description olfactive'
                className="mt-1 w-full rounded-md text-base shadow-sm"
              />
            </div>
            <div className='flex flex-col'>
              <Label className='pb-2'htmlFor='mouth_description'>Description gustative</Label>
              <div className='space-y-2'>
                  <Label htmlFor='power'>Puissance</Label>
                <div className='flex '>
                  <Slider onValueChange={(e) => handleSliderPower(e)} defaultValue={sliderPower} max={100} step={1} />
                  <span className='w-16 pl-2'>{`${sliderPower} %`}</span>
                </div>
                <div className='flex items-center space-x-2'>
                  <Label htmlFor='complexity'>Complexité</Label>
                  <Slider onValueChange={(e) => handleSliderComplexity(e)} defaultValue={sliderComplexity} max={100} step={1} />
                  <span className='w-[76px] text-xs'>{sliderComplexity} %</span>
                </div>
                <div className='flex items-center space-x-2'>
                  <Slider onValueChange={(e) => handleSliderSpicy(e)} defaultValue={sliderSpicy} max={100} step={1} />
                  <Label htmlFor='spicy'>Epicé</Label>
                  <span className='w-[76px] text-sm'>{sliderSpicy} %</span>
                </div>
                <div className='flex items-center space-x-2'>
                  <Label className='w-[100px]' htmlFor='fruit'>Peu fruité</Label>
                  <Slider onValueChange={(e) => handleSliderFruit(e)} defaultValue={sliderFruit} max={100} step={1} />
                  <Label htmlFor='fruit'>Fruité</Label>
                </div>
                  <Label htmlFor='wood'>Boisé</Label>
                <div className='flex'>
                  <Slider onValueChange={(e) => handleSliderWood(e)} defaultValue={sliderWood} max={100} step={1} />
                  <span className='w-16 pl-2'>{sliderWood} %</span>
                </div>
                <Label htmlFor='tannin'>Tannique</Label>
                <div className='flex'>
                  <Slider onValueChange={(e) => handleSliderTannin(e)} defaultValue={sliderTannin} max={100} step={1} />
                  <span className='w-16 pl-2'>{sliderTannin} %</span>
                </div>
              </div>
            </div>
            <div className='flex flex-col'>
              <Label className='pb-2'htmlFor='carafage'>Carafage</Label>
              <Input
                type='number'
                id='carafage'
                name='carafage'
                placeholder='Carafage'
                className="mt-1 w-full rounded-md text-base shadow-sm"
              />
            </div>
            <div className='flex flex-col'>
              <Label className='pb-2'htmlFor='temperature'>Température</Label>
              <Input
                type='number'
                id='temperature'
                name='temperature'
                placeholder='Température'
                className="mt-1 w-full rounded-md text-base shadow-sm"
              />
            </div>
            <div className='flex flex-col'>
              <Label className='pb-2'htmlFor='degree'>Degré</Label>
              <Input
                type='number'
                id='degree'
                name='degree'
                placeholder='Degré'
                className="mt-1 w-full rounded-md text-base shadow-sm"
              />
            </div>
            <div className='flex flex-col'>
              <Label className='pb-2'htmlFor='accompaniment'>Accompagnement</Label>
              <Input
                type='text'
                id='accompaniment'
                name='accompaniment'
                placeholder='Accompagnement'
                className="mt-1 w-full rounded-md text-base shadow-sm"
              />
            </div>
            <div className='flex flex-col'>
              <Label className='pb-2'htmlFor='media'>Média</Label>
              <Input
                type='text'
                id='media'
                name='media'
                placeholder='Média'
                className="mt-1 w-full rounded-md text-base shadow-sm"
              />
            </div>
            <div className='flex flex-col'>
              <Label className='pb-2'htmlFor='price'>Prix</Label>
              <Input
                type='number'
                id='price'
                name='price'
                placeholder='Prix'
                className="mt-1 w-full rounded-md text-base shadow-sm"
              />
            </div>
            <div className='flex flex-col'>
              <Label className='pb-2'htmlFor='price_visibility'>Visibilité du prix</Label>
              <Input
                type='number'
                id='price_visibility'
                name='price_visibility'
                placeholder='Visibilité du prix'
                className="mt-1 w-full rounded-md text-base shadow-sm"
              />
            </div>
            <div className='flex flex-col'>
              <Label className='pb-2'htmlFor='global_description'>Description globale</Label>
              <Input
                type='text'
                id='global_description'
                name='global_description'
                placeholder='Description globale'
                className="mt-1 w-full rounded-md text-base shadow-sm"
              />
            </div>
            <div className='flex flex-col'>
              <Label className='pb-2'htmlFor='entry_date'>Date d&apos;entrée</Label>
              <Input
                type='date'
                id='entry_date'
                name='entry_date'
                placeholder='Date d&apos;entrée'
                className="mt-1 w-full rounded-md text-base shadow-sm"
              />
            </div>
            <div className='flex flex-col'>
              <Label className='pb-2'htmlFor='potential_date'>Date de consommation</Label>
              <Input
                type='date'
                id='potential_date'
                name='potential_date'
                placeholder='Date de consommation'
                className="mt-1 w-full rounded-md text-base shadow-sm"
              />
            </div>
            <div className='flex flex-col'>
              <Label className='pb-2'htmlFor='quantity'>Quantité</Label>
              <Input
                type='number'
                id='quantity'
                name='quantity'
                placeholder='Quantité'
                className="mt-1 w-full rounded-md text-base shadow-sm"
              />
            </div>
            <div className='flex justify-center'>
              <Button
                type='submit'
                className='w-40 rounded-md p-2'
              >
                Ajouter
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
