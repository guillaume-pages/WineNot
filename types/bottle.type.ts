// types.ts

export interface Bottle {
  bottle_id: string;
  bottle_name: string;
  millesime: number;
  type_of_wine: string;
  size: string;
  grape_varieties: Record<string, any>;
  region: string;
  eye_description?: string;
  nose_description?: Record<string, any>;
  mouth_description?: Record<string, any>;
  carafage?: number;
  temperature?: number;
  degree?: number;
  accompaniment?: Record<string, any>;
  media?: string;
  price?: number;
  price_visibility?: number;
  global_description?: string;
  entry_date: Date;
  potential_date?: Date;
  quantity: number;
  global_visibility: number;
}

export interface BottleContextType {
  bottleName: string;
  setBottleName: (value: string) => void;
  bottleMillesime: string;
  setBottleMillesime: (value: string) => void;
  wineType: string;
  setWineType: (value: string) => void;
  bottleSize: string;
  setBottleSize: (value: string) => void;
  grapeVarieties: string[];
  setGrapeVarieties: (value: string[]) => void;
  bottleRegion: string;
  setBottleRegion: (value: string) => void;
  bottleEyeDescription: string;
  setBottleEyeDescription: (value: string) => void;
  bottleNoseDescription: string[];
  setBottleNoseDescription: (value: string[]) => void;
  sliderPower: number[];
  setSliderPower: (value: number[]) => void;
  sliderComplexity: number[];
  setSliderComplexity: (value: number[]) => void;
  sliderSpicy: number[];
  setSliderSpicy: (value: number[]) => void;
  sliderFruit: number[];
  setSliderFruit: (value: number[]) => void;
  sliderWood: number[];
  setSliderWood: (value: number[]) => void;
  sliderTanin: number[];
  setSliderTanin: (value: number[]) => void;
  carafage: string;
  setCarafage: (value: string) => void;
  temperature: string;
  setTemperature: (value: string) => void;
}
