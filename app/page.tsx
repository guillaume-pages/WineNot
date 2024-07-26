import { HeroSection } from '@/components/home/section/hero';
import { About } from '@/components/home/section/about';
import { BenefitsSection } from '@/components/home/section/benefits';
import { TestimonialSection } from '@/components/home/section/testimonial';

export default function Page() {

  return (
    <main>
      <HeroSection />
      <About />
      <BenefitsSection />
      <TestimonialSection />
    </main>
  );
}
