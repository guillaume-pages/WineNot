'use client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';

import { deleteCellar } from '@/app/lib/cellar/cellar.delete';
import { modifCellarName } from '@/app/lib/cellar/cellar.put.name';

import type { Cellar } from '@/types/cellar.type';

import PopoverAddCellar from '@/components/cellar/popover-add-cellar';
import DisplayCellar from '@/components/cellar/display-cellar';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { IoTrashOutline } from 'react-icons/io5';
import { BiRename } from 'react-icons/bi';

interface SelectCellarProps {
  cellars: Cellar[];
}

export default function CellarDashboard({ cellars }: SelectCellarProps) {
  const [loading, setLoading] = useState(false);
  const [newCellarName, setNewCellarName] = useState('');
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

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

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteCellar(cellarId as string);
      toast.success('La cave a été supprimée avec succès');
      setIsPopoverOpen(false);
    } catch (error) {
      toast.error(
        'Erreur lors de la suppression de la cave. Veuillez réessayer.',
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRename = async () => {
    try {
      setLoading(true);
      await modifCellarName(cellarId as string, newCellarName);
      toast.success('La cave a été renommée avec succès');
    } catch (error) {
      toast.error('Erreur lors du renommage de la cave. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsPopoverOpen(false);
  };

  return (
    <section className="mx-auto my-6 flex max-w-5xl flex-col md:max-w-4xl lg:rounded-md lg:border lg:shadow-2xl">
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
            <div className="ml-2 flex items-center space-x-2">
              <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <PopoverTrigger>
                  <Button variant="secondary" size="littleIcon" onClick={() => setIsPopoverOpen(true)}>
                    <IoTrashOutline />
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <h3 className="pb-3 text-center text-base font-bold">
                    Êtes-vous sûr de vouloir supprimer cette cave ?
                  </h3>
                  <div className="flex justify-center space-x-4">
                    <Button
                      variant="destructive"
                      onClick={handleDelete}
                      disabled={loading}
                      size="sm"
                    >
                      Oui
                    </Button>
                    <Button variant="secondary" size="sm" onClick={handleCancel}>
                      Non
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
              <Popover>
                <PopoverTrigger>
                  <Button variant="secondary" size="littleIcon">
                    <BiRename />
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <h3 className="pb-3 text-center text-base font-bold">
                    Veuillez entrer un nouveau nom pour votre cave{' '}
                    <span className="text-sm">(minimum 4 caractères)</span>
                  </h3>
                  <Input
                    type="text"
                    placeholder="Nom de la cave"
                    name="cellar_name"
                    className="w-64 rounded-md border p-2"
                    onChange={(e) => setNewCellarName(e.target.value)}
                  />
                  <Button
                    variant="default"
                    className="mt-2 w-64 rounded-md p-2"
                    onClick={handleRename}
                    disabled={loading}
                  >
                    Renommer la cave
                  </Button>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        ) : (
          <div className="flex py-2">Veuillez créer une cave</div>
        )}
      </div>
      <div className="px-4 pb-14">
        {activeCellarData && (
          <>
            <div className="pb-6">
              <Button size="sm">
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
