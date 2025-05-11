import React, { ReactNode } from 'react';
import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';

const DrawerElement = {
  Body,
  Trigger,
  Header,
  Content,
  Footer,
};

export default DrawerElement;

interface BodyProps {
  children: ReactNode;
}

function Body({ children }: BodyProps) {
  return (
    <DrawerContent className="max-w-m-max min-w-m-min mx-auto h-[80vh]">
      {children}
    </DrawerContent>
  );
}

interface TriggerProps {
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
    | null
    | undefined;
  className?: string;
  children: ReactNode;
}

function Trigger({ variant, className, children }: TriggerProps) {
  return (
    <DrawerTrigger asChild>
      <Button variant={variant} className={className}>
        {children}
      </Button>
    </DrawerTrigger>
  );
}

interface HeaderProps {
  titleIcon?: ReactNode;
  titleText: ReactNode;
  description: ReactNode;
}

function Header({ titleIcon, titleText, description }: HeaderProps) {
  return (
    <DrawerHeader className="pb-2">
      <DrawerTitle className="flex items-center gap-1">
        {titleIcon}
        {titleText}
      </DrawerTitle>
      <DrawerDescription className="text-xs">{description}</DrawerDescription>
    </DrawerHeader>
  );
}

interface ContentProps {
  children: ReactNode;
}

function Content({ children }: ContentProps) {
  return <div className="flex flex-col gap-4 p-3">{children}</div>;
}

interface FooterProps {
  closerRef?: React.RefObject<HTMLButtonElement | null>;
}

function Footer({ closerRef }: FooterProps) {
  return (
    <DrawerFooter>
      <DrawerClose asChild>
        <Button variant="outline" ref={closerRef}>
          취소하기
        </Button>
      </DrawerClose>
    </DrawerFooter>
  );
}
