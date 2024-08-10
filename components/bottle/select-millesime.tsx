import React, { useContext } from 'react';

import { BottleContext } from '@/app/context/BottleContext';

import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export const SelectMillesime = () => {
  const { bottleMillesime, setBottleMillesime } = useContext(BottleContext);

  const listYears = Array.from({ length: 45 }, (_, index) =>
    (2024 - index).toString(),
  );

  return (
    <div className="flex flex-col">
      <Label className="pb-4 pt-2">Millesime</Label>
      <Select onValueChange={(value) => setBottleMillesime(parseInt(value))}>
        <SelectTrigger aria-label="Selecteur millésime">
          <SelectValue placeholder="2024" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {listYears.map((year) => (
              <SelectItem key={year} value={year}>
                {year}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
