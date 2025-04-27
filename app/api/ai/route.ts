import generateFeedback from '@/lib/generateFeedback';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { data } = await request.json();

  if (!data)
    return NextResponse.json({ error: '데이터가 없습니다.' }, { status: 422 });
  try {
    const result = await generateFeedback(data);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
