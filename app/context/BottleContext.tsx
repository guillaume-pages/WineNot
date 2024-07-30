import React, { createContext, useState, ReactNode, FC } from 'react';
import { BottleContextType, Bottle } from '@/types/bottle.type';

const defaultValues: BottleContextType = {
  bottleName: '',
  setBottleName: () => {},
  bottleMillesime: 2024,
  setBottleMillesime: () => {},
  wineType: '',
  setWineType: () => {},
  bottleSize: '',
  setBottleSize: () => {},
  bottleDegree: 10,
  setBottleDegree: () => {},
  grapeVarieties: [],
  setGrapeVarieties: () => {},
  bottleRegion: '',
  setBottleRegion: () => {},
  bottleEyeDescription: '',
  setBottleEyeDescription: () => {},
  bottleNoseDescription: [],
  setBottleNoseDescription: () => {},
  sliderPower: [10],
  setSliderPower: () => {},
  sliderComplexity: [10],
  setSliderComplexity: () => {},
  sliderSpicy: [10],
  setSliderSpicy: () => {},
  sliderFruit: [10],
  setSliderFruit: () => {},
  sliderWood: [10],
  setSliderWood: () => {},
  sliderTanin: [10],
  setSliderTanin: () => {},
  carafage: 30,
  setCarafage: () => {},
  temperature: 16,
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
  bottleData: {} as Bottle,
  resetBottleData: () => {},
};

export const BottleContext = createContext<BottleContextType>(defaultValues);

interface BottleProviderProps {
  children: ReactNode;
}

export const BottleProvider: FC<BottleProviderProps> = ({ children }) => {
  // Values for bottleName, bottleYear, type of wine, size
  const [bottleName, setBottleName] = useState('');
  const [bottleMillesime, setBottleMillesime] = useState(2024);
  const [wineType, setWineType] = useState('');
  const [bottleSize, setBottleSize] = useState('');
  const [bottleDegree, setBottleDegree] = useState(10);

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
  const [carafage, setCarafage] = useState<number>(30);
  const [temperature, setTemperature] = useState<number>(16);

  // Value for accompaniment
  const [accompaniments, setAccompaniment] = useState<string[]>([]);

  // Value for bottle price
  const [bottlePrice, setBottlePrice] = useState<number>();
  const [visibilityPrice, setVisibilityPrice] = useState<number>(0);

  // Value for global description
  const [bottleGlobalDescription, setBottleGlobalDescription] = useState('');

  // Value for entry date and potential date
  const [bottleEntryDate, setBottleEntryDate] = useState<Date | string>('');
  const [bottlePotentialDate, setBottlePotentialDate] = useState<Date | string>('');

  // Value for bottle quantity
  const [bottleQuantity, setBottleQuantity] = useState<number>(6);

  // Value for global visibility
  const [globalVisibility, setGlobalVisibility] = useState<number>(0);

  // Value for bottle media
  const [bottleMedia, setBottleMedia] = useState<string>('');

  const bottleData: Bottle = {
  bottle_name: bottleName,
  millesime: bottleMillesime,
  type_of_wine: wineType,
  size: bottleSize,
  degree: bottleDegree,
  grape_varieties: grapeVarieties,
  region: bottleRegion,
  eye_description: bottleEyeDescription,
  nose_description: bottleNoseDescription,
  mouth_description: [
    sliderPower[0],
    sliderComplexity[0],
    sliderSpicy[0],
    sliderFruit[0],
    sliderWood[0],
    sliderTanin[0],
  ],
  carafage: carafage,
  temperature: temperature,
  accompaniment: accompaniments,
  media: bottleMedia,
  price: bottlePrice,
  price_visibility: visibilityPrice,
  global_description: bottleGlobalDescription,
  entry_date: bottleEntryDate,
  potential_date: bottlePotentialDate,
  quantity: bottleQuantity,
  global_visibility: globalVisibility,
  cellar_id: '',
};

console.log('bottleData', bottleData);

const resetBottleData = () => {
  setBottleName('');
  setBottleMillesime(2024);
  setWineType('');
  setBottleSize('');
  setBottleDegree(10);
  setGrapeVarieties([]);
  setBottleRegion('');
  setBottleEyeDescription('');
  setBottleNoseDescription([]);
  setSliderPower([70]);
  setSliderComplexity([37]);
  setSliderSpicy([43]);
  setSliderFruit([25]);
  setSliderWood([65]);
  setSliderTanin([88]);
  setCarafage(30);
  setTemperature(16);
  setAccompaniment([]);
  setBottlePrice(undefined);
  setVisibilityPrice(0);
  setBottleGlobalDescription('');
  setBottleEntryDate(new Date());
  setBottlePotentialDate(new Date());
  setBottleQuantity(6);
  setGlobalVisibility(0);
  setBottleMedia('');
}

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
        bottleDegree,
        setBottleDegree,
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
        bottleData,
        resetBottleData,
      }}
    >
      {children}
    </BottleContext.Provider>
  );
};
