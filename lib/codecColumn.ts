import { ColumnType, RowType, SetType } from '@/mock/column';

// w : 인코딩 된 weight
// r : 인코딩 된 reps
// s : 인코딩 된 set
// ss : 인코딩 된 sets

const W_LENGTH = 2; // 인코딩 weight 길이
const R_LENGTH = 2; // 인코딩 reps 길이
const S_LENGTH = W_LENGTH + R_LENGTH; // 인코딩 set 길이
const MIN_WEIGHT_LENGTH = 1; // weight의 최소 길이
const MIN_REPS_LENGTH = 1; // reps의 최소 길이
const ROW_DIVISION = '.'; // 인코딩 문자열 row 구분자

const encodeColumnToQuery = (column: ColumnType) => {
  const result: string[] = column.map((row) => {
    const { exerciseId, sets } = row;
    const ss: string[] = sets.map((set) => {
      const { weight, reps } = set;
      const w = weight.length === W_LENGTH ? weight : '0' + weight;
      const r = reps.length === R_LENGTH ? reps : '0' + reps;
      return w + r;
    });
    return exerciseId + ss.join('');
  });
  return btoa(result.join(ROW_DIVISION));
};

const decodeQueryToColumn = (query: string) => {
  const now = Date.now().toString();
  const temp = atob(query).split(ROW_DIVISION);
  const result: ColumnType = temp.map((e, index) => {
    const exerciseId = e.slice(0, e.length % S_LENGTH);
    const ss = e.slice(e.length % S_LENGTH);
    const sets: SetType[] = [];
    for (let i = 0; i < ss.length; i += S_LENGTH) {
      const s = ss.slice(i, i + S_LENGTH);
      const w = s.slice(0, W_LENGTH);
      const weight = w[0] === '0' ? w[MIN_WEIGHT_LENGTH] : w;
      const r = s.slice(W_LENGTH, R_LENGTH);
      const reps = r[0] === '0' ? r[MIN_REPS_LENGTH] : r;
      sets.push({ weight, reps });
    }
    return { id: `${now}-${index}`, exerciseId, sets } as RowType;
  });
  return result;
};

export { encodeColumnToQuery, decodeQueryToColumn };
