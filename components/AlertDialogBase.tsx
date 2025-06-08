'use client';

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

  return (
    <AlertDialog open={open} onOpenChange={() => {}}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-row">
          <AlertDialogAction className="grow" onClick={handler}>
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
