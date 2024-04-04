import Link from 'next/link';
import Image from 'next/image';
import logo from '@/app/logo-grand.png'


export default function Page() {
  return (
    <main>
      <div>Un call to action en haut</div>
      <div>Cette page sera la landing page</div>
      <div>Une partie qui doit créer le besoin/répondre à la problématique</div>
      <div>Une partie qui doit présenter des fonctionnalités du site</div>
      <div>Un call to action ?</div>
      <div>Une partie avis</div>
      <div>Une partie pricing</div>
      <div>Un call to action en bas identique à celui du haut</div>
      <button>
        <Link href='/cave' >
        Cave
        </Link>
      </button>
    </main>
  );
}
