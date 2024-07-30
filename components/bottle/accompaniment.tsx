import { useState, useContext } from "react";

import { BottleContext } from "@/app/context/BottleContext";

import { RxCross2 } from 'react-icons/rx';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const Accompaniment = () => {
  const { accompaniments, setAccompaniment } = useContext(BottleContext);

  const [inputValue, setInputValue] = useState('');

  const handleAddAccompaniment = () => {
    if (
      inputValue.trim() &&
      !accompaniments.includes(inputValue.trim())
    ) {
      setAccompaniment([...accompaniments, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleRemoveAccompaniment = (accompanimentToRemove: string) => {
    setAccompaniment(
      accompaniments.filter((accompaniment) => accompaniment !== accompanimentToRemove),
    );
  };

  return (
    <div className="flex flex-col">
      <Label className="pb-4 pt-2" htmlFor="accompaniment">
        Accompagnements
      </Label>
      <div className="flex w-full items-center gap-2">
        <Input
          className="flex-1"
          placeholder="eg: Fromage, viande..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button onClick={handleAddAccompaniment}>Ajouter</Button>
      </div>
      <div className="flex flex-wrap items-center gap-2 pt-2">
        {accompaniments.map((accompaniment, index) => (
          <Badge key={index}>
            {accompaniment}
            <Button size="nothing" onClick={() => handleRemoveAccompaniment(accompaniment)}>
              <RxCross2 />
            </Button>
          </Badge>
        ))}
      </div>
    </div>
  );
}