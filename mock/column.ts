type SetType = { weight: string; reps: string };
type RowType = { id: string; exerciseId: string; sets: SetType[] };
type ColumnType = RowType[];

const now = Date.now().toString();

const COLUMN_DATA: ColumnType = JSON.parse(`[
  {
    "id" : "${now}-0",
    "exerciseId": "0",
    "sets": [
      {
        "weight": "1I",
        "reps": "8"
      },
      {
        "weight": "1U",
        "reps": "6"
      }
    ]
  },
  {
  "id" : "${now}-1",
    "exerciseId": "1",
    "sets": [
      {
        "weight": "10",
        "reps": "A"
      },
      {
        "weight": "14",
        "reps": "8"
      },
      {
        "weight": "18",
        "reps": "6"
      }
    ]
  },
  {
  "id" : "${now}-2",
    "exerciseId": "2",
    "sets": [
      {
        "weight": "10",
        "reps": "A"
      }
    ]
  },
  {
  "id" : "${now}-3",
    "exerciseId": "3",
    "sets": [
      {
        "weight": "10",
        "reps": "A"
      },
      {
        "weight": "14",
        "reps": "8"
      },
      {
        "weight": "18",
        "reps": "6"
      },
      {
        "weight": "1C",
        "reps": "4"
      }
    ]
  },
  {
  "id" : "${now}-4",
    "exerciseId": "4",
    "sets": [
      {
        "weight": "10",
        "reps": "A"
      },
      {
        "weight": "14",
        "reps": "8"
      }
    ]
  },
  {
  "id" : "${now}-5",
    "exerciseId": "5",
    "sets": [
      {
        "weight": "10",
        "reps": "A"
      },
      {
        "weight": "14",
        "reps": "8"
      },
      {
        "weight": "18",
        "reps": "6"
      },
      {
        "weight": "1C",
        "reps": "4"
      }
    ]
  },
  {
  "id" : "${now}-6",
    "exerciseId": "6",
    "sets": [
      {
        "weight": "10",
        "reps": "A"
      }
    ]
  },
  {
  "id" : "${now}-7",
    "exerciseId": "7",
    "sets": [
      {
        "weight": "10",
        "reps": "A"
      },
      {
        "weight": "14",
        "reps": "8"
      },
      {
        "weight": "18",
        "reps": "6"
      }
    ]
  },
  {
  "id" : "${now}-8",
    "exerciseId": "8",
    "sets": [
      {
        "weight": "10",
        "reps": "A"
      },
      {
        "weight": "14",
        "reps": "8"
      }
    ]
  },
  {
  "id" : "${now}-9",
    "exerciseId": "9",
    "sets": [
      {
        "weight": "10",
        "reps": "A"
      },
      {
        "weight": "14",
        "reps": "8"
      }
    ]
  }
]`);

export type { SetType, RowType, ColumnType };
export { COLUMN_DATA };
