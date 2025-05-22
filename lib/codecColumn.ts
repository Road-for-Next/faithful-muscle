import { ColumnType, RowType, SetType } from '@/mock/column';
import { convert10to62, convert62to10 } from './convertNumeralSystem';

// w : 인코딩 된 weight
// r : 인코딩 된 reps
// s : 인코딩 된 set
// ss : 인코딩 된 sets

const W_LENGTH = 2; // 인코딩 weight 길이
const R_LENGTH = 2; // 인코딩 reps 길이
const S_LENGTH = W_LENGTH + R_LENGTH; // 인코딩 set 길이
const ROW_DIVISION = '.'; // 인코딩 문자열 row 구분자

const encodeColumnToQuery = (day: number, column: ColumnType) => {
  const result: string[] = column.map((row) => {
    const { exerciseId, sets } = row;
    const ss: string[] = sets.map((set) => {
      const weight = convert10to62(set.weight);
      const reps = convert10to62(set.reps);
      const w = weight.length === W_LENGTH ? weight : '0' + weight;
      const r = reps.length === R_LENGTH ? reps : '0' + reps;
      return w + r;
    });
    return exerciseId + ss.join('');
  });
  return day + btoa(result.join(ROW_DIVISION));
};

const decodeQueryToColumn = (query: string) => {
  const now = Date.now().toString();
  const day = query.slice(0, 1);
  const temp = atob(query.slice(1));
  const col = temp.split(ROW_DIVISION);
  const column: ColumnType = col.map((e, index) => {
    const exerciseId = e.slice(0, e.length % S_LENGTH);
    const ss = e.slice(e.length % S_LENGTH);
    const sets: SetType[] = [];
    for (let i = 0; i < ss.length; i += S_LENGTH) {
      const s = ss.slice(i, i + S_LENGTH);
      const w = s.slice(0, W_LENGTH);
      const r = s.slice(W_LENGTH);
      const weight = convert62to10(w);
      const reps = convert62to10(r);
      sets.push({ weight, reps });
    }
    return { id: `${now}-${index}`, exerciseId, sets } as RowType;
  });
  return { day, column };
};

export { encodeColumnToQuery, decodeQueryToColumn };
