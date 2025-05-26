'use client';

import { Card, CardContent } from '@/components/ui/card';
import { EXERCISE_DATA } from '@/mock/exercise';
import { useCallback, useEffect, useRef, useState } from 'react';
import { RowType, SetType } from '@/mock/column';
import RowSetList from './RowSetList';
import RowCardHeader from './RowCardHeader';
import RowCardBody from './RowCardBody';
import RowCardFooter, { StatusType } from './RowCardFooter';

interface Props {
  row: RowType;
  createRowSet: (id: string, set: SetType) => void;
  updateRowSets: (id: string, sets: SetType[]) => void;
  deleteRowSet: (id: string, index: number) => void;
}

export default function RowCard({
  row,
  createRowSet,
  updateRowSets,
  deleteRowSet,
}: Props) {
  const { exerciseId, sets } = row;
  const data = EXERCISE_DATA.find((e) => e.id === exerciseId);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<StatusType>('none');
  const bodyRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState(0);

  const handleChangeStatus = (value: StatusType) => setStatus(value);

  const togglebody = () => {
    setOpen((prev) => !prev);
    setTimeout(() => {
      setStatus('none');
    }, 150);
  };

  const handleCreateRowSet = (value: SetType) => createRowSet(row.id, value);
  const handleUpdateRowSets = (value: SetType[]) =>
    updateRowSets(row.id, value);

  const resizeHeight = useCallback(() => {
    if (!bodyRef.current) return;
    const contentHeight = bodyRef.current.scrollHeight;
    setMaxHeight(open ? contentHeight : 0);
  }, [open]);

  useEffect(() => resizeHeight(), [status, row.sets, resizeHeight]);

  return (
    <Card className="gap-0 p-3">
      <RowCardHeader data={data} open={open} onToggle={togglebody} />
      <RowCardBody ref={bodyRef} open={open} maxHeight={maxHeight}>
        <CardContent className="mx-0 px-2 py-0">
          {status !== 'edit' && (
            <RowSetList
              sets={sets}
              onDelete={(index) => deleteRowSet(row.id, index)}
            />
          )}
        </CardContent>
        <RowCardFooter
          sets={sets}
          status={status}
          onChangeStatus={handleChangeStatus}
          onCreateRowSet={handleCreateRowSet}
          onUpdatetRowSets={handleUpdateRowSets}
        />
      </RowCardBody>
    </Card>
  );
}
