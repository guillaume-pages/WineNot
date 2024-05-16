'use client';
import { useCallback, useEffect, useMemo, useState } from 'react';

import type { Cellar } from '@/types/cellar.type';
import PopoverAddCellar from '@/app/ui/cellar/popover-add-cellar';

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
  // const [activeCellar, setActiveCellar] = useState(cellars[0].cellars.cellar_name || '');
  // const [cellarId, setCellarId] = useState(cellars[0].cellars.cellar_id || '');
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
  const [activeCellar, setActiveCellar] = useState(
    defaultCellar.cellars.cellar_name,
  );
  const [cellarId, setCellarId] = useState(defaultCellar.cellars.cellar_id);

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
    () =>
      cellars.map((cellar: Cellar) => {
        return cellar.cellars.cellar_name;
      }),
    [cellars],
  );

  return (
    <>
      <section className="mx-auto flex max-w-7xl flex-col rounded-md border">
        <div className="flex space-x-4 border-b px-4 py-2">
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
          <PopoverAddCellar />
        </div>
        {cellars.length >= 1 ? (
          <div className="flex px-4 py-2">
            Vous consultez la cave : {activeCellarData?.cellars.cellar_name}
          </div>
        ) : (
          <div className="flex px-4 py-2">Veuillez créer une cave</div>
        )}

        {/* <div>
          <p>user_cellar_id : {cellars[0].user_cellar_id}</p>
          <p>user_id : {cellars[0].user_id}</p>
          <p>cellar_id : {cellars[0].cellars.cellar_id}</p>
          <p>cellar_name : {cellars[0].cellars.cellar_name}</p>
          <p>created_at : {cellars[0].cellars.created_at.toISOString()}</p>
          <p>updated_at : {cellars[0].cellars.updated_at?.toISOString()}</p>
          <p>deleted_at : {cellars[0].cellars.deleted_at?.toISOString()}</p>
          <p>bottles : {cellars[0].cellars.bottles}</p>
        </div> */}
        {activeCellarData && (
          <div>
            <p>user_cellar_id : {activeCellarData.user_cellar_id}</p>
            <p>user_id : {activeCellarData.user_id}</p>
            <p>cellar_id : {activeCellarData.cellars.cellar_id}</p>
            <p>cellar_name : {activeCellarData.cellars.cellar_name}</p>
            <p>
              created_at : {activeCellarData.cellars.created_at.toISOString()}
            </p>
            <p>
              updated_at : {activeCellarData.cellars.updated_at?.toISOString()}
            </p>
            <p>
              deleted_at : {activeCellarData.cellars.deleted_at?.toISOString()}
            </p>
            <p>bottles : {activeCellarData.cellars.bottles}</p>
          </div>
        )}
      </section>
    </>
  );
}
