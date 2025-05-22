import { GoogleGenAI, Type } from '@google/genai';

interface IData {
  routine: string;
  option: {
    routineComposition: boolean;
    exerciseArrangement: boolean;
    exerciseStrength: boolean;
  };
}

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    routineComposition: {
      type: Type.STRING,
      description: '루틴이 적절하게 구성했는지 평가하고 장점과 개선점을 알려줘',
    },
    exerciseArrangement: {
      type: Type.STRING,
      description:
        '운동의 배치가 적절한지에 판단하고 더 좋은 배치가 있다면 알려줘',
    },
    exerciseStrength: {
      type: Type.STRING,
      description: '운동의 강도가 적절한지에 대해 평가해줘',
    },
  },
};

export default async function generateFeedback(data: IData) {
  const key = process.env.GEMINI_API_KEY;

  if (!key) throw new Error('The key does not exist.');

  if (!data) throw new Error('Input data is empty or invalid.');

  const { routine } = data;

  if (!routine || routine.trim().length === 0) {
    throw new Error('Input text is empty or invalid.');
  }

  const prompt = `responseSchema에 맞게 일일 루틴을 피드백해. routine : ${routine}`;

  try {
    const genAI = new GoogleGenAI({ apiKey: key });
    const response = await genAI.models.generateContent({
      model: 'gemini-2.0-flash-lite',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema,
      },
    });

    if (!response.text) {
      throw new Error('Empty response received from Gemini API.');
    }
    console.log(response);
    return response.text;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error generating summary: ${error.message}`);
    } else {
      throw new Error('An unknown error occurred while generating summary.');
    }
  }
}
