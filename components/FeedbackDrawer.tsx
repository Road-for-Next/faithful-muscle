import { BotMessageSquare, ListFilter, LoaderCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Drawer } from './ui/drawer';
import { MouseEvent, useState } from 'react';
import { ColumnType } from '@/mock/column';
import { EXERCISE_DATA } from '@/mock/exercise';
import { convert62to10 } from '@/lib/convertNumeralSystem';
import { createFeedBack } from '@/service/ai.api';
import DrawerElement from './DrawerElement';

type RoutineType = {
  name: string;
  sets: { weight: number; reps: number }[];
}[];

type OptionType = 'sequence' | 'strength' | 'exercise';

interface Props {
  column: ColumnType;
}

export default function FeedbackDrawer({ column }: Props) {
  const [isCooldown, setIsCooldown] = useState(false);
  const [option, setOption] = useState<Record<OptionType, boolean>>({
    sequence: false,
    strength: false,
    exercise: false,
  });

  const handleClickOption = (name: OptionType) =>
    setOption((prev) => ({ ...prev, [name]: !prev[name] }));

  const handleClickGenerate = async () => {
    if (isCooldown) return;
    if (!column) return;

    const routine = JSON.stringify(makeRoutine(column));
    if (!routine || routine.length === 0)
      return alert('등록된 운동 계획이 없습니다.');

    setIsCooldown(true);

    const body = {
      routine,
      option,
    };

    await createFeedBack(body).then((result) => {
      console.log(result);
      setIsCooldown(false);
    });
  };

  return (
    <Drawer>
      <DrawerElement.Trigger variant="outline" className="size-9">
        <BotMessageSquare className="size-4" />
      </DrawerElement.Trigger>
      <DrawerElement.Body>
        <DrawerElement.Header
          titleIcon={<BotMessageSquare className="size-4" />}
          titleText={<span>피드백 생성하기</span>}
          description={'AI 피드백을 생성해보세요!'}
        />
        <DrawerElement.Content>
          <GenerateOptionSelector option={option} onClick={handleClickOption} />
          <GenerateButton loading={isCooldown} onClick={handleClickGenerate} />
        </DrawerElement.Content>
        <DrawerElement.Footer />
      </DrawerElement.Body>
    </Drawer>
  );
}

const OPTION_NAME: Record<OptionType, string> = {
  sequence: '운동 순서',
  strength: '운동 강도',
  exercise: '운동 종류',
};

interface GenerateOptionSelectorProps {
  option: Record<OptionType, boolean>;
  onClick: (name: OptionType) => void;
}

function GenerateOptionSelector({
  option,
  onClick,
}: GenerateOptionSelectorProps) {
  const handleClickOption = (e: MouseEvent<HTMLButtonElement>) => {
    const name = e.currentTarget.name as OptionType;
    onClick(name);
  };

  return (
    <div className="px-1">
      <h3 className="mb-2 flex items-center gap-1 text-sm font-semibold">
        <ListFilter className="size-4" /> <span>피드백 옵션</span>
      </h3>
      <div className="flex gap-2">
        {Object.keys(option).map((e) => (
          <Button
            key={e}
            name={e}
            className="grow"
            variant={option[e as OptionType] ? 'default' : 'outline'}
            onClick={handleClickOption}
          >
            {OPTION_NAME[e as OptionType]}
          </Button>
        ))}
      </div>
    </div>
  );
}

interface GenerateButtonProps {
  loading: boolean;
  onClick: () => void;
}

function GenerateButton({ loading, onClick }: GenerateButtonProps) {
  return (
    <Button variant={loading ? 'outline' : 'default'} onClick={onClick}>
      {loading ? (
        <LoaderCircle className="size-4 animate-spin" />
      ) : (
        <span>생성하기</span>
      )}
    </Button>
  );
}

const makeRoutine = (data: ColumnType) => {
  const prompt: RoutineType = [];
  data?.forEach(({ exerciseId, sets }) => {
    const exercise = EXERCISE_DATA.find((e) => e.id === exerciseId);
    if (!exercise) return;
    prompt.push({
      name: exercise.ko,
      sets: sets.map((e) => ({
        weight: convert62to10(e.weight),
        reps: convert62to10(e.reps),
      })),
    });
  });
  return prompt;
};
