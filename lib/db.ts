import { PrismaClient } from '@prisma/client';

export type TransliterationRecord = {
  id: number;
  sourceText: string;
  resultText: string;
  createdAt: string;
};

const globalForPrisma = globalThis as typeof globalThis & {
  prisma?: PrismaClient | null;
  fallbackStore?: {
    history: TransliterationRecord[];
    nextId: number;
  };
};

const usePrisma = Boolean(process.env.DATABASE_URL);

export const useFallbackStore = !usePrisma;

export const prisma = usePrisma
  ? globalForPrisma.prisma ?? new PrismaClient()
  : null;

if (usePrisma && process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export const fallbackStore = globalForPrisma.fallbackStore ?? {
  history: [] as TransliterationRecord[],
  nextId: 1,
};

if (!globalForPrisma.fallbackStore) {
  globalForPrisma.fallbackStore = fallbackStore;
}
