import { CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SetType } from '@/mock/column';
import RowSetForm from './RowSetForm';
import EditRowSetList from './EditRowSetList';
import { useRowCardFooter } from '@/useRowCardFooter';

export type StatusType = 'add' | 'edit' | 'none';

interface Props {
  sets: SetType[];
  status: StatusType;
  onChangeStatus: (value: StatusType) => void;
  onCreateRowSet: (value: SetType) => void;
  onUpdatetRowSets: (value: SetType[]) => void;
}

export default function RowCardFooter(props: Props) {
  const { status } = props;
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
  } = useRowCardFooter(props);

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
