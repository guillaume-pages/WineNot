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
  sliderPower: [50],
  setSliderPower: () => {},
  sliderComplexity: [50],
  setSliderComplexity: () => {},
  sliderSpicy: [50],
  setSliderSpicy: () => {},
  sliderFruit: [50],
  setSliderFruit: () => {},
  sliderWood: [50],
  setSliderWood: () => {},
  sliderTanin: [50],
  setSliderTanin: () => {},
  carafage: 0,
  setCarafage: () => {},
  temperature: 10,
  setTemperature: () => {},
  accompaniments: [],
  setAccompaniment: () => {},
  bottlePrice: 5,
  setBottlePrice: () => {},
  visibilityPrice: 0,
  setVisibilityPrice: () => {},
  bottleGlobalDescription: '',
  setBottleGlobalDescription: () => {},
  bottleEntryDate: new Date(),
  setBottleEntryDate: () => {},
  bottlePotentialDate: new Date(),
  setBottlePotentialDate: () => {},
  bottleQuantity: 1,
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
  const [bottleNoseDescription, setBottleNoseDescription] = useState<string[]>(
    [],
  );

  // Values for each slider
  const [sliderPower, setSliderPower] = useState([50]);
  const [sliderComplexity, setSliderComplexity] = useState([50]);
  const [sliderSpicy, setSliderSpicy] = useState([50]);
  const [sliderFruit, setSliderFruit] = useState([50]);
  const [sliderWood, setSliderWood] = useState([50]);
  const [sliderTanin, setSliderTanin] = useState([50]);

  // Values for service : carafage and temperature
  const [carafage, setCarafage] = useState<number>(30);
  const [temperature, setTemperature] = useState<number>(16);

  // Value for accompaniment
  const [accompaniments, setAccompaniment] = useState<string[]>([]);

  // Value for bottle price
  const [bottlePrice, setBottlePrice] = useState<number>(5);
  const [visibilityPrice, setVisibilityPrice] = useState<number>(2);

  // Value for global description
  const [bottleGlobalDescription, setBottleGlobalDescription] = useState('');

  // Value for entry date and potential date
  const [bottleEntryDate, setBottleEntryDate] = useState<Date | string>('');
  const [bottlePotentialDate, setBottlePotentialDate] = useState<Date | string>(
    '',
  );

  // Value for bottle quantity
  const [bottleQuantity, setBottleQuantity] = useState<number>(6);

  // Value for global visibility
  const [globalVisibility, setGlobalVisibility] = useState<number>(2);

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

  const resetBottleData = () => {
    setBottleName('');
    setBottleMillesime(2024);
    setWineType('Rouge');
    setBottleSize('Standard 75 cl');
    setBottleDegree(10);
    setGrapeVarieties([]);
    setBottleRegion('');
    setBottleEyeDescription('');
    setBottleNoseDescription([]);
    setSliderPower([50]);
    setSliderComplexity([50]);
    setSliderSpicy([50]);
    setSliderFruit([50]);
    setSliderWood([50]);
    setSliderTanin([50]);
    setCarafage(0);
    setTemperature(10);
    setAccompaniment([]);
    setBottlePrice(5);
    setVisibilityPrice(2);
    setBottleGlobalDescription('');
    setBottleEntryDate(new Date());
    setBottlePotentialDate(new Date());
    setBottleQuantity(6);
    setGlobalVisibility(2);
    setBottleMedia('');
  };

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
