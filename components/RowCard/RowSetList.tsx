import { Dumbbell, RefreshCw, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { SetType } from '@/mock/column';
import useAlertDialogStore from '@/stores/useAlertDialog.store';
import { toast } from 'sonner';

interface Props {
  sets: SetType[];
  onDelete: (index: number) => void;
}

export default function RowSetList({ sets, onDelete }: Props) {
  const setOpen = useAlertDialogStore((state) => state.setOpen);

  const handleDelete = (index: number) => {
    try {
      setOpen({
        title: '삭제하기',
        description: '해당 세트를 삭제할까요?',
        handler: () => {
          try {
            onDelete(index);
            toast.success('계획을 삭제했습니다.');
          } catch (e) {
            toast.error('계획 삭제에 실패했습니다.');
            console.log(e);
          }
        },
      });
    } catch (e) {
      toast.error('계획 삭제에 실패했습니다.');
      console.log(e);
    }
  };

  return (
    <div className={cn('flex flex-col gap-2', 'text-sm')}>
      {sets.map(({ weight, reps }, index) => (
        <div key={`${weight}-${reps}-${index}`} className="flex items-center">
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
            onClick={() => handleDelete(index)}
          >
            <X className="size-4" />
          </Button>
        </div>
      ))}
    </div>
  );
}
