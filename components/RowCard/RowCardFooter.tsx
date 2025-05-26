import { CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { SetType } from '@/mock/column';
import RowSetForm from './RowSetForm';
import EditRowSetList from './EditRowSetList';

export type StatusType = 'add' | 'edit' | 'none';

interface Props {
  sets: SetType[];
  status: StatusType;
  onChangeStatus: (value: StatusType) => void;
  onCreateRowSet: (value: SetType) => void;
  onUpdatetRowSets: (value: SetType[]) => void;
}

export default function RowCardFooter({
  sets,
  status,
  onChangeStatus,
  onCreateRowSet,
  onUpdatetRowSets,
}: Props) {
  const isAdd = status === 'add';
  const isEdit = status === 'edit';
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
    if (!weight || !reps) return alert('빈 칸을 입력해주세요');
    const set = {
      weight: Number(weight),
      reps: Number(reps),
    };
    onCreateRowSet(set);
    resetValue();
  };

  const handleUpdateRowSets = () => {
    const param = valuesForEdit.map((value) => ({
      weight: Number(value.weight),
      reps: Number(value.reps),
    }));
    onUpdatetRowSets(param);
    onChangeStatus('none');
  };

  const BUTTON_LEFT: Record<StatusType, FooterButtonProps> = {
    add: {
      variant: 'default',
      handler: handleCreateRowSet,
      text: '완료',
    },
    edit: {
      variant: 'default',
      handler: handleUpdateRowSets,
      text: '완료',
    },
    none: {
      variant: 'outline',
      handler: handleChangeStatusToAdd,
      text: '추가하기',
    },
  };

  const BUTTON_RIGHT: Record<StatusType, FooterButtonProps> = {
    add: {
      variant: 'destructive',
      handler: handleChangeStatusToNone,
      text: '취소',
    },
    edit: {
      variant: 'destructive',
      handler: handleChangeStatusToNone,
      text: '취소',
    },
    none: {
      variant: 'outline',
      handler: handleChangeStatusToEdit,
      text: '수정하기',
    },
  };

  useEffect(() => resetValue(), [status]);

  useEffect(
    () =>
      setValuesForEdit(
        sets?.map(({ weight, reps }) => ({
          weight: String(weight),
          reps: String(reps),
        })),
      ),
    [sets],
  );

  return (
    <CardFooter className="mt-4 flex-col gap-4 px-0">
      {isAdd && (
        <RowSetForm values={valuesForAdd} onChange={handleChangeValueForAdd} />
      )}
      {isEdit && (
        <EditRowSetList
          sets={valuesForEdit}
          onChange={handleChangeValueForEdit}
        />
      )}
      <div className="flex w-full gap-2">
        <FooterButton {...BUTTON_LEFT[status]} />
        <FooterButton {...BUTTON_RIGHT[status]} />
      </div>
    </CardFooter>
  );
}

interface FooterButtonProps {
  variant: 'default' | 'outline' | 'destructive';
  handler: () => void;
  text: string;
}

function FooterButton({ variant, handler, text }: FooterButtonProps) {
  return (
    <Button
      variant={variant}
      className="grow transition-colors duration-300"
      onClick={handler}
    >
      {text}
    </Button>
  );
}
