import { GoogleGenAI } from '@google/genai';

export default async function generateFeedback(text: string) {
  const key = process.env.GEMINI_API_KEY;

  if (!key) throw new Error('The key does not exist.');

  if (!text || text.trim().length === 0) {
    throw new Error('Input text is empty or invalid.');
  }

  const prompt = text;

  try {
    const genAI = new GoogleGenAI({ apiKey: key });
    const response = await genAI.models.generateContent({
      model: 'gemini-2.0-flash',
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
