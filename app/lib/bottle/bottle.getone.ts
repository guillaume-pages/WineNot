'use server';

import { PrismaClient } from '@prisma/client';
import type { Bottle } from '@/types/bottle.type';

const prisma = new PrismaClient();

export async function getOneBottle(id: string) {
  try {
    const bottle = await prisma.bottles.findUnique({
      where: {
        bottle_id: id,
      },
    });

    return bottle as Bottle;
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
}
