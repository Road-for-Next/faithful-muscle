import { GoogleGenAI, Type } from '@google/genai';

interface IData {
  routine: string;
  option: {
    routineComposition: boolean;
    exerciseArrangement: boolean;
    exerciseStrength: boolean;
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

  const properties: Record<string, any> = {};

  if (option.routineComposition) {
    properties.routineComposition = {
      type: Type.STRING,
      description:
        '루틴의 구성, 종목 선정의 적절성, 부위별 배분 등을 평가하고 장점과 구체적인 개선점을 (마크다운 형식)',
    };
  }
  if (option.exerciseArrangement) {
    properties.exerciseArrangement = {
      type: Type.STRING,
      description:
        '운동 순서의 효율성(대근육->소근육, 복합관절->단순관절 등)을 판단하고 더 나은 배치가 있다면 제안 (마크다운 형식)',
    };
  }
  if (option.exerciseStrength) {
    properties.exerciseStrength = {
      type: Type.STRING,
      description:
        '세트 수, 무게, 반복 횟수(또는 거리, 시간)를 고려한 운동 강도 및 볼륨 평가 (마크다운 형식)',
    };
  }

  const responseSchema = { type: Type.OBJECT, properties };

  let prompt = `전문 트레이너의 관점에서 다음 운동 루틴에 대한 피드백을 responseSchema에 맞춰 JSON으로 제공해줘. 루틴 데이터: ${routine}\n`;

  prompt += `각 항목에 대한 작성 지침 (가독성을 위해 마크다운 문법을 사용해줘):\n`;

  if (option.routineComposition) {
    prompt += `- routineComposition: 루틴의 전반적인 구성과 균형을 분석하고, 부족한 부분이나 과한 부분에 대해 조언해줘.\n`;
  }
  if (option.exerciseArrangement) {
    prompt += `- exerciseArrangement: 운동 수행 순서가 에너지를 효율적으로 사용할 수 있도록 배치되었는지 확인하고 수정 제안을 해줘.\n`;
  }
  if (option.exerciseStrength) {
    prompt += `- exerciseStrength: 설정된 무게와 횟수(또는 거리와 시간)가 해당 운동의 일반적인 목적(근비대, 지구력 등)에 부합하는지 평가해줘.\n`;
  }

  try {
    const genAI = new GoogleGenAI({ apiKey: key });
    const response = await genAI.models.generateContent({
      model: 'gemini-2.5-flash-lite',
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
