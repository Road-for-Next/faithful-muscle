import Image from 'next/image';
import src from '@/public/empty_routine.png';

export default function EmptyRoutine() {
  return (
    <div className="fixed top-1/3 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-2">
      <div className="relative h-48 w-48">
        <Image fill src={src} alt="등록된 운동 계획이 없습니다." />
      </div>
      <div className="text-muted-foreground w-56 text-center">
        등록된 운동 계획이 없습니다.
      </div>
    </div>
  );
}
