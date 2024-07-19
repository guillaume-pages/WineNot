'use client';

import { useSession } from 'next-auth/react';
import { HeroSection } from './ui/home/section/hero';
import { About } from './ui/home/section/about';
import { BenefitsSection } from './ui/home/section/benefits';
import { TestimonialSection } from './ui/home/section/testimonial';

export default function Page() {
  const { data } = useSession();
  
  const user = data?.user;



  return (
    <main>
      <HeroSection />
      <About />
      <BenefitsSection />
      <TestimonialSection />
      {/* <div>Un call to action en haut</div>
      <div>Cette page sera la landing page</div>
      <div>Une partie qui doit créer le besoin/répondre à la problématique</div>
      <div>Une partie qui doit présenter des fonctionnalités du site</div>
      <div>Un call to action ?</div>
      <div>Une partie avis</div>
      <div>Une partie pricing</div>
      <div>Un call to action en bas identique à celui du haut</div> */}
    </main>
  );
}
