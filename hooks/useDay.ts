import { useState } from 'react';

type Day = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';

const DAY_LIST: Day[] = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

const initializeDay = () => DAY_LIST[new Date().getDay()];

/**
 * 요일 관리 커스텀 훅
 * @property day - 선택된 요일 / 기본값 오늘의 요일
 * @property setDay - 요일 변경
 */
const useDay = () => {
  const [day, set] = useState<Day>(() => initializeDay());

  const setDay = (param?: number | Day) => {
    switch (typeof param) {
      case 'number':
        set(DAY_LIST[param]);
        break;
      case 'string':
        set(param as Day);
        break;
      default:
        set(initializeDay());
    }
  };

  return { day, setDay };
};

export type { Day };
export { useDay, DAY_LIST };
