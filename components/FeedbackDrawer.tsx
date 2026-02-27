import {
  BotMessageSquare,
  Check,
  ListFilter,
  LoaderCircle,
} from 'lucide-react';
import { Button } from './ui/button';
import { Drawer } from './ui/drawer';
import { MouseEvent, useState } from 'react';
import { ColumnType } from '@/mock/column';
import { EXERCISE_DATA, isCardio } from '@/mock/exercise';
import { createFeedBack } from '@/service/ai.api';
import DrawerElement from './DrawerElement';

type OptionType =
  | 'routineComposition'
  | 'exerciseArrangement'
  | 'exerciseStrength';

type FeedbackType = Record<OptionType, string> | null;

interface Props {
  column: ColumnType;
}

export default function FeedbackDrawer({ column }: Props) {
  const [isCooldown, setIsCooldown] = useState(false);
  const [option, setOption] = useState<Record<OptionType, boolean>>({
    routineComposition: false,
    exerciseArrangement: false,
    exerciseStrength: false,
  });
  const [feedback, setFeedback] = useState<FeedbackType>(null);

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

    await createFeedBack(body)
      .then((response) => {
        const result = JSON.parse(response);
        setFeedback((prev) => ({ ...prev, ...result }));
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => setIsCooldown(false));
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
          <div className="flex flex-col gap-4 px-1 py-2">
            {feedback ? (
              Object.entries(feedback).map(([key, value]) => {
                if (!value) return null;
                return (
                  <div key={key} className="bg-muted/50 rounded-lg p-4">
                    <h2 className="text-primary mb-2 flex items-center gap-2 font-semibold">
                      {OPTION_NAME[key as OptionType]}
                    </h2>
                    <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-wrap">
                      {value}
                    </p>
                  </div>
                );
              })
            ) : (
              <div className="text-muted-foreground flex h-40 items-center justify-center text-sm">
                옵션을 선택하고 생성하기 버튼을 눌러주세요.
              </div>
            )}
          </div>
        </DrawerElement.Content>
        <DrawerElement.Footer>
          <GenerateButton loading={isCooldown} onClick={handleClickGenerate} />
        </DrawerElement.Footer>
      </DrawerElement.Body>
    </Drawer>
  );
}

const OPTION_NAME: Record<OptionType, string> = {
  routineComposition: '루틴 구성',
  exerciseArrangement: '운동 배치',
  exerciseStrength: '운동 강도',
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
            size="sm"
            variant={option[e as OptionType] ? 'default' : 'outline'}
            onClick={handleClickOption}
          >
            {option[e as OptionType] && <Check className="mr-1 size-3" />}
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
    <button
      onClick={onClick}
      disabled={loading}
      className="group relative inline-flex h-10 w-full overflow-hidden rounded-md p-0.5 focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-slate-50 focus:outline-none"
    >
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#10b981_0%,#d1fae5_50%,#10b981_100%)]" />
      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-md bg-linear-to-r from-emerald-500 to-green-700 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl transition-all transition-colors group-hover:from-emerald-600 group-hover:to-green-700">
        {loading ? (
          <LoaderCircle className="size-4 animate-spin" />
        ) : (
          <span>생성하기</span>
        )}
      </span>
    </button>
  );
}

const makeRoutine = (data: ColumnType) => {
  return data
    ?.map(({ exerciseId, sets }) => {
      const exercise = EXERCISE_DATA.find((e) => e.id === exerciseId);
      if (!exercise) return null;

      const isCardioExercise = isCardio(exerciseId);
      const formattedSets = sets.map((set) => {
        if (isCardioExercise) {
          return {
            weight: `${set.weight / 10}km`,
            reps: `${set.reps}분`,
          };
        }
        return {
          weight: `${set.weight}kg`,
          reps: `${set.reps}회`,
        };
      });

      return {
        name: exercise.ko,
        sets: formattedSets,
      };
    })
    .filter(Boolean);
};
