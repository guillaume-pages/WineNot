import { getCellars } from '../lib/cellar/cellar.get';

import PopoverAddCellar from '../ui/cellar/popover-add-cellar';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default async function Cellar() {
  const cellars = await getCellars();
  console.log(cellars);

  const cellarNameList = cellars.map((cellar) => {
    return cellar.cellars.cellar_name;
  });
  console.log(cellarNameList);

  return (
    <>
      <section className="mx-auto flex max-w-7xl flex-col rounded-md border">
        <div className="flex space-x-4 border-b px-4 py-2">
            <Select>
              <SelectTrigger className="w-[220px]">
                <SelectValue placeholder="Selectionnez une cave" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Mes caves</SelectLabel>
                  {cellarNameList.map((cellarName, index) => {
                    return <SelectItem key={index} value={cellarName as string}>{cellarName}</SelectItem>;
                  }
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          <PopoverAddCellar />
        </div>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae dolore
        maiores asperiores numquam corrupti. Non odit eius minus! Vitae, aliquam
        mollitia. Qui reprehenderit unde dolor. Lorem, ipsum dolor sit amet
        consectetur adipisicing elit. Dolore voluptas quis, temporibus ipsum,
        cupiditate voluptates ducimus culpa corrupti eligendi necessitatibus
        assumenda at eaque ab cum laboriosam et enim illum, deleniti recusandae
        quod hic accusamus doloribus omnis esse. Repudiandae minima dolores, ab
        est, facere, facilis quasi saepe in perspiciatis porro eligendi.
        Suscipit aut perferendis cupiditate veniam numquam obcaecati beatae,
        vitae adipisci eius debitis magni repellat optio. Autem voluptatem illo
        fugit, sed expedita molestiae laboriosam tempore explicabo nulla harum
        earum vel eligendi quo quis quas laborum id! Placeat cum alias ipsa.
        Ullam, delectus totam eveniet quisquam, perspiciatis vero necessitatibus
        est rem vitae voluptatum, blanditiis dolorum ab magni doloribus tempora
        voluptates eligendi? Placeat, aspernatur dignissimos ullam mollitia
        recusandae dolorem. Iure, soluta eaque sint nostrum consequatur, vitae,
        facilis laudantium perferendis in dolor maxime autem nemo ducimus
        adipisci neque quo! Nemo aut esse culpa. Nostrum quo, neque eum iusto
        vitae, esse commodi magni quidem itaque amet voluptas delectus? Non
        voluptatem molestiae deserunt quae corrupti. Enim commodi exercitationem
        natus, consequatur laboriosam fugiat ex sed, tenetur iste illo
        voluptatem! Sapiente maiores vel illo placeat porro nisi error id
        voluptatem in autem debitis, quidem exercitationem facilis, iure,
        incidunt a numquam! Cum atque incidunt saepe commodi alias, quae quod.
      </section>
    </>
  );
}
