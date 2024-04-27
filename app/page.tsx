'use client';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function Page() {
  const { data } = useSession();
  
  const user = data?.user;

 

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
      {user && <div>Je suis connecté en tant que {user.email} </div>}
      {!user && <div>Je ne suis pas connecté </div>}
      <button className="btn">Button</button>
      <button className="btn btn-primary">Button</button>
    </main>
  );
}
