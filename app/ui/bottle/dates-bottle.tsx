import { useContext } from 'react';

import { BottleContext } from '@/app/context/BottleContext';

import { Label } from '@/components/ui/label';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export const DatesBottle = () => {
  const {
    bottleEntryDate,
    setBottleEntryDate,
    bottlePotentialDate,
    setBottlePotentialDate,
  } = useContext(BottleContext);

  return (
    <div className="flex flex-col">
      <div className='flex flex-col'>
        <Label className="pb-4 pt-2" htmlFor="dates">
          Date d&apos;entrée dans la cave
        </Label>
        <div className="flex w-full items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className={cn(
                  'w-full justify-start text-left font-normal',
                  !bottleEntryDate && 'text-muted-foreground',
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {bottleEntryDate ? (
                  format(bottleEntryDate, 'PPP')
                ) : (
                  <span>Choisissez une date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={bottleEntryDate || new Date()}
                onSelect={(date) => setBottleEntryDate(date || new Date())}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className='flex flex-col'>
        <Label className="pb-4 pt-2" htmlFor="dates">
          Date de potentiel de garde
        </Label>
        <div className="flex w-full items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className={cn(
                  'w-full justify-start text-left font-normal',
                  !bottlePotentialDate && 'text-muted-foreground',
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {bottlePotentialDate ? (
                  format(bottlePotentialDate, 'PPP')
                ) : (
                  <span>Choisissez une date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={bottlePotentialDate || new Date()}
                onSelect={(date) => setBottlePotentialDate(date || new Date())}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};
