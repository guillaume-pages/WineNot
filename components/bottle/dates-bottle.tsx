import { useContext, useEffect } from 'react';


import { BottleContext } from '@/app/context/BottleContext';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export const DatesBottle = () => {
  const {
    bottleEntryDate,
    setBottleEntryDate,
    bottlePotentialDate,
    setBottlePotentialDate,
  } = useContext(BottleContext);

  useEffect(() => {
    setBottleEntryDate('')
    setBottlePotentialDate('')
    
    if (typeof bottleEntryDate === 'string' && bottleEntryDate.length === 10) {
      setBottleEntryDate(bottleEntryDate);
    }
    if (typeof bottlePotentialDate === 'string' && bottlePotentialDate.length === 10) {
      setBottlePotentialDate(bottlePotentialDate);
    }
  }, [bottleEntryDate, bottlePotentialDate, setBottleEntryDate, setBottlePotentialDate]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        <div>
          <Label>Date d&apos;entrée dans la cave</Label>
          <Input
            type="date"
            id="entry_date"
            value={bottleEntryDate as unknown as string}
            onChange={(e) => setBottleEntryDate(e.target.value)}
            placeholder="JJ/MM/AAAA"
          />
        </div>
        <div>
          <Label>Date d&apos;entrée dans la cave (optionnel)</Label>
          <Input
            type="date"
            id="potential_date"
            value={bottlePotentialDate as unknown as string}
            onChange={(e) => setBottlePotentialDate(e.target.value)}
            placeholder="JJ/MM/AAAA"
          />
        </div>
      </div>
    </div>
  );
};
