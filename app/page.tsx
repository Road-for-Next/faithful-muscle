'use client';

import { Container } from '@/components/Container';
import { ThemeSelector } from '@/components/ThemeSelector';
import RowCard from '@/components/RowCard';
import { COLUMN_DATA, ColumnType, RowType, SetType } from '@/mock/column';
import AddRowDrawer from '@/components/AddRowDrawer';
import { useState } from 'react';
import DaySelector from '@/components/DaySelector';
import { Button } from '@/components/ui/button';
import { encodeColumnToQuery } from '@/lib/codecColumn';
import FeedbackDrawer from '@/components/FeedbackDrawer';
import { Copy } from 'lucide-react';

export default function Home() {
  const [data, setData] = useState<ColumnType[]>([COLUMN_DATA]);
  const [day, setDay] = useState(new Date().getDay());

  const handleClickCopy = async () => {
    if (!data[day] || data[day]?.length === 0)
      return alert('등록된 운동 계획이 없습니다.');

    const text = encodeColumnToQuery(data[day]);

    try {
      if (text) {
        await navigator.clipboard.writeText(text);
        console.log(text);
      } else {
        alert('클립보드에 복사되었습니다.');
        console.log('복사할 데이터가 없습니다.');
      }
    } catch (e) {
      console.log(e);
    }
  };

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

  const handleSelectDay = (day: number) => setDay(day);

  return (
    <Container>
      <div className="mb-4 flex items-center justify-between">
        <DaySelector day={day} onSelect={handleSelectDay} />
        <div className="flex items-center gap-2">
          <ThemeSelector />
          <Button variant="outline" onClick={handleClickCopy}>
            <Copy className="size-4" />
          </Button>
          <FeedbackDrawer column={data[day] || []} />
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
            onEdit={() => alert('수정')}
            onDelete={handleDeleteRowSet}
          />
        ))}
      </div>
    </Container>
  );
}
