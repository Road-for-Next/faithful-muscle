import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Dumbbell, RefreshCw, Footprints, Timer } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { SetType } from '@/mock/column';
import { isCardio } from '@/mock/exercise';

interface Props {
  exerciseId: string;
  values: { weight: string; reps: string };
  onChange: (name: keyof SetType, value: string) => void;
}

export default function RowSetForm({ exerciseId, values, onChange }: Props) {
  const isCardioExercise = isCardio(exerciseId);
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
          {isCardioExercise ? (
            <Footprints className="size-4" />
          ) : (
            <Dumbbell className="size-4" />
          )}
          <span className="w-7">{isCardioExercise ? '거리' : '중량'}</span>
        </Label>
        <Input
          name="weight"
          type="number"
          step={isCardioExercise ? 0.1 : 1}
          value={values.weight}
          placeholder={isCardioExercise ? 'km' : 'kg'}
          onChange={handleChangeValue}
        />
      </div>
      <div className="flex items-center gap-2">
        <Label className="flex items-center gap-1">
          {isCardioExercise ? (
            <Timer className="size-4" />
          ) : (
            <RefreshCw className="size-4" />
          )}
          <span className="block w-7">
            {isCardioExercise ? '시간' : '반복'}
          </span>
        </Label>
        <Input
          name="reps"
          type="number"
          value={values.reps}
          placeholder={isCardioExercise ? '분' : '회'}
          onChange={handleChangeValue}
        />
      </div>
    </div>
  );
}
