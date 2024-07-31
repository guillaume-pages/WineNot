import { useState, useContext } from 'react';

import { RxCross2 } from 'react-icons/rx';

import { BottleContext } from '@/app/context/BottleContext';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const AddNoseDescription = () => {
  const { bottleNoseDescription, setBottleNoseDescription } =
    useContext(BottleContext);
  const [inputValue, setInputValue] = useState('');

  const handleAddNose = () => {
    if (
      inputValue.trim() &&
      !bottleNoseDescription.includes(inputValue.trim())
    ) {
      setBottleNoseDescription([...bottleNoseDescription, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleRemoveNose = (noseToRemove: string) => {
    setBottleNoseDescription(
      bottleNoseDescription.filter((nose) => nose !== noseToRemove),
    );
  };

  return (
    <div className="flex flex-col">
      <Label className="pb-4 pt-2" htmlFor="grape_varieties">
        Description olfactive (optionnel)
      </Label>
      <div className="flex w-full items-center gap-2">
        <Input
          className="flex-1"
          placeholder="eg: Fruits rouges, épices..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button onClick={handleAddNose}>Ajouter</Button>
      </div>
      <div className="flex flex-wrap items-center gap-2 pt-2">
        {bottleNoseDescription.map((nose, index) => (
          <Badge key={index}>
            {nose}
            <Button size="nothing" onClick={() => handleRemoveNose(nose)}>
              <RxCross2 />
            </Button>
          </Badge>
        ))}
      </div>
    </div>
  );
};
