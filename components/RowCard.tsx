'use client';

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { EXERCISE_DATA } from '@/mock/exercise';
import { convert10to62, convert62to10 } from '@/lib/convertNumeralSystem';
import { ChevronUp, Dumbbell, RefreshCw, X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { RowType, SetType } from '@/mock/column';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface Props {
  row: RowType;
  createRowSet: (id: string, set: SetType) => void;
  deleteRowSet: (id: string, index: number) => void;
}

interface IValue {
  weight: string;
  reps: string;
}

export default function RowCard({ row, createRowSet, deleteRowSet }: Props) {
  const { exerciseId, sets } = row;
  const data = EXERCISE_DATA.find((e) => e.id === exerciseId);
  const bodyRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [maxHeight, setMaxHeight] = useState(0);
  const [isAdd, setIsAdd] = useState(false);
  const [values, setValues] = useState<IValue>({
    weight: '',
    reps: '',
  });

  const resetValue = () => {
    setValues({
      weight: '',
      reps: '',
    });
  };

  const toggleAdd = () => {
    resetValue();
    setIsAdd((prev) => !prev);
  };

  const togglebody = () => {
    resetValue();
    setOpen((prev) => !prev);
    setTimeout(() => {
      setIsAdd(false);
    }, 150);
  };

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setValues((prev) => ({ ...prev, [id]: value }));
  };

  const handleAddRowSet = () => {
    // TODO - 유효성 검사 추가
    if (!values.weight || !values.reps) {
      alert('빈 칸을 입력해주세요');
      return;
    }
    const set: SetType = {
      weight: convert10to62(Number(values.weight)),
      reps: convert10to62(Number(values.reps)),
    };
    createRowSet(row.id, set);
    resetValue();
  };

  const handleDeleteRowSet = (index: number) => {
    deleteRowSet(row.id, index);
  };

  const resizeHeight = useCallback(() => {
    if (!bodyRef.current) return;
    const contentHeight = bodyRef.current.scrollHeight;
    setMaxHeight(open ? contentHeight : 0);
  }, [open]);

  useEffect(() => resizeHeight(), [isAdd, row.sets, resizeHeight]);

  return (
    <Card className="gap-0 p-3">
      <CardHeader
        className="cursor-pointer px-0 select-none"
        onClick={togglebody}
      >
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
      <div
        className={cn(
          'overflow-hidden transition-all duration-300',
          'data-[open=true]:animate-fade-in',
          'data-[open=false]:animate-fade-out',
        )}
        style={{ maxHeight }}
        data-open={open}
        ref={bodyRef}
      >
        <CardContent
          className={cn('flex flex-col gap-2', 'mx-0 px-2 py-0 text-sm')}
        >
          {sets.map(({ weight, reps }, i) => (
            <div key={`${weight}-${reps}-${i}`} className="flex items-center">
              <div className="flex grow items-center gap-4">
                <div className="flex items-center gap-1">
                  <Dumbbell className="size-4" />
                  <span>중량 : {convert62to10(weight)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <RefreshCw className="size-4" />
                  <span>반복 : {convert62to10(reps)}</span>
                </div>
              </div>
              <Button
                className={cn('size-6 cursor-pointer')}
                variant="ghost"
                onClick={() => handleDeleteRowSet(i)}
              >
                <X className="size-4" />
              </Button>
            </div>
          ))}
        </CardContent>
        <CardFooter className="mt-4 flex-col gap-4 px-0">
          {isAdd && (
            <div
              className={cn(
                'animate-fade-in transition-all duration-300',
                'flex items-center gap-2',
                'h-9',
              )}
              data-open={isAdd}
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
                  placeholder="중량"
                  value={values.weight}
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
                  placeholder="반복"
                  value={values.reps}
                  onChange={handleChangeValue}
                />
              </div>
            </div>
          )}
          <div className="flex w-full gap-2">
            <Button
              variant={isAdd ? 'default' : 'outline'}
              className="grow transition-colors duration-300"
              onClick={isAdd ? handleAddRowSet : toggleAdd}
            >
              {isAdd ? '완료' : '추가하기'}
            </Button>
            <Button
              variant={isAdd ? 'destructive' : 'outline'}
              className="grow transition-colors duration-300"
              onClick={isAdd ? toggleAdd : () => {}}
            >
              {isAdd ? '취소' : '수정하기'}
            </Button>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
}
