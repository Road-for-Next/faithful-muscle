'use client';

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { EXERCISE_DATA } from '@/mock/exercise';
import { convert62to10 } from '@/lib/convertNumeralSystem';
import { ChevronUp } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { RowType } from '@/mock/column';

interface ExerciseCardProps {
  exercise: RowType;
}

export default function ExerciseCard({ exercise }: ExerciseCardProps) {
  const { exerciseId, groups } = exercise;
  const data = EXERCISE_DATA.find((e) => e.id === exerciseId);
  const contentRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [maxHeight, setMaxHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      const contentHeight = contentRef.current.scrollHeight;
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
            className="size-4 transition-transform duration-300 data-[open=true]:rotate-180"
            data-open={open}
          />
        </CardAction>
      </CardHeader>

      <CardContent
        className="data-[open=true]:animate-fade-in data-[open=false]:animate-fade-out mx-0 flex flex-col gap-2 overflow-hidden px-2 py-0 text-sm transition-all duration-300"
        style={{ maxHeight }}
        data-open={open}
        ref={contentRef}
      >
        {groups.map(({ weight, reps }, i) => (
          <div
            key={`${weight}-${reps}-${i}`}
            className="flex items-center gap-4"
          >
            <span>중량 : {convert62to10(weight)}</span>
            <span>반복 : {convert62to10(reps)}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
