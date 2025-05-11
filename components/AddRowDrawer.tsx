'use client';

import { Drawer } from '@/components/ui/drawer';
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
import DrawerElement from './DrawerElement';

interface Props {
  createRow: (exerciseId: string) => void;
}

export default function AddRowDrawer({ createRow }: Props) {
  const [enable, setEnable] = useState(true);
  const closerRef = useRef<HTMLButtonElement>(null);

  const closeDrawer = () => closerRef.current?.click();

  const handleAddRow = (exerciseId: string) => {
    if (enable) {
      setEnable(false);
      createRow(exerciseId);
    }
    closeDrawer();
  };

  const reset = () => setEnable(true);

  return (
    <Drawer onClose={reset}>
      <DrawerElement.Trigger>추가하기</DrawerElement.Trigger>
      <DrawerElement.Body>
        <DrawerElement.Header
          titleIcon={<Dumbbell className="size-4" />}
          titleText={<span>운동 추가하기</span>}
          description={'운동을 검색해서 루틴에 추가해보세요!'}
        />
        <SearchExercise onAdd={handleAddRow} />
        <DrawerElement.Footer closerRef={closerRef} />
      </DrawerElement.Body>
    </Drawer>
  );
}

interface SearchExerciseProps {
  onAdd: (exerciseId: string) => void;
}

function SearchExercise({ onAdd }: SearchExerciseProps) {
  const [keyword, setKeyword] = useState('');
  const [suggestions, setSuggestions] = useState<ExerciseType[]>([]);

  const handleSelectExercise = (exerciseId: string) => {
    onAdd(exerciseId);
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
    <Command label="운동 검색" className="bg-background" shouldFilter={false}>
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
  );
}
