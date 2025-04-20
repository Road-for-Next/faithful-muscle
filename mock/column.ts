type SetType = { weight: string; reps: string };
type RowType = { exerciseId: string; sets: SetType[] };
type ColumnType = RowType[];

const COLUMN_DATA: ColumnType = JSON.parse(`[
  {
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
    "exerciseId": "2",
    "sets": [
      {
        "weight": "10",
        "reps": "A"
      }
    ]
  },
  {
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
    "exerciseId": "6",
    "sets": [
      {
        "weight": "10",
        "reps": "A"
      }
    ]
  },
  {
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
