type GroupType = { weight: string; reps: string; set: string };
type ExerciseType = { exerciseId: string; groups: GroupType[] };

const COLUMN_DATA: ExerciseType[] = JSON.parse(`[
  {
    "exerciseId": "0",
    "groups": [
      {
        "weight": "1I",
        "reps": "8",
        "set": "3"
      },
      {
        "weight": "1U",
        "reps": "6",
        "set": "1"
      }
    ]
  },
  {
    "exerciseId": "1",
    "groups": [
      {
        "weight": "10",
        "reps": "A",
        "set": "3"
      },
      {
        "weight": "14",
        "reps": "8",
        "set": "2"
      },
      {
        "weight": "18",
        "reps": "6",
        "set": "1"
      }
    ]
  },
  {
    "exerciseId": "2",
    "groups": [
      {
        "weight": "10",
        "reps": "A",
        "set": "5"
      }
    ]
  },
  {
    "exerciseId": "3",
    "groups": [
      {
        "weight": "10",
        "reps": "A",
        "set": "3"
      },
      {
        "weight": "14",
        "reps": "8",
        "set": "2"
      },
      {
        "weight": "18",
        "reps": "6",
        "set": "1"
      },
      {
        "weight": "1C",
        "reps": "4",
        "set": "1"
      }
    ]
  },
  {
    "exerciseId": "4",
    "groups": [
      {
        "weight": "10",
        "reps": "A",
        "set": "3"
      },
      {
        "weight": "14",
        "reps": "8",
        "set": "2"
      }
    ]
  },
  {
    "exerciseId": "5",
    "groups": [
      {
        "weight": "10",
        "reps": "A",
        "set": "3"
      },
      {
        "weight": "14",
        "reps": "8",
        "set": "2"
      },
      {
        "weight": "18",
        "reps": "6",
        "set": "1"
      },
      {
        "weight": "1C",
        "reps": "4",
        "set": "1"
      }
    ]
  },
  {
    "exerciseId": "6",
    "groups": [
      {
        "weight": "10",
        "reps": "A",
        "set": "3"
      }
    ]
  },
  {
    "exerciseId": "7",
    "groups": [
      {
        "weight": "10",
        "reps": "A",
        "set": "3"
      },
      {
        "weight": "14",
        "reps": "8",
        "set": "2"
      },
      {
        "weight": "18",
        "reps": "6",
        "set": "1"
      }
    ]
  },
  {
    "exerciseId": "8",
    "groups": [
      {
        "weight": "10",
        "reps": "A",
        "set": "3"
      },
      {
        "weight": "14",
        "reps": "8",
        "set": "2"
      }
    ]
  },
  {
    "exerciseId": "9",
    "groups": [
      {
        "weight": "10",
        "reps": "A",
        "set": "3"
      },
      {
        "weight": "14",
        "reps": "8",
        "set": "2"
      }
    ]
  }
]`);

export type { GroupType, ExerciseType };
export { COLUMN_DATA };
