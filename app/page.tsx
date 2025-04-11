'use client';

import { Container } from '@/components/Container';
import { ThemeSelector } from '@/components/ThemeSelector';
import ExerciseCard from '@/components/ExerciseCard';
import { COLUMN_DATA, ColumnType, RowType } from '@/mock/column';
import AddExerciseDrawer from '@/components/AddExerciseDrawer';
import { useState } from 'react';

export default function Home() {
  const [Data, setData] = useState<ColumnType>(COLUMN_DATA);

  const handleAddExercise = (exercise: RowType) =>
    setData((prev) => [...prev, exercise]);

  return (
    <Container>
      <div className="mb-4 flex items-center justify-between">
        <h1>Home</h1>
        <div className="flex items-center gap-2">
          <ThemeSelector />
          <AddExerciseDrawer onAdd={handleAddExercise} />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {Data.map((e, i) => (
          <ExerciseCard key={i} exercise={e} />
        ))}
      </div>
    </Container>
  );
}
