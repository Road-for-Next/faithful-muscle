import { create } from 'zustand';

type State = {
  open: boolean;
  title: string;
  description: string;
  handler: () => void;
};

type Actions = {
  // 해당 함수에서는 open=true 확정이기 때문에 Omit으로 제외함
  setOpen: (params: Omit<State, 'open'>) => void;
  setClose: () => void;
};

// Alert Dialog의 duration 시간을 변수로 사용
const DURATION_TIME = 200;

const useAlertDialogStore = create<State & Actions>((set, get) => ({
  open: false,
  title: '',
  description: '',
  handler: () => {},
  setOpen: (params) =>
    set(() => {
      const { title, description, handler } = params;

      // handler 처리 후 dialog를 닫는 로직을 추가
      const wrappedHandler = async () => {
        try {
          // handler 처리
          await Promise.resolve(handler());
        } catch (error) {
          // 에러 처리
          alert('Error Occurred AlertDialog handler');
          console.error('AlertDialog handler error:', error);
        } finally {
          // handler 처리 종료 시 dialog 닫기
          get().setClose();
        }
      };
      return {
        open: true,
        title,
        description,
        handler: wrappedHandler,
      };
    }),
  setClose: () => {
    set({ open: false });
    setTimeout(() => {
      set({ title: '', description: '', handler: () => {} });
    }, DURATION_TIME);
  },
}));

export default useAlertDialogStore;
