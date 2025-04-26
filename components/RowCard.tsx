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
import { convert62to10 } from '@/lib/convertNumeralSystem';
import { ChevronUp, Dumbbell, RefreshCw } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { RowType } from '@/mock/column';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

interface Props {
  row: RowType;
}

export default function RowCard({ row }: Props) {
  const { exerciseId, sets } = row;
  const data = EXERCISE_DATA.find((e) => e.id === exerciseId);
  const bodyRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [maxHeight, setMaxHeight] = useState(0);

  useEffect(() => {
    if (bodyRef.current) {
      const contentHeight = bodyRef.current.scrollHeight;
      setMaxHeight(open ? contentHeight : 0);
    }
  }, [open]);

  return (
    <Card className="gap-0 p-3">
      <CardHeader
        className="cursor-pointer px-0 select-none"
        onClick={() => setOpen((prev) => !prev)}
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
            <div
              key={`${weight}-${reps}-${i}`}
              className="flex items-center gap-4"
            >
              <div className="flex items-center gap-1">
                <Dumbbell className="size-4" />
                <span>중량 : {convert62to10(weight)}</span>
              </div>
              <div className="flex items-center gap-1">
                <RefreshCw className="size-4" />
                <span>반복 : {convert62to10(reps)}</span>
              </div>
            </div>
          ))}
        </CardContent>
        <CardFooter className="mt-4 px-0">
          <Button variant="outline" className="w-full">
            추가하기
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}
