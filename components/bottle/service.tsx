import { useContext } from 'react';
import Image from 'next/image';

import { BottleContext } from '@/app/context/BottleContext';

import { Label } from '@/components/ui/label';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

import carafe from '@/public/images/carafe.png';
import thermometer from '@/public/images/thermometer.png';

export const Service = () => {
  const { carafage, setCarafage, temperature, setTemperature } =
    useContext(BottleContext);

  const minutes = [
    '0',
    '5',
    '10',
    '15',
    '20',
    '25',
    '30',
    '35',
    '40',
    '45',
    '50',
    '55',
    '60',
    '65',
    '70',
    '75',
    '80',
    '85',
    '90',
    '95',
    '100',
    '105',
    '110',
    '115',
    '120',
  ];

  const temperatures = [
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
  ];

  return (
    <div className="flex flex-col">
      <Label className="pb-4 pt-2" htmlFor="service">
        Service (optionnel)
      </Label>
      <div className="flex space-x-2">
        <div className="flex space-x-2">
          <Image src={carafe} alt="Carafe" />
          <div className="self-end">
            <Select onValueChange={(value) => setCarafage(parseInt(value))}>
              <SelectTrigger>
                <SelectValue placeholder="... min">{carafage} min</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {minutes.map((minute) => (
                  <SelectItem key={minute} value={minute}>
                    {minute} min
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex space-x-2">
          <Image src={thermometer} alt="thermomètre" />
          <div className="self-end">
            <Select onValueChange={(value) => setTemperature(parseInt(value))}>
              <SelectTrigger>
                <SelectValue placeholder="... °C">
                  {temperature} °C
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {temperatures.map((temperature) => (
                  <SelectItem key={temperature} value={temperature}>
                    {temperature} °C
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};
