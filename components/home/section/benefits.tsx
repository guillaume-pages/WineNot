import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GrCubes } from "react-icons/gr";
import { FaChartLine } from "react-icons/fa6";
import { CiWallet } from "react-icons/ci";
import { TbSparkles } from "react-icons/tb";

interface BenefitsProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

const benefitList: BenefitsProps[] = [
  {
    icon: GrCubes,
    title: 'Build Brand Trust',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. A odio velit cum aliquam. Natus consectetur dolores.',
  },
  {
    icon: FaChartLine,
    title: 'More Leads',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. A odio velit cum aliquam, natus consectetur.',
  },
  {
    icon: CiWallet,
    title: 'Higher Conversions',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus consectetur. A odio velit cum aliquam',
  },
  {
    icon: TbSparkles,
    title: 'Test Marketing Ideas',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. A odio velit cum aliquam. Natus consectetur dolores.',
  },
];

export const BenefitsSection = () => {
  return (
    <section id="benefits" className="container py-24 sm:py-32">
      <div className="grid place-items-center lg:grid-cols-2 lg:gap-24">
        <div>
          <h2 className="mb-2 text-lg tracking-wider text-primary">
            Avantage, à-côté, atout, bénéfice, bien, bienfait, faveur, fruit,
            intérêt, profit, utilité
          </h2>

          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Pourquoi nous choisir ?
          </h2>
          <p className="mb-8 text-xl text-muted-foreground">
            Nous avons à coeur de vous offrir le meilleur service possible.
            C&apos;est pourquoi nous avons mis en place une série d&apos;avantages pour
            vous.
          </p>
        </div>

        <div className="grid w-full gap-4 lg:grid-cols-2">
          {benefitList.map(({ icon: IconComponent, title, description }, index) => (
            <Card
              key={title}
              className="group/number bg-muted/50 transition-all delay-75 hover:bg-background dark:bg-card"
            >
              <CardHeader>
                <div className="flex justify-between">
                  <IconComponent
                    size={32}
                    color="hsl(var(--primary))"
                    className="mb-6 text-primary"
                  />
                  <span className="text-muted-foreground/15 text-5xl font-medium transition-all delay-75 group-hover/number:text-muted-foreground/30">
                    0{index + 1}
                  </span>
                </div>

                <CardTitle>{title}</CardTitle>
              </CardHeader>

              <CardContent className="text-muted-foreground">
                {description}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
