'use client';

import { MouseEvent } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import useAlertDialogStore from '@/stores/useAlertDialog.store';
import { Button } from './ui/button';

export default function AlertDialogBase() {
  const open = useAlertDialogStore((state) => state.open);
  const title = useAlertDialogStore((state) => state.title);
  const description = useAlertDialogStore((state) => state.description);
  const handler = useAlertDialogStore((state) => state.handler);
  const setClose = useAlertDialogStore((state) => state.setClose);

  const handleAction = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handler();
    setClose();
  };

  return (
    <AlertDialog open={open} onOpenChange={setClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-row">
          <AlertDialogAction className="grow" onClick={handleAction}>
            확인
          </AlertDialogAction>
          <Button className="grow" variant="outline" onClick={setClose}>
            취소
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
