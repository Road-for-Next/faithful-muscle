class Day {
  ko: string; // 한국어 요일 이름
  en: string; // 영어 요일 이름

  constructor(ko: string, en: string) {
    this.ko = ko;
    this.en = en;
  }

  // 한국어 요일 이름을 원하는 길이만큼 반환
  koSlice(length: number): string {
    return this.ko.slice(0, length);
  }

  // 영어 요일 이름을 원하는 길이만큼 반환
  enSlice(length: number): string {
    return this.en.slice(0, length);
  }
}

// DAYS 배열 정의 (Day 타입의 배열)
const DAYS: Day[] = [
  new Day('일요일', 'Sunday'),
  new Day('월요일', 'Monday'),
  new Day('화요일', 'Tuesday'),
  new Day('수요일', 'Wednesday'),
  new Day('목요일', 'Thursday'),
  new Day('금요일', 'Friday'),
  new Day('토요일', 'Saturday'),
];

export { DAYS };
