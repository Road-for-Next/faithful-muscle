import { BotMessageSquare, LoaderCircle } from 'lucide-react';
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
import { useState } from 'react';
import { ColumnType } from '@/mock/column';
import { EXERCISE_DATA } from '@/mock/exercise';
import { convert62to10 } from '@/lib/convertNumeralSystem';
import { createFeedBack } from '@/service/ai.api';

type PromptType = {
  name: string;
  sets: { weight: number; reps: number }[];
}[];

const makePrompt = (data: ColumnType) => {
  const prompt: PromptType = [];
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

interface Props {
  column: ColumnType;
}

export default function FeedbackDrawer({ column }: Props) {
  const [isCooldown, setIsCooldown] = useState(false);

  const handleClickGenerate = async () => {
    if (isCooldown) return;

    const prompt = makePrompt(column);
    if (!prompt || prompt.length === 0)
      return alert('등록된 운동 계획이 없습니다.');

    setIsCooldown(true);

    const text = JSON.stringify(prompt);
    await createFeedBack(text).then((result) => console.log(result));
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
          <DrawerTitle>Feedback</DrawerTitle>
          <DrawerDescription className="text-xs">
            Provide AI Feedback
          </DrawerDescription>
        </DrawerHeader>

        <Button
          className="size-9 p-0"
          variant="outline"
          onClick={handleClickGenerate}
        >
          {isCooldown ? (
            <LoaderCircle className="size-4 animate-spin" />
          ) : (
            <BotMessageSquare className="size-4" />
          )}
        </Button>

        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
