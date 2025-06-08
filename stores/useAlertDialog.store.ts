import { create } from 'zustand';

type State = {
  open: boolean;
  title?: string;
  description?: string;
  handler?: () => void;
};

type Actions = {
  setOpen: (params: State) => void;
};

const useAlertDialogStore = create<State & Actions>((set) => ({
  open: false,
  title: '',
  description: '',
  handler: () => {},
  setOpen: (params) => set(params),
}));

export default useAlertDialogStore;
