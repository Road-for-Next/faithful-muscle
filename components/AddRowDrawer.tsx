'use client';

import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { useEffect, useRef, useState } from 'react';
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from './ui/command';
import { EXERCISE_DATA, ExerciseType } from '@/mock/exercise';
import { Dumbbell } from 'lucide-react';
import { RowType } from '@/mock/column';

interface props {
  onAdd: (row: RowType) => void;
}

export default function AddRowDrawer({ onAdd }: props) {
  const [keyword, setKeyword] = useState('');
  const [suggestions, setSuggestions] = useState<ExerciseType[]>([]);
  const [able, setAble] = useState(true);
  const closerRef = useRef<HTMLButtonElement>(null);

  const handleSelectExercise = (id: string) => {
    if (able) {
      setAble(false);
      const row: RowType = { exerciseId: id, sets: [] };
      onAdd(row);
    }
    closerRef.current?.click();
  };

  const reset = () => {
    setAble(true);
    setKeyword('');
  };

  useEffect(() => {
    if (keyword.length > 0) {
      const filteredSuggestions: ExerciseType[] = EXERCISE_DATA.filter(
        (exercise) =>
          exercise.en.toLowerCase().includes(keyword.toLowerCase()) ||
          exercise.ko.includes(keyword),
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [keyword]);

  return (
    <Drawer onClose={reset}>
      <DrawerTrigger asChild>
        <Button>추가하기</Button>
      </DrawerTrigger>
      <DrawerContent className="max-w-m-max min-w-m-min mx-auto h-[80vh]">
        <DrawerHeader className="pb-2">
          <DrawerTitle className="flex items-center gap-1">
            <Dumbbell className="size-4" />
            <span>운동 추가하기</span>
          </DrawerTitle>
          <DrawerDescription className="text-xs">
            운동을 검색해서 루틴에 추가해보세요!
          </DrawerDescription>
        </DrawerHeader>

        <Command
          label="운동 검색"
          className="bg-background"
          shouldFilter={false}
        >
          <CommandInput
            value={keyword}
            onValueChange={(value) => setKeyword(value)}
            placeholder="운동을 검색하세요..."
            autoFocus
          />
          <CommandList className="mx-2 max-h-full grow">
            {keyword && <CommandEmpty>검색된 운동이 없습니다.</CommandEmpty>}
            {suggestions.map((e) => (
              <CommandItem
                key={e.id}
                value={e.id}
                keywords={[e.ko, e.en]}
                onSelect={handleSelectExercise}
              >
                <span>{e.ko}</span>
                <span className="text-muted-foreground text-xs">{e.en}</span>
                <CommandShortcut>{e.id}</CommandShortcut>
              </CommandItem>
            ))}
          </CommandList>
        </Command>

        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline" ref={closerRef}>
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
