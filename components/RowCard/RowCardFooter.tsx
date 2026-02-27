import { CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SetType } from '@/mock/column';
import RowSetForm from './RowSetForm';
import EditRowSetList from './EditRowSetList';
import { useRowCardFooter } from './useRowCardFooter';
import { Pencil, Trash2 } from 'lucide-react';

export type StatusType = 'add' | 'edit' | 'none';

interface Props {
  exerciseId: string;
  sets: SetType[];
  status: StatusType;
  onChangeStatus: (value: StatusType) => void;
  onCreateRowSet: (value: SetType) => void;
  onUpdatetRowSets: (value: SetType[]) => void;
  onDeleteRow: () => void;
}

export default function RowCardFooter(props: Props) {
  const { status, exerciseId } = props;
  const isAdd = status === 'add';
  const isEdit = status === 'edit';

  const {
    valuesForAdd,
    valuesForEdit,
    handleChangeValueForAdd,
    handleChangeValueForEdit,
    handleCreateRowSet,
    handleUpdateRowSets,
    handleChangeStatusToAdd,
    handleChangeStatusToEdit,
    handleChangeStatusToNone,
    handleDeleteRow,
  } = useRowCardFooter(props);

  if (status === 'none') {
    return (
      <CardFooter className="mt-4 flex gap-2 px-0">
        <Button
          variant="outline"
          className="grow"
          onClick={handleChangeStatusToAdd}
        >
          추가하기
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={handleChangeStatusToEdit}
        >
          <Pencil className="size-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={handleDeleteRow}>
          <Trash2 className="size-4" />
        </Button>
      </CardFooter>
    );
  }

  return (
    <CardFooter className="mt-4 flex-col gap-4 px-0">
      {isAdd && (
        <RowSetForm
          exerciseId={exerciseId}
          values={valuesForAdd}
          onChange={handleChangeValueForAdd}
        />
      )}
      {isEdit && (
        <EditRowSetList
          exerciseId={exerciseId}
          sets={valuesForEdit}
          onChange={handleChangeValueForEdit}
        />
      )}
      <div className="flex w-full gap-2">
        <Button
          variant="default"
          className="grow transition-colors duration-300"
          onClick={isAdd ? handleCreateRowSet : handleUpdateRowSets}
        >
          완료
        </Button>
        <Button
          variant="destructive"
          className="grow transition-colors duration-300"
          onClick={handleChangeStatusToNone}
        >
          취소
        </Button>
      </div>
    </CardFooter>
  );
}
