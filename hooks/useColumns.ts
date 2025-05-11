import { ColumnType, RowType, SetType } from '@/mock/column';
import useColumnsStore from '@/stores/useColumns.store';
import { useCallback } from 'react';
import useDayStore from '@/stores/useDay.store';

const useColumns = () => {
  const { columns, setColumns } = useColumnsStore((state) => state);
  const day = useDayStore((state) => state.day);

  const column = columns[day];

  const setColumn = useCallback(
    (column: ColumnType) => {
      const next = [...columns];
      next[day] = column;
      setColumns(next);
    },
    [columns, day, setColumns],
  );

  const createRow = (exerciseId: string) => {
    const row: RowType = {
      id: Date.now().toString() + '-' + columns[day]?.length || '0',
      exerciseId: exerciseId,
      sets: [],
    };
    const next = [...columns];
    if (next[day]) next[day] = [...next[day], row];
    else next[day] = [row];
    setColumns(next);
  };

  const createRowSet = (id: string, set: SetType) => {
    const next = [...columns];
    next[day] = next[day].map((e) =>
      e.id === id ? { ...e, sets: [...e.sets, set] } : e,
    );
    setColumns(next);
  };

  const deleteRowSet = (id: string, index: number) => {
    const next = [...columns];
    next[day] = next[day].map((e) => {
      if (e.id !== id) return e;
      const nextSets = e.sets.filter((_, i) => i !== index);
      return { ...e, sets: nextSets };
    });
    setColumns(next);
  };

  return {
    column,
    columns,
    setColumn,
    createRow,
    createRowSet,
    deleteRowSet,
  };
};

export default useColumns;
