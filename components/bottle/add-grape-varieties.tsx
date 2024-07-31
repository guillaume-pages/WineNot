import { useState, useContext } from 'react';

import { RxCross2 } from 'react-icons/rx';

import { BottleContext } from '@/app/context/BottleContext';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const AddGrapeVarieties = () => {
  const { grapeVarieties, setGrapeVarieties } = useContext(BottleContext);
  const [inputValue, setInputValue] = useState('');

  const handleAddGrapeVarietie = () => {
    if (inputValue.trim() && !grapeVarieties.includes(inputValue.trim())) {
      setGrapeVarieties([...grapeVarieties, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleRemoveGrapeVarietie = (grapeVarietieToRemove: string) => {
    setGrapeVarieties(
      grapeVarieties.filter(
        (grapeVarietie) => grapeVarietie !== grapeVarietieToRemove,
      ),
    );
  };

  return (
    <div className="flex flex-col">
      <Label className="pb-4 pt-2" htmlFor="grape_varieties">
        Cépages (optionnel)
      </Label>
      <div className="flex w-full items-center gap-2">
        <Input
          className="flex-1"
          placeholder="eg: Syrah, Grenache..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button onClick={handleAddGrapeVarietie}>Ajouter</Button>
      </div>
      <div className="flex flex-wrap items-center gap-2 pt-2">
        {grapeVarieties.map((grapeVarietie, index) => (
          <Badge key={index}>
            {grapeVarietie}
            <Button
              size="nothing"
              onClick={() => handleRemoveGrapeVarietie(grapeVarietie)}
            >
              <RxCross2 />
            </Button>
          </Badge>
        ))}
      </div>
    </div>
  );
};
