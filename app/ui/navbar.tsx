'use client';
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import moyenLogo from '@/app/logo-moyen.png'

// // TODO: ajout d'un affichage d'une bulle avatar quand le user est connecté 
// // et à la place du bouton de connexion, un bouton de déconnexion et non affichage de l'inscription
// // la bulle renverra vers le profil du user

// // TODO: affichage de ma cave et profile uniquement si le user est connecté

// // TODO: affichage de tableau de bord si le user est un professionnel

// // TODO: affichage d'une barre sous la page pour indiquer la page actuelle

export default function Navbar() {
  return (
    <header className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-1 md:flex md:items-center md:gap-12">
            <Link href="/">
            <Image
              src={moyenLogo}
              alt="Logo entreprise Cavavin"
              width={64}
              height={64}
            />
            </Link>
          </div>

      <div className="md:flex md:items-center md:gap-12">
        <nav aria-label="Global" className="hidden md:block">
          <ul className="flex items-center gap-6 text-sm">
            <li>
              <Link className="text-gray-500 transition hover:text-gray-500/75" href="/cellar">MA CAVE</Link>
            </li>

            <li>
              <Link className="text-gray-500 transition hover:text-gray-500/75" href="/feed"> ACCUEIL </Link>
            </li>

            <li>
              <Link className="text-gray-500 transition hover:text-gray-500/75" href="/dashboard">TABLEAU DE BORD</Link>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <div className="sm:flex sm:gap-4">
            <Link
              className="rounded-md bg-orange-400 px-5 py-2.5 text-sm font-medium text-black shadow"
              href="/login"
            >
              Se connecter
            </Link>

            <div className="hidden sm:flex">
              <Link
                className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-orange-600"
                href="#"
              >
                S&apos;inscrire
              </Link>
            </div>
          </div>

          <div className="block md:hidden">
            <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</header>
    )
}