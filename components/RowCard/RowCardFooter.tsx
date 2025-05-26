import { cn } from '@/lib/utils';
import { CardFooter } from '../ui/card';
import { Label } from '../ui/label';
import { Dumbbell, RefreshCw } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useEffect, useState } from 'react';
import { SetType } from '@/mock/column';

export type StatusType = 'add' | 'edit' | 'none';

interface Props {
  status: StatusType;
  onChangeStatus: (value: StatusType) => void;
  onCreateRowSet: (value: SetType) => void;
}

export default function RowCardFooter({
  status,
  onChangeStatus,
  onCreateRowSet,
}: Props) {
  const isAdd = status === 'add';
  // const isEdit = status === 'edit';
  const [value, setValue] = useState({
    weight: '',
    reps: '',
  });

  const resetValue = () => setValue({ weight: '', reps: '' });

  const handleChangeStatusToAdd = () => onChangeStatus('add');
  const handleChangeStatusToEdit = () => onChangeStatus('edit');
  const handleChangeStatusToNone = () => onChangeStatus('none');

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateRowSet = () => {
    const { weight, reps } = value;
    if (!weight || !reps) return alert('빈 칸을 입력해주세요');
    const set = {
      weight: Number(weight),
      reps: Number(reps),
    };
    onCreateRowSet(set);
    resetValue();
  };

  const BUTTON_LEFT: Record<StatusType, FooterButtonProps> = {
    add: {
      variant: 'default',
      handler: handleCreateRowSet,
      text: '완료',
    },
    edit: {
      variant: 'default',
      handler: () => {},
      text: '완료',
    },
    none: {
      variant: 'outline',
      handler: handleChangeStatusToAdd,
      text: '추가하기',
    },
  };

  const BUTTON_RIGHT: Record<StatusType, FooterButtonProps> = {
    add: {
      variant: 'destructive',
      handler: handleChangeStatusToNone,
      text: '취소',
    },
    edit: {
      variant: 'destructive',
      handler: handleChangeStatusToNone,
      text: '취소',
    },
    none: {
      variant: 'outline',
      handler: handleChangeStatusToEdit,
      text: '수정',
    },
  };

  useEffect(() => resetValue(), [status]);

  return (
    <CardFooter className="mt-4 flex-col gap-4 px-0">
      {isAdd && (
        <div
          className={cn(
            'animate-fade-in transition-all duration-300',
            'flex items-center gap-2',
            'h-9',
          )}
        >
          <div className="flex items-center gap-2">
            <Label htmlFor="weight" className="flex items-center gap-1">
              <Dumbbell className="size-4" />
              <span className="w-7">중량</span>
            </Label>
            <Input
              id="weight"
              name="weight"
              type="number"
              value={value.weight}
              placeholder="중량"
              onChange={handleChangeValue}
            />
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="reps" className="flex items-center gap-1">
              <RefreshCw className="size-4" />
              <span className="block w-7">반복</span>
            </Label>
            <Input
              id="reps"
              name="reps"
              type="number"
              value={value.reps}
              placeholder="반복"
              onChange={handleChangeValue}
            />
          </div>
        </div>
      )}
      <div className="flex w-full gap-2">
        <FooterButton {...BUTTON_LEFT[status]} />
        <FooterButton {...BUTTON_RIGHT[status]} />
      </div>
    </CardFooter>
  );
}

interface FooterButtonProps {
  variant: 'default' | 'outline' | 'destructive';
  handler: () => void;
  text: string;
}

function FooterButton({ variant, handler, text }: FooterButtonProps) {
  return (
    <Button
      variant={variant}
      className="grow transition-colors duration-300"
      onClick={handler}
    >
      {text}
    </Button>
  );
}
