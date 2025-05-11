import { create } from 'zustand';

interface UseDayStore {
  day: number;
  setDay: (day: number) => void;
}

const useDayStore = create<UseDayStore>((set) => ({
  day: 0,
  setDay: (day: number) => set({ day }),
}));

export default useDayStore;
