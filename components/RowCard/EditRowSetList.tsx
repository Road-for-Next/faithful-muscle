import { SetType } from '@/mock/column';
import RowSetForm from './RowSetForm';
import { cn } from '@/lib/utils';

interface Props {
  sets: Record<keyof SetType, string>[];
  onChange: (index: number, name: keyof SetType, value: string) => void;
}

export default function EditRowSetList({ sets, onChange }: Props) {
  const handleChangeValue = (
    index: number,
    name: keyof SetType,
    value: string,
  ) => onChange(index, name, value);

  return (
    <div className={cn('flex flex-col gap-2', 'text-sm')}>
      {sets.map((e, i) => (
        <RowSetForm
          key={i}
          values={e}
          onChange={(name, value) => handleChangeValue(i, name, value)}
        />
      ))}
    </div>
  );
}
