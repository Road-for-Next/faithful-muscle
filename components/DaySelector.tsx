import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DAYS } from '@/constants/day';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import useDay from '@/hooks/useDay';

export default function DaySelector() {
  const { setDay, Day } = useDay();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex">
          <span>{Day.ko}</span>
          <ChevronDown className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" alignOffset={-8} sideOffset={8}>
        {DAYS.map((e, i) => (
          <DropdownMenuItem key={e.ko} onClick={() => setDay(i)}>
            <span>{e.ko}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
