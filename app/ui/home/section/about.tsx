import Image from 'next/image';
import { Statistics } from '@/app/ui/home/section/statistics';
import logo from '@/app/logo-petit.png';

export const About = () => {
  return (
    <section id="about" className="container py-24 sm:py-32">
      <div className="rounded-lg border bg-muted/50 py-12">
        <div className="flex flex-col-reverse gap-8 px-6 md:flex-row md:gap-12">
          <Image
            src={logo}
            alt="Logo de la compagnie"
            height={300}
            width={300}
            className="rounded-lg object-contain"
          />
          <div className="bg-green-0 flex flex-col justify-between">
            <div className="pb-6">
              <h2 className="text-3xl font-bold md:text-4xl">
                <span className="bg-gradient-to-b from-primary/60 to-primary bg-clip-text text-transparent">
                  A propos{' '}
                </span>
                de nous
              </h2>
              <p className="mt-4 text-xl text-muted-foreground">
                Wine Not est une application qui vient d&apos;un constat personnel. Il est difficile de 
                gérer sa cave à vin et de savoir ce que l&apos;on a en stock. Wine Not vous permet de
                gérer votre cave à vin et de suivre les caves de vos amis et de votre caviste préféré.
              </p>
            </div>

            <Statistics />
          </div>
        </div>
      </div>
    </section>
  );
};
