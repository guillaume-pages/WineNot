import { useState, useContext } from 'react';

import { BottleContext } from '@/app/context/BottleContext';

import { Label } from '@/components/ui/label';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

export const SelectSizeWine = () => {
  const { bottleSize, setBottleSize } = useContext(BottleContext);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        <Label className="pb-4 pt-2" htmlFor="size_bottle">
          Taille de la bouteille
        </Label>
      </div>
      <Select onValueChange={(value) => setBottleSize(value)}>
        <SelectTrigger>
          <SelectValue placeholder="Standard, Magnum...">
            {bottleSize}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Standard 75 cl">Standard 75 cl</SelectItem>
          <SelectItem value="Magnum 1.5 L">Magnum 1.5 L</SelectItem>
          <SelectItem value="Jéroboam 3 L">Jéroboam 3 L</SelectItem>
          <SelectItem value="Réhoboam 4.5 L">Réhoboam 4.5 L</SelectItem>
          <SelectItem value="Mathusalem 6 L">Mathusalem 6 L</SelectItem>
          <SelectItem value="Salmanazar 9 L">Salmanazar 9 L</SelectItem>
          <SelectItem value="Balthazar 12 L">Balthazar 12 L</SelectItem>
          <SelectItem value="Nabuchodonosor 15 L">
            Nabuchodonosor 15 L
          </SelectItem>
          <SelectItem value="Melchior 18 L">Melchior 18 L</SelectItem>
          <SelectItem value="Solomon 20 L">Solomon 20 L</SelectItem>
          <SelectItem value="Souverain 25 L">Souverain 25 L</SelectItem>
          <SelectItem value="Primat 27 L">Primat 27 L</SelectItem>
          <SelectItem value="Melchiesedech 30 L">Melchiesedech 30 L</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
