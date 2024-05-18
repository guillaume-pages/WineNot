import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

type SliderItemProps = {
  label: string;
  value: number[];
  onChange: (value: number[]) => void;
};

export const SliderItem = ({ label, value, onChange }: SliderItemProps) => (
  <div className="flex items-center space-x-2">
    <Slider
      className="w-[185px]"
      onValueChange={(e) => onChange(e)}
      defaultValue={value}
      max={100}
      step={1}
    />
    <Label className="text-xs">{label}</Label>
    <span className="w-[40px] text-xs">{`${value} %`}</span>
  </div>
);