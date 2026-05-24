import { NextResponse } from 'next/server';
import { prisma, fallbackStore } from '@/lib/db';
import { transliterate } from '@/lib/transliteration';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const text = typeof body?.text === 'string' ? body.text.trim() : '';

    if (!text) {
      return NextResponse.json({ error: 'Text is required.' }, { status: 400 });
    }

    const result = transliterate(text);
    let record;

    if (prisma) {
      record = await prisma.transliteration.create({
        data: {
          sourceText: text,
          resultText: result,
        },
      });
    } else {
      record = {
        id: fallbackStore.nextId++,
        sourceText: text,
        resultText: result,
        createdAt: new Date().toISOString(),
      };
      fallbackStore.history.unshift(record);
    }

    return NextResponse.json({ result, record });
  } catch (error) {
    console.error('Transliteration API error:', error);
    return NextResponse.json(
      { error: 'Unable to process transliteration at this time. Please check server logs or your configuration.' },
      { status: 500 }
    );
  }
}
