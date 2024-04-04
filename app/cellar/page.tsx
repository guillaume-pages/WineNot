import Link from "next/link"

export default function page() {
  return (
    <>
    <h1>La page qui permettra de visualiser sa cave</h1>
    <button>
      <Link href="/cellar/add">
        Page ajout bouteille
      </Link>
    </button>
    </>
  )
}
