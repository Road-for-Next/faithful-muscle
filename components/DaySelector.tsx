import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DAYS } from '@/constants/day';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface props {
  day: number;
  onSelect: (day: number) => void;
}

export default function DaySelector({ day, onSelect }: props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex">
          <span>{DAYS[day].ko}</span>
          <ChevronDown className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" alignOffset={-8} sideOffset={8}>
        {DAYS.map((e, i) => (
          <DropdownMenuItem key={e.ko} onClick={() => onSelect(i)}>
            <span>{e.ko}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
