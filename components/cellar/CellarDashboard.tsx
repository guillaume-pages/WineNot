'use client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import type { Cellar } from '@/types/cellar.type';
import PopoverAddCellar from '@/components/cellar/PopoverAddCellar';
import DisplayCellar from './DisplayCellar';
import { Button } from '@/components/ui/button';
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

export default function CellarDashboard({ cellars }: SelectCellarProps) {
  const defaultCellar =
    cellars.length > 0
      ? cellars[0]
      : {
          user_cellar_id: '',
          user_id: '',
          cellars: {
            cellar_id: '',
            cellar_name: '',
            created_at: new Date(),
            updated_at: null,
            deleted_at: null,
            bottles: [],
          },
        };

  const [activeCellar, setActiveCellar] = useState<string | null>(
    defaultCellar.cellars.cellar_name || null,
  );
  const [cellarId, setCellarId] = useState<string | null>(
    defaultCellar.cellars.cellar_id || null,
  );

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

  const activeCellarData = useMemo(() => {
    return cellars.find((cellar) => cellar.cellars.cellar_id === cellarId);
  }, [cellars, cellarId]);

  const cellarNameList = useMemo(
    () => cellars.map((cellar: Cellar) => cellar.cellars.cellar_name),
    [cellars],
  );

  return (
    <section className="mx-auto mt-6 flex flex-col max-w-5xl md:max-w-4xl lg:border lg:rounded-md">
      <div className="flex space-x-4 px-4 pb-2 pt-6 lg:border-b">
        <Select onValueChange={handleValueChange}>
          <SelectTrigger className="w-[220px]">
            <SelectValue
              placeholder={
                cellars.length >= 1
                  ? 'Sélectionnez une cave'
                  : 'Veuillez créer une cave'
              }
            />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Mes caves</SelectLabel>
              {cellarNameList.map((cellarName, index) => (
                <SelectItem key={index} value={cellarName as string}>
                  {cellarName}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <PopoverAddCellar />
      </div>
      <div className="px-4">
        {cellars.length >= 1 ? (
          <div className="flex py-2">
            Vous consultez la cave : {activeCellarData?.cellars.cellar_name}
          </div>
        ) : (
          <div className="flex py-2">Veuillez créer une cave</div>
        )}
      </div>
      <div className="px-4 pb-14">
        {activeCellarData && (
          <>
            <div className="pb-6">
              <Button>
                <Link
                  href={`/cellar/add/${activeCellarData.cellars.cellar_id}`}
                >
                  Ajouter une bouteille
                </Link>
              </Button>
            </div>
            <DisplayCellar cellar={activeCellarData} />
          </>
        )}
      </div>
    </section>
  );
}
