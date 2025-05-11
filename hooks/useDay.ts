import { DAYS } from '@/constants/day';
import useDayStore from '@/stores/useDay.store';
import { useEffect } from 'react';

// 오늘의 요일을 반환하는 함수
const initializeDay = () => new Date().getDay();

/**
 * @property day - 요일 인덱스 0(일요일) ~ 6(토요일)
 * @property setDat - 요일 선택 함수
 * @property Day - 요일 객체 / DAYS[day]와 동일
 */
const useDay = (initialDay?: number) => {
  const { day, setDay } = useDayStore((state) => state);

  const _setDay = (day: number) => {
    if (day >= 0 && day <= 6) setDay(day);
    else throw Error('Day must be between 0 and 6');
  };

  useEffect(() => {
    if (initialDay) setDay(initialDay);
    else setDay(initializeDay());
  }, [initialDay, setDay]);

  return { day, setDay: _setDay, Day: DAYS[day] };
};

export default useDay;
