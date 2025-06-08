import { create } from 'zustand';

type State = {
  open: boolean;
  title: string;
  description: string;
  handler: () => void;
};

type Actions = {
  setOpen: (params: Omit<State, 'open'>) => void;
  setClose: () => void;
};

// Alert Dialog의 duration 시간을 변수로 사용
const DURATION_TIME = 200;

const useAlertDialogStore = create<State & Actions>((set) => ({
  open: false,
  title: '',
  description: '',
  handler: () => {},
  setOpen: (params) => set({ open: true, ...params }),
  setClose: () => {
    set({ open: false });
    setTimeout(() => {
      set({ title: '', description: '', handler: () => {} });
    }, DURATION_TIME);
  },
}));

export default useAlertDialogStore;
