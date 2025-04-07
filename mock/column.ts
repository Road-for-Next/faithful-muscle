type GroupType = { weight: string; reps: string; set: string };
type ExerciseType = { exercise: string; groups: GroupType[] };

const COLUMN_DATA: ExerciseType[] = JSON.parse(`[
  {
    "exercise": "0",
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
    "exercise": "1",
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
    "exercise": "2",
    "groups": [
      {
        "weight": "10",
        "reps": "A",
        "set": "5"
      }
    ]
  },
  {
    "exercise": "3",
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
    "exercise": "4",
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
    "exercise": "5",
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
    "exercise": "6",
    "groups": [
      {
        "weight": "10",
        "reps": "A",
        "set": "3"
      }
    ]
  },
  {
    "exercise": "7",
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
    "exercise": "8",
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
    "exercise": "9",
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
