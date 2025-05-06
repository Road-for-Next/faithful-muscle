import { GoogleGenAI } from '@google/genai';

interface IData {
  routine: string;
  option: {
    sequence: boolean;
    strength: boolean;
    exercise: boolean;
  };
}

export default async function generateFeedback(data: IData) {
  const key = process.env.GEMINI_API_KEY;

  if (!key) throw new Error('The key does not exist.');

  if (!data) throw new Error('Input data is empty or invalid.');

  const { routine, option } = data;

  if (!routine || routine.trim().length === 0) {
    throw new Error('Input text is empty or invalid.');
  }

  console.dir(option);

  const prompt = `다음 계획을 보고 하루 운동 루틴에 대해 적절하게 운동을 선택, 정렬, 강도 설정 했는지에 대해서만 짧은 피드백 해줘. 무게 단위는 kg 루틴 : ${routine}`;

  try {
    const genAI = new GoogleGenAI({ apiKey: key });
    const response = await genAI.models.generateContent({
      model: 'gemini-2.0-flash-lite',
      contents: prompt,
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
