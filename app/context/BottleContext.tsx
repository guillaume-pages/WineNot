import React, { createContext, useState, ReactNode, FC } from 'react';
import { BottleContextType } from '@/types/bottle.type';

const defaultValues: BottleContextType = {
  bottleName: '',
  setBottleName: () => {},
  bottleMillesime: '',
  setBottleMillesime: () => {},
  wineType: '',
  setWineType: () => {},
  bottleSize: '',
  setBottleSize: () => {},
  grapeVarieties: [],
  setGrapeVarieties: () => {},
  bottleRegion: '',
  setBottleRegion: () => {},
  bottleEyeDescription: '',
  setBottleEyeDescription: () => {},
  bottleNoseDescription: [],
  setBottleNoseDescription: () => {},
  sliderPower: [70],
  setSliderPower: () => {},
  sliderComplexity: [37],
  setSliderComplexity: () => {},
  sliderSpicy: [43],
  setSliderSpicy: () => {},
  sliderFruit: [25],
  setSliderFruit: () => {},
  sliderWood: [65],
  setSliderWood: () => {},
  sliderTanin: [88],
  setSliderTanin: () => {},
  carafage: '',
  setCarafage: () => {},
  temperature: '',
  setTemperature: () => {},
  accompaniments: [],
  setAccompaniment: () => {},
  bottlePrice: undefined,
  setBottlePrice: () => {},
  visibilityPrice: 0,
  setVisibilityPrice: () => {},
  bottleGlobalDescription: '',
  setBottleGlobalDescription: () => {},
};

export const BottleContext = createContext<BottleContextType>(defaultValues);

interface BottleProviderProps {
  children: ReactNode;
}

export const BottleProvider: FC<BottleProviderProps> = ({ children }) => {
  // Values for bottleName, bottleYear, type of wine, size
  const [bottleName, setBottleName] = useState('');
  const [bottleMillesime, setBottleMillesime] = useState('');
  const [wineType, setWineType] = useState('');
  const [bottleSize, setBottleSize] = useState('');

  // Value for grape varieties
  const [grapeVarieties, setGrapeVarieties] = useState<string[]>([]);

  // Value for bottle region
  const [bottleRegion, setBottleRegion] = useState('');

  // Value for bottle eye description
  const [bottleEyeDescription, setBottleEyeDescription] = useState('');

  // Value for bottle nose description
  const [bottleNoseDescription, setBottleNoseDescription] = useState<string[]>([]);

  // Values for each slider
  const [sliderPower, setSliderPower] = useState([70]);
  const [sliderComplexity, setSliderComplexity] = useState([37]);
  const [sliderSpicy, setSliderSpicy] = useState([43]);
  const [sliderFruit, setSliderFruit] = useState([25]);
  const [sliderWood, setSliderWood] = useState([65]);
  const [sliderTanin, setSliderTanin] = useState([88]);

  // Values for service : carafage and temperature
  const [carafage, setCarafage] = useState<string>('');
  const [temperature, setTemperature] = useState<string>('');

  // Value for accompaniment
  const [accompaniments, setAccompaniment] = useState<string[]>([]);

  // Value for bottle price
  const [bottlePrice, setBottlePrice] = useState<number>();
  const [visibilityPrice, setVisibilityPrice] = useState<number>(0);

  // Value for global description
  const [bottleGlobalDescription, setBottleGlobalDescription] = useState('');

  // Values to send to the API

  const dataToSend = {
    bottleName,
    bottleMillesime,
    wineType,
    bottleSize,
    grapeVarieties,
    bottleRegion,
    bottleEyeDescription,
    bottleNoseDescription,
    sliderPower,
    sliderComplexity,
    sliderSpicy,
    sliderFruit,
    sliderWood,
    sliderTanin,
    carafage,
    temperature,
    accompaniments,
    bottlePrice,
    visibilityPrice,
    bottleGlobalDescription,
  };

  console.log(dataToSend);

  return (
    <BottleContext.Provider
      value={{
        bottleName,
        setBottleName,
        bottleMillesime,
        setBottleMillesime,
        wineType,
        setWineType,
        bottleSize,
        setBottleSize,
        grapeVarieties,
        setGrapeVarieties,
        bottleRegion,
        setBottleRegion,
        bottleEyeDescription,
        setBottleEyeDescription,
        bottleNoseDescription,
        setBottleNoseDescription,
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
        carafage,
        setCarafage,
        temperature,
        setTemperature,
        accompaniments,
        setAccompaniment,
        bottlePrice,
        setBottlePrice,
        visibilityPrice,
        setVisibilityPrice,
        setBottleGlobalDescription
      }}
    >
      {children}
    </BottleContext.Provider>
  );
};
