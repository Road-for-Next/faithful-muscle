import { cn } from '@/lib/utils';
import * as React from 'react';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        className={cn('mx-auto max-w-[430px] min-w-[360px] p-4', className)}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  },
);
Container.displayName = 'Container';

export { Container };
