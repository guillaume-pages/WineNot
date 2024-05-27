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
  bottleEntryDate: new Date(),
  setBottleEntryDate: () => {},
  bottlePotentialDate: new Date(),
  setBottlePotentialDate: () => {},
  bottleQuantity: (1),
  setBottleQuantity: () => {},
  globalVisibility: 0,
  setGlobalVisibility: () => {},
  bottleMedia: '',
  setBottleMedia: () => {},
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

  // Value for entry date and potential date
  const [bottleEntryDate, setBottleEntryDate] = useState<Date>(new Date());
  const [bottlePotentialDate, setBottlePotentialDate] = useState<Date>(new Date());

  // Value for bottle quantity
  const [bottleQuantity, setBottleQuantity] = useState<number>(6);

  // Value for global visibility
  const [globalVisibility, setGlobalVisibility] = useState<number>(0);

  // Value for bottle media
  const [bottleMedia, setBottleMedia] = useState<string>('');

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
    bottleEntryDate,
    bottlePotentialDate,
    bottleQuantity,
    globalVisibility,
    bottleMedia,
  };

  console.log("data to send", dataToSend);

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
        bottleGlobalDescription,
        setBottleGlobalDescription,
        bottleEntryDate,
        setBottleEntryDate,
        bottlePotentialDate,
        setBottlePotentialDate,
        bottleQuantity,
        setBottleQuantity,
        globalVisibility,
        setGlobalVisibility,
        bottleMedia,
        setBottleMedia,
      }}
    >
      {children}
    </BottleContext.Provider>
  );
};
