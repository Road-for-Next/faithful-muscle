'use client';

import { Container } from '@/components/Container';
import { ThemeSelector } from '@/components/ThemeSelector';
import ExerciseCard from '@/components/ExerciseCard';
import { COLUMN_DATA, ColumnType, RowType } from '@/mock/column';
import AddExerciseDrawer from '@/components/AddExerciseDrawer';
import { useState } from 'react';
import DaySelector from '@/components/DaySelector';

export default function Home() {
  const [data, setData] = useState<ColumnType>(COLUMN_DATA);
  const [day, setDay] = useState(new Date().getDay());

  const handleAddExercise = (exercise: RowType) =>
    setData((prev) => [...prev, exercise]);

  const handleSelectDay = (day: number) => setDay(day);

  return (
    <Container>
      <div className="mb-4 flex items-center justify-between">
        <DaySelector day={day} onSelect={handleSelectDay} />
        <div className="flex items-center gap-2">
          <ThemeSelector />
          <AddExerciseDrawer onAdd={handleAddExercise} />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {data.map((e, i) => (
          <ExerciseCard key={i} exercise={e} />
        ))}
      </div>
    </Container>
  );
}
