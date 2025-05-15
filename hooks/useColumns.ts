import { ColumnType, RowType, SetType } from '@/mock/column';
import useColumnsStore from '@/stores/useColumns.store';
import { useCallback, useEffect, useMemo, useState } from 'react';
import useDayStore from '@/stores/useDay.store';
import { decodeQueryToColumn, encodeColumnToQuery } from '@/lib/codecColumn';

const useColumns = () => {
  const [initialized, setInitialized] = useState(false);
  const { columns, setColumns } = useColumnsStore((state) => state);
  const day = useDayStore((state) => state.day);
  const column = columns[day];
  const initialQuery = useMemo(() => {
    if (typeof window !== 'undefined') {
      return new URLSearchParams(window.location.search).get('q');
    }
    return null;
  }, []);

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

  useEffect(() => {
    if (!initialized && initialQuery) {
      const next: ColumnType[] = [];
      const temp = initialQuery.split('.');
      temp.forEach((e) => {
        const { day: _day, column } = decodeQueryToColumn(e);
        next[Number(_day)] = column;
      });
      setColumns(next);
    }
    setInitialized(true);
  }, [initialized, initialQuery, setColumns]);

  useEffect(() => {
    if (!initialized) return;
    const result: string[] = [];
    columns.forEach((col, i) => {
      if (Array.isArray(col)) {
        result.push(encodeColumnToQuery(i, col));
      }
    });
    const save = result.join('.');
    window.history.pushState({}, '', '?q=' + save);
  }, [initialized, columns]);

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
