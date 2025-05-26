import { Dumbbell, RefreshCw, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { SetType } from '@/mock/column';

interface Props {
  sets: SetType[];
  onDelete: (index: number) => void;
}

export default function RowSetList({ sets, onDelete }: Props) {
  return (
    <div className={cn('flex flex-col gap-2', 'text-sm')}>
      {sets.map(({ weight, reps }, i) => (
        <div key={`${weight}-${reps}-${i}`} className="flex items-center">
          <div className="flex grow items-center gap-4">
            <div className="flex items-center gap-1">
              <Dumbbell className="size-4" />
              <span>중량 : {weight}</span>
            </div>
            <div className="flex items-center gap-1">
              <RefreshCw className="size-4" />
              <span>반복 : {reps}</span>
            </div>
          </div>
          <Button
            className={cn('size-6 cursor-pointer')}
            variant="ghost"
            onClick={() => onDelete(i)}
          >
            <X className="size-4" />
          </Button>
        </div>
      ))}
    </div>
  );
}
