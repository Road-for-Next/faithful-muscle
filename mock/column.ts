type GroupType = { weight: string; reps: string };
type RowType = { exerciseId: string; groups: GroupType[] };
type ColumnType = RowType[];

const COLUMN_DATA: ColumnType = JSON.parse(`[
  {
    "exerciseId": "0",
    "groups": [
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
    "groups": [
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
    "groups": [
      {
        "weight": "10",
        "reps": "A"
      }
    ]
  },
  {
    "exerciseId": "3",
    "groups": [
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
    "groups": [
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
    "groups": [
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
    "groups": [
      {
        "weight": "10",
        "reps": "A"
      }
    ]
  },
  {
    "exerciseId": "7",
    "groups": [
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
    "groups": [
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
    "groups": [
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

export type { GroupType, RowType, ColumnType };
export { COLUMN_DATA };
