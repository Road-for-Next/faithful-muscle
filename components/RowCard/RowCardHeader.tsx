import { ChevronUp } from 'lucide-react';
import {
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ExerciseType } from '@/mock/exercise';
import { cn } from '@/lib/utils';

interface Props {
  data?: ExerciseType;
  open: boolean;
  onToggle: () => void;
}

export default function RowCardHeader({ data, open, onToggle }: Props) {
  return (
    <CardHeader className="cursor-pointer px-0 select-none" onClick={onToggle}>
      <div className="flex items-center gap-2">
        <CardTitle>{data?.ko}</CardTitle>
        <CardDescription>{data?.en}</CardDescription>
      </div>
      <CardAction>
        <ChevronUp
          className={cn(
            'size-4',
            'transition-transform duration-300',
            'data-[open=true]:rotate-180',
          )}
          data-open={open}
        />
      </CardAction>
    </CardHeader>
  );
}
