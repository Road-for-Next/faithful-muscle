'use client';

import { Container } from '@/components/Container';
import { ThemeSelector } from '@/components/ThemeSelector';
import ExerciseCard from '@/components/ExerciseCard';
import { COLUMN_DATA, ColumnType, RowType } from '@/mock/column';
import AddRowDrawer from '@/components/AddRowDrawer';
import { useState } from 'react';
import DaySelector from '@/components/DaySelector';

export default function Home() {
  const [data, setData] = useState<ColumnType[]>([COLUMN_DATA]);
  const [day, setDay] = useState(new Date().getDay());

  const handleAddExercise = (exercise: RowType) =>
    setData((prev) => {
      const next = [...prev];
      next[day].push(exercise);
      return next;
    });

  const handleSelectDay = (day: number) => setDay(day);

  return (
    <Container>
      <div className="mb-4 flex items-center justify-between">
        <DaySelector day={day} onSelect={handleSelectDay} />
        <div className="flex items-center gap-2">
          <ThemeSelector />
          <AddRowDrawer onAdd={handleAddExercise} />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {data[day]?.length > 0 || <div>등록된 운동 계획이 없습니다.</div>}
        {data[day]?.map((e, i) => <ExerciseCard key={i} exercise={e} />)}
      </div>
    </Container>
  );
}
