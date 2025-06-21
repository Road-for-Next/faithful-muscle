import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Dumbbell, RefreshCw } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { SetType } from '@/mock/column';

interface Props {
  values: { weight: string; reps: string };
  onChange: (name: keyof SetType, value: string) => void;
}

export default function RowSetForm({ values, onChange }: Props) {
  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange(name as keyof SetType, value);
  };

  return (
    <div
      className={cn(
        'animate-fade-in transition-all duration-300',
        'flex items-center gap-2',
        'h-9',
      )}
    >
      <div className="flex items-center gap-2">
        <Label className="flex items-center gap-1">
          <Dumbbell className="size-4" />
          <span className="w-7">중량</span>
        </Label>
        <Input
          name="weight"
          type="number"
          value={values.weight}
          placeholder="중량"
          onChange={handleChangeValue}
        />
      </div>
      <div className="flex items-center gap-2">
        <Label className="flex items-center gap-1">
          <RefreshCw className="size-4" />
          <span className="block w-7">반복</span>
        </Label>
        <Input
          name="reps"
          type="number"
          value={values.reps}
          placeholder="반복"
          onChange={handleChangeValue}
        />
      </div>
    </div>
  );
}
