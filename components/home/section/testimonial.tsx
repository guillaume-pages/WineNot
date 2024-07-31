'use client';

import Ellipse1 from '@/public/images/Ellipse-1.png';
import Ellipse2 from '@/public/images/Ellipse-2.png';
import Ellipse3 from '@/public/images/Ellipse-3.png';
import Ellipse4 from '@/public/images/Ellipse-4.png';
import Ellipse5 from '@/public/images/Ellipse-5.png';
import Ellipse6 from '@/public/images/Ellipse-6.png';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Star } from 'lucide-react';

interface ReviewProps {
  image: string;
  name: string;
  userName: string;
  comment: string;
  rating: number;
}

const reviewList: ReviewProps[] = [
  {
    image: 'https://github.com/shadcn.png',
    name: 'Jean Dupont',
    userName: 'Commercial',
    comment:
      'Wine Not est une application formidable ! Elle me permet de gérer ma cave à vin facilement et de suivre mes dégustations. Un must pour tout amateur de vin.',
    rating: 5.0,
  },
  {
    image: 'https://github.com/shadcn.png',
    name: 'Sophie Martin',
    userName: 'Étudiante',
    comment:
      "Cette application est super pratique pour suivre les vins que j'aime. L'interface est intuitive et les fonctionnalités sont parfaites pour les débutants.",
    rating: 4.8,
  },
  {
    image: 'https://github.com/shadcn.png',
    name: 'Mathieu Leroy',
    userName: 'Caviste',
    comment:
      "En tant que caviste, Wine Not m'aide à organiser ma collection personnelle et à découvrir de nouveaux vins. Je recommande vivement.",
    rating: 4.9,
  },
  {
    image: 'https://github.com/shadcn.png',
    name: 'Étienne Durand',
    userName: 'Vigneron',
    comment:
      'Wine Not est un outil génial pour suivre mes propres vins et comparer mes millésimes. Une application indispensable pour les professionnels du vin.',
    rating: 5.0,
  },
  {
    image: 'https://github.com/shadcn.png',
    name: 'Claire Lefèvre',
    userName: 'Infirmière',
    comment:
      "J'adore utiliser Wine Not pour gérer ma petite cave à vin à la maison. C'est simple d'utilisation et vraiment utile pour suivre mes préférences.",
    rating: 5.0,
  },
  {
    image: 'https://github.com/shadcn.png',
    name: 'Isabelle Petit',
    userName: 'Informaticienne',
    comment:
      "Wine Not me permet de garder une trace des vins que j'ai aimés et ceux que je veux essayer. L'application est claire et agréable à utiliser.",
    rating: 4.9,
  },
];

export const TestimonialSection = () => {
  return (
    <section id="testimonials" className="container py-24 sm:py-32">
      <div className="mb-8 text-center">
        <h2 className="mb-2 text-center text-lg tracking-wider text-primary">
          Avis
        </h2>

        <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">
          Ce que l&apos;on dit de nous
        </h2>
      </div>

      <Carousel
        opts={{
          align: 'start',
        }}
        className="relative mx-auto w-[80%] sm:w-[90%] lg:max-w-screen-xl"
      >
        <CarouselContent>
          {reviewList.map((review, index) => (
            <CarouselItem
              key={review.name}
              className="md:basis-1/2 lg:basis-1/3"
            >
              <Card className="bg-muted/50 dark:bg-card">
                <CardContent className="pb-0 pt-6">
                  <div className="flex gap-1 pb-6">
                    <Star className="size-4 fill-primary text-primary" />
                    <Star className="size-4 fill-primary text-primary" />
                    <Star className="size-4 fill-primary text-primary" />
                    <Star className="size-4 fill-primary text-primary" />
                    {index === 2 || index === 3 ? (
                      <Star className="size-4 fill-secondary text-secondary" />
                    ) : (
                      <Star className="size-4 fill-primary text-primary" />
                    )}
                  </div>
                  {`"${review.comment}"`}
                </CardContent>

                <CardHeader>
                  <div className="flex flex-row items-center gap-4">
                    <Avatar>
                      <AvatarImage
                        src="https://avatars.githubusercontent.com/u/75042455?v=4"
                        alt="radix"
                      />
                      <AvatarFallback>SV</AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col">
                      <CardTitle className="text-lg">{review.name}</CardTitle>
                      <CardDescription>{review.userName}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
};
