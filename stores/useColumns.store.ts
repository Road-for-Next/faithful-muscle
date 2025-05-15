import { ColumnType } from '@/mock/column';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type State = {
  columns: ColumnType[];
};

type Actions = {
  setColumns: (columns: ColumnType[]) => void;
};

const useColumnsStore = create<State & Actions>()(
  persist(
    (set) => ({
      columns: [],
      setColumns: (columns: ColumnType[]) => set({ columns }),
    }),
    { name: 'faithful-muscle-columns' },
  ),
);

export default useColumnsStore;
