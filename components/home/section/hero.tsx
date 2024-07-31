'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';

import HeroDesktopView from '@/public/desktop-view.png';
import HeroMobileView from '@/public/smartphone-view.png';

export const HeroSection = () => {
  return (
    <section className="container w-full">
      <div className="mx-auto grid place-items-center gap-8 py-20 md:py-32 lg:max-w-screen-xl">
        <div className="space-y-8 text-center">
          <div className="mx-auto max-w-screen-md text-center text-4xl font-bold md:text-6xl">
            <h1>
              Faites l&apos;experience de
              <span className="bg-gradient-to-b from-primary/60 to-primary bg-clip-text px-2 text-transparent">
                Wine Not
              </span>
              votre nouvelle cave à vin
            </h1>
          </div>

          <p className="mx-auto max-w-screen-sm text-xl text-muted-foreground">
            {`Wine not, c'est votre nouvel outil qui vous permettra de savoir exactement ce que vous avez dans votre cave ! 
            Vous pourrez ainsi avoir votre cave dans votre poche ou depuis votre ordinateur.`}
          </p>

          <div className="space-y-4 md:space-x-4 md:space-y-0">
            <Link href="/register">
              <Button className="group/arrow w-5/6 font-bold md:w-1/4">
                Commencez
                <ArrowRight className="size-5 ml-2 transition-transform group-hover/arrow:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="group relative mt-14">
          <div className="absolute left-1/2 top-2 mx-auto h-24 w-[90%] -translate-x-1/2 transform rounded-full bg-primary/50 blur-3xl lg:-top-8 lg:h-80"></div>

          <div className="relative mx-auto flex w-full items-center rounded-lg border border-t-2 border-secondary border-t-primary/30 leading-none">
            <div className="block md:hidden">
              <Image
                width={1200}
                height={1200}
                className="rounded-lg"
                src={HeroMobileView}
                alt="dashboard mobile"
              />
            </div>
            <div className="hidden md:block">
              <Image
                width={1200}
                height={1200}
                className="rounded-lg"
                src={HeroDesktopView}
                alt="dashboard desktop"
              />
            </div>
          </div>

          <div className="absolute bottom-0 left-0 h-20 w-full rounded-lg bg-gradient-to-b from-background/0 via-background/50 to-background md:h-28"></div>
        </div>
      </div>
    </section>
  );
};
