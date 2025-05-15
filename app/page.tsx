'use client';

import { Container } from '@/components/Container';
import { ThemeSelector } from '@/components/ThemeSelector';
import RowCard from '@/components/RowCard';
import AddRowDrawer from '@/components/AddRowDrawer';
import DaySelector from '@/components/DaySelector';
import { Button } from '@/components/ui/button';
import FeedbackDrawer from '@/components/FeedbackDrawer';
import { Copy } from 'lucide-react';
import useColumns from '@/hooks/useColumns';

export default function Home() {
  const { column, createRow, createRowSet, deleteRowSet } = useColumns();

  const handleClickCopy = async () => {
    try {
      const text = location.href;
      await navigator.clipboard.writeText(text);
      alert('링크가 복사되었습니다.');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container>
      <div className="mb-4 flex items-center justify-between">
        <DaySelector />
        <div className="flex items-center gap-2">
          <ThemeSelector />
          <Button
            className="size-9"
            variant="outline"
            onClick={handleClickCopy}
          >
            <Copy className="size-4" />
          </Button>
          <FeedbackDrawer column={column} />
          <AddRowDrawer createRow={createRow} />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {column?.length > 0 || <div>등록된 운동 계획이 없습니다.</div>}
        {column?.map((e) => (
          <RowCard
            key={e.id}
            row={e}
            createRowSet={createRowSet}
            deleteRowSet={deleteRowSet}
          />
        ))}
      </div>
    </Container>
  );
}
