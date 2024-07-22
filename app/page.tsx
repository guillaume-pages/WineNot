'use client';

import { useSession } from 'next-auth/react';
import { HeroSection } from '@/components/home/section/Hero';
import { About } from '@/components/home/section/About';
import { BenefitsSection } from '@/components/home/section/Benefits';
import { TestimonialSection } from '@/components/home/section/Testimonial';

export default function Page() {
  const { data } = useSession();
  
  const user = data?.user;



  return (
    <main>
      <HeroSection />
      <About />
      <BenefitsSection />
      <TestimonialSection />
    </main>
  );
}
