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
import { useEffect, useState } from 'react';
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from './ui/command';
import { EXERCISE_DATA, ExerciseType } from '@/mock/exercise';

export default function AddExerciseDrawer() {
  const [keyword, setKeyword] = useState('');
  const [suggestions, setSuggestions] = useState<ExerciseType[]>([]);
  const [selected, setSelected] = useState<ExerciseType | null>(null);

  useEffect(() => console.log(selected), [selected]);

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
    <Drawer onClose={() => setKeyword('')}>
      <DrawerTrigger asChild>
        <Button>추가하기</Button>
      </DrawerTrigger>
      <DrawerContent className="h-[80vh]">
        <DrawerHeader className="hidden">
          <DrawerTitle>운동 추가하기</DrawerTitle>
          <DrawerDescription>
            운동을 검색해서 루틴에 추가해보세요
          </DrawerDescription>
        </DrawerHeader>

        <Command label="운동 검색" className="mt-4" shouldFilter={false}>
          <CommandInput
            value={keyword}
            onValueChange={(value) => setKeyword(value)}
            placeholder="운동을 검색하세요..."
            autoFocus
          />
          <CommandList>
            {keyword && <CommandEmpty>No results found.</CommandEmpty>}
            {suggestions.map((e) => (
              <CommandItem
                key={e.id}
                keywords={[e.ko, e.en]}
                onSelect={() => setSelected(e)}
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
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
