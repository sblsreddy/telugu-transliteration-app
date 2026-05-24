import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const secret = url.searchParams.get('secret');
  const expected = process.env.ADMIN_SECRET;

  if (!expected || secret !== expected) {
    return NextResponse.json({ error: 'Unauthorized access.' }, { status: 401 });
  }

  const history = await prisma.transliteration.findMany({
    orderBy: { createdAt: 'desc' },
    take: 50,
  });

  return NextResponse.json({ history });
}
