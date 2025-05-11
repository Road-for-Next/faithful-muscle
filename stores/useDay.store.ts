import { create } from 'zustand';

interface UseDayStore {
  day: number;
  setDay: (day: number) => void;
}

const useDayStore = create<UseDayStore>((set) => ({
  day: new Date().getDay(),
  setDay: (day: number) => set({ day }),
}));

export default useDayStore;
