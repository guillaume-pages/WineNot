import Link from "next/link"

export default function NoCellar() {
  return (
    <>
      <div className="flex justify-center items-center border rounded-md border-black bg-slate-100 w-4/5 h-80 mx-auto lg:w-[500px] lg:text-lg text-center">
        <div className="w-48 lg:w-52">
          Votre cave est vide, cliquez{' '}
            <Link
              href="/cellar/add"
            >
              <span className="text-orange-700 font-bold underline">ici</span>
            </Link>
            {' '}pour ajouter votre première bouteille !
        </div>
      </div>
    </>
  )
}
