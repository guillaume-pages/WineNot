'use server';

import prisma from '@/prisma/prisma';
import type { Bottle } from '@/types/bottle.type';

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
  }
}
