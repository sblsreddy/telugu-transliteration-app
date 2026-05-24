import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { transliterate } from '@/lib/transliteration';

export async function POST(request: Request) {
  const body = await request.json();
  const text = typeof body?.text === 'string' ? body.text.trim() : '';

  if (!text) {
    return NextResponse.json({ error: 'Text is required.' }, { status: 400 });
  }

  const result = transliterate(text);
  const record = await prisma.transliteration.create({
    data: {
      sourceText: text,
      resultText: result,
    },
  });

  return NextResponse.json({ result, record });
}
