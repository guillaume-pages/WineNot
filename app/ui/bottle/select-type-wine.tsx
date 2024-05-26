import { useContext } from 'react';

import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { BottleContext } from '@/app/context/BottleContext';

export const SelectTypeWine = () => {
  const { wineType, setWineType } = useContext(BottleContext);

  return (
    <div className="flex flex-col">
      <Label className='pb-4 pt-2'>Type de vin</Label>
      <Select onValueChange={(value) => setWineType(value)}>
        <SelectTrigger>
          <SelectValue placeholder="Rouge, Blanc...">{wineType}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Rouge">Rouge</SelectItem>
          <SelectItem value="Blanc">Blanc</SelectItem>
          <SelectItem value="Rosé">Rosé</SelectItem>
          <SelectItem value="Champagne">Champagne</SelectItem>
          <SelectItem value="Crémant">Crémant</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
