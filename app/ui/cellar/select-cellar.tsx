'use client';
import { use, useCallback, useEffect, useMemo, useState } from 'react';

import type { Cellar } from '@/types/cellar.type';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface SelectCellarProps {
  cellars: Cellar[];
}

export default function SelectCellar({ cellars }: SelectCellarProps) {  
  const [activeCellar, setActiveCellar] = useState('');
  const [cellarId, setCellarId] = useState('');

  useEffect(() => {
    const selectedCellar = cellars.find((cellar: Cellar) => {
      return cellar.cellars.cellar_name === activeCellar;
    });

    if (selectedCellar) {
      setCellarId(selectedCellar.cellars.cellar_id);
    }
  }, [activeCellar, cellars]);

  const handleValueChange = useCallback((value: string) => {
    setActiveCellar(value);
  }, []);

  const cellarNameList = useMemo(() => cellars.map((cellar: Cellar) => {
    return cellar.cellars.cellar_name;
  }), [cellars]);
  
  return (
    <>
      <Select onValueChange={handleValueChange}>
        <SelectTrigger className="w-[220px]">
          <SelectValue placeholder="Selectionnez une cave" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Mes caves</SelectLabel>
            {cellarNameList.map((cellarName, index) => {
              return (
                <SelectItem key={index} value={cellarName as string}>
                  {cellarName}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
      <div>nom de la cave : {activeCellar} & id : {cellarId}</div>
    </>
  );
}
