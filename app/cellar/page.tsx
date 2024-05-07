import ModalAddCellar from "../ui/cellar/modal-add-cellar";

export default function Cellar() {

  return (
    <>
      <section className="flex flex-col mx-auto border border-neutral rounded-md max-w-7xl">
        <div className="border-b border-neutral">
          <select>
            <option value="1">Cave 1</option>
            <option value="2">Cave 2</option>
            <option value="3">Cave 3</option>
            <option value="4">Cave 4</option>
          </select>
          <ModalAddCellar />
        </div>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae dolore maiores asperiores numquam corrupti. Non odit eius minus! Vitae, aliquam mollitia. Qui reprehenderit unde dolor.
      </section>
    </>
  );
}
