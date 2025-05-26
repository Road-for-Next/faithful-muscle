import { cn } from '@/lib/utils';

interface Props {
  ref: React.RefObject<HTMLDivElement | null>;
  open: boolean;
  maxHeight: number;
  children: React.ReactNode;
}

export default function RowCardBody({ ref, open, maxHeight, children }: Props) {
  return (
    <div
      className={cn(
        'overflow-hidden transition-all duration-300',
        'data-[open=true]:animate-fade-in',
        'data-[open=false]:animate-fade-out',
      )}
      style={{ maxHeight }}
      data-open={open}
      ref={ref}
    >
      {children}
    </div>
  );
}
