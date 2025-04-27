'use client';

import { Container } from '@/components/Container';
import { ThemeSelector } from '@/components/ThemeSelector';
import RowCard from '@/components/RowCard';
import { COLUMN_DATA, ColumnType, RowType, SetType } from '@/mock/column';
import AddRowDrawer from '@/components/AddRowDrawer';
import { useState } from 'react';
import DaySelector from '@/components/DaySelector';
import { Button } from '@/components/ui/button';
import { BotMessageSquare, LoaderCircle } from 'lucide-react';
import { createFeedBack } from '@/service/ai.api';
import { EXERCISE_DATA } from '@/mock/exercise';
import { convert62to10 } from '@/lib/convertNumeralSystem';

type PromptType = {
  name: string;
  sets: { weight: number; reps: number }[];
}[];

const makePrompt = (data: ColumnType) => {
  const prompt: PromptType = [];
  data?.forEach(({ exerciseId, sets }) => {
    const exercise = EXERCISE_DATA.find((e) => e.id === exerciseId);
    if (!exercise) return;
    prompt.push({
      name: exercise.ko,
      sets: sets.map((e) => ({
        weight: convert62to10(e.weight),
        reps: convert62to10(e.reps),
      })),
    });
  });
  return prompt;
};

export default function Home() {
  const [data, setData] = useState<ColumnType[]>([COLUMN_DATA]);
  const [day, setDay] = useState(new Date().getDay());
  const [isCooldown, setIsCooldown] = useState(false);

  const handleAddRow = (exerciseId: string) => {
    setData((prev) => {
      const row: RowType = {
        id: Date.now().toString() + '-' + prev[day]?.length || '0',
        exerciseId: exerciseId,
        sets: [],
      };
      const next = [...prev];
      if (next[day]) next[day] = [...next[day], row];
      else next[day] = [row];
      return next;
    });
  };

  const handleAddRowSet = (id: string, set: SetType) => {
    setData((prev) => {
      const next = [...prev];
      next[day] = next[day].map((e) =>
        e.id === id ? { ...e, sets: [...e.sets, set] } : e,
      );
      return next;
    });
  };

  const handleDeleteRowSet = (id: string, index: number) => {
    setData((prev) => {
      const next = [...prev];
      next[day] = next[day].map((e) => {
        if (e.id !== id) return e;
        const nextSets = e.sets.filter((_, i) => i !== index);
        return { ...e, sets: nextSets };
      });
      return next;
    });
  };

  const handleClickGenerate = async () => {
    if (isCooldown) return;

    const prompt = makePrompt(data[day]);
    if (!prompt || prompt.length === 0)
      return alert('등록된 운동 계획이 없습니다.');

    setIsCooldown(true);

    const text = JSON.stringify(prompt);
    await createFeedBack(text).then((result) => console.log(result));
    setTimeout(() => setIsCooldown(false), 10000);
  };

  const handleSelectDay = (day: number) => setDay(day);

  return (
    <Container>
      <div className="mb-4 flex items-center justify-between">
        <DaySelector day={day} onSelect={handleSelectDay} />
        <div className="flex items-center gap-2">
          <ThemeSelector />
          <Button
            className="size-9 p-0"
            variant="outline"
            onClick={handleClickGenerate}
          >
            {isCooldown ? (
              <LoaderCircle className="size-4 animate-spin" />
            ) : (
              <BotMessageSquare className="size-4" />
            )}
          </Button>
          <AddRowDrawer onAdd={handleAddRow} />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {data[day]?.length > 0 || <div>등록된 운동 계획이 없습니다.</div>}
        {data[day]?.map((e) => (
          <RowCard
            key={e.id}
            row={e}
            onAdd={handleAddRowSet}
            onDelete={handleDeleteRowSet}
          />
        ))}
      </div>
    </Container>
  );
}
