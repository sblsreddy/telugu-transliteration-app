import { NextResponse } from 'next/server';
import { prisma, fallbackStore } from '@/lib/db';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const secret = url.searchParams.get('secret');
  const expected = process.env.ADMIN_SECRET;

  if (!expected || secret !== expected) {
    return NextResponse.json({ error: 'Unauthorized access.' }, { status: 401 });
  }

  const history = prisma
    ? await prisma.transliteration.findMany({
        orderBy: { createdAt: 'desc' },
        take: 50,
      })
    : fallbackStore.history.slice(0, 50);

  return NextResponse.json({ history });
}
