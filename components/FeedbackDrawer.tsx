import { BotMessageSquare, ListFilter, LoaderCircle } from 'lucide-react';
import { Button } from './ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from './ui/drawer';
import { MouseEvent, useState } from 'react';
import { ColumnType } from '@/mock/column';
import { EXERCISE_DATA } from '@/mock/exercise';
import { convert62to10 } from '@/lib/convertNumeralSystem';
import { createFeedBack } from '@/service/ai.api';

type RoutineType = {
  name: string;
  sets: { weight: number; reps: number }[];
}[];

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

interface IOption {
  sequence: boolean;
  strength: boolean;
  exercise: boolean;
}

interface Props {
  column: ColumnType;
}

export default function FeedbackDrawer({ column }: Props) {
  const [isCooldown, setIsCooldown] = useState(false);
  const [option, setOption] = useState<IOption>({
    sequence: false,
    strength: false,
    exercise: false,
  });

  const handleClickOption = (e: MouseEvent<HTMLButtonElement>) => {
    const name = e.currentTarget.name as 'sequence' | 'strength' | 'exercise';
    if (!name) return;
    setOption((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const handleClickGenerate = async () => {
    if (isCooldown) return;

    const routine = JSON.stringify(makeRoutine(column));
    if (!routine || routine.length === 0)
      return alert('등록된 운동 계획이 없습니다.');

    setIsCooldown(true);

    const body = {
      routine,
      option,
    };

    await createFeedBack(body).then((result) => console.log(result));
    setTimeout(() => setIsCooldown(false), 10000);
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="size-9 p-0" variant="outline">
          <BotMessageSquare className="size-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-w-m-max min-w-m-min mx-auto h-[80vh]">
        <DrawerHeader className="pb-2">
          <DrawerTitle>
            <span>피드백 생성하기</span>
          </DrawerTitle>
          <DrawerDescription className="text-xs">
            AI 피드백을 생성해보세요!
          </DrawerDescription>
        </DrawerHeader>

        <div className="flex flex-col gap-4 p-3">
          <div className="px-1">
            <h3 className="mb-2 flex items-center gap-1 text-sm font-semibold">
              <ListFilter className="size-4" /> <span>피드백 옵션</span>
            </h3>
            <div className="flex gap-2">
              <Button
                name="sequence"
                className="grow"
                variant={option.sequence ? 'default' : 'outline'}
                onClick={handleClickOption}
              >
                운동 순서
              </Button>
              <Button
                name="strength"
                className="grow"
                variant={option.strength ? 'default' : 'outline'}
                onClick={handleClickOption}
              >
                운동 강도
              </Button>
              <Button
                name="exercise"
                className="grow"
                variant={option.exercise ? 'default' : 'outline'}
                onClick={handleClickOption}
              >
                운동 선택
              </Button>
            </div>
          </div>
          <Button
            variant={isCooldown ? 'ghost' : 'default'}
            onClick={handleClickGenerate}
          >
            {isCooldown ? (
              <LoaderCircle className="size-4 animate-spin" />
            ) : (
              <span>Generate</span>
            )}
          </Button>
        </div>

        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
