import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import useAlertDialogStore from '@/stores/useAlertDialog.store';
import { SetType } from '@/mock/column';
import { StatusType } from './RowCardFooter';

interface UseRowCardFooterProps {
  sets: SetType[];
  status: StatusType;
  onChangeStatus: (value: StatusType) => void;
  onCreateRowSet: (value: SetType) => void;
  onUpdatetRowSets: (value: SetType[]) => void;
}

export const useRowCardFooter = ({
  sets,
  status,
  onChangeStatus,
  onCreateRowSet,
  onUpdatetRowSets,
}: UseRowCardFooterProps) => {
  const setOpen = useAlertDialogStore((state) => state.setOpen);
  const [valuesForAdd, setValuesForAdd] = useState<
    Record<keyof SetType, string>
  >({
    weight: '',
    reps: '',
  });
  const [valuesForEdit, setValuesForEdit] = useState<
    Record<keyof SetType, string>[]
  >([]);

  const resetValue = () => setValuesForAdd({ weight: '', reps: '' });

  const handleChangeStatusToAdd = () => onChangeStatus('add');
  const handleChangeStatusToEdit = () => onChangeStatus('edit');
  const handleChangeStatusToNone = () => onChangeStatus('none');

  const handleChangeValueForAdd = (name: keyof SetType, value: string) => {
    setValuesForAdd((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeValueForEdit = (
    index: number,
    name: keyof SetType,
    value: string,
  ) => {
    setValuesForEdit((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [name]: value };
      return next;
    });
  };

  const handleCreateRowSet = () => {
    const { weight, reps } = valuesForAdd;

    if (!weight || !reps) {
      toast.error('중량과 반복을 입력해주세요.');
      return;
    }

    try {
      const set = {
        weight: Number(weight),
        reps: Number(reps),
      };
      onCreateRowSet(set);
      resetValue();
      toast.success('계획을 추가했습니다.');
    } catch (e) {
      toast.error('계획 추가에 실패했습니다.');
      console.log(e);
    }
  };

  const handleUpdateRowSets = () => {
    const isEmpty =
      valuesForEdit.filter((value) => !value.weight || !value.reps).length > 0;

    if (isEmpty) {
      toast.error('중량과 반복을 입력해주세요.');
      return;
    }

    try {
      const param = valuesForEdit.map((value) => ({
        weight: Number(value.weight),
        reps: Number(value.reps),
      }));
      setOpen({
        title: '수정하기',
        description: '운동 계획을 수정할까요?',
        handler: () => {
          try {
            onUpdatetRowSets(param);
            onChangeStatus('none');
            toast.success('계획을 수정했습니다.');
          } catch (e) {
            toast.error('계획 수정에 실패했습니다.');
            console.log(e);
          }
        },
      });
    } catch (e) {
      toast.error('계획 수정에 실패했습니다.');
      console.log(e);
    }
  };

  useEffect(() => resetValue(), [status]);

  useEffect(
    () =>
      setValuesForEdit(
        sets?.map(({ weight, reps }) => ({
          weight: String(weight),
          reps: String(reps),
        })) || [],
      ),
    [sets],
  );

  return {
    valuesForAdd,
    valuesForEdit,
    handleChangeValueForAdd,
    handleChangeValueForEdit,
    handleCreateRowSet,
    handleUpdateRowSets,
    handleChangeStatusToAdd,
    handleChangeStatusToEdit,
    handleChangeStatusToNone,
  };
};
