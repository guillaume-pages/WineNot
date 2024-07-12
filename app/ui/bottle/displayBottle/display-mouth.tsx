import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Progress } from "@/components/ui/progress"


const SliderItem = ({ label, value }: { label: string; value: number }) => (
  <div className="flex items-center space-x-2">
    <Progress className='w-40' value={value} />
    <Label className="text-xs">{label}</Label>
    <span className="w-[40px] text-xs">{`${value} %`}</span>
  </div>
);

export const DisplayMouth = ({
  mouthDescription,
}: {
  mouthDescription: number[] | undefined;
}) => {
  const sliderPower = mouthDescription ? mouthDescription[0] : 0;
  const sliderComplexity = mouthDescription ? mouthDescription[1] : 0;
  const sliderSpicy = mouthDescription ? mouthDescription[2] : 0;
  const sliderFruit = mouthDescription ? mouthDescription[3] : 0;
  const sliderWood = mouthDescription ? mouthDescription[4] : 0;
  const sliderTanin = mouthDescription ? mouthDescription[5] : 0;

  const slidersConfig = [
    { label: 'Puissance', value: sliderPower },
    {
      label: 'Complexité',
      value: sliderComplexity,
    },
    { label: 'Epicé', value: sliderSpicy },
    { label: 'Fruité', value: sliderFruit },
    { label: 'Boisé', value: sliderWood },
    { label: 'Tannique', value: sliderTanin },
  ];
  return (
    <>
      <div className="space-y-2">
        {slidersConfig.map((slider, index) => (
          <SliderItem
            key={index}
            label={slider.label}
            value={slider.value}
          />
        ))}
      </div>
    </>
  );
};
