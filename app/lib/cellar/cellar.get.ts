import { PrismaClient } from '@prisma/client';
import { auth } from '@/auth';
import type { Cellar } from '@/types/cellar.type';
import { Bottle } from '@/types/bottle.type';

const prisma = new PrismaClient();

export const getCellars = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return [];
  }

  try {
    const userCellars = await prisma.users_cellars.findMany({
      where: {
        user_id: userId,
      },
      include: {
        cellars: {
          include: {
            bottles_cellars: {
              include: {
                bottles: true,
              },
            },
          },
        },
      },
    });

    if (!userCellars.length) {
      return [];
    }

    const cellarsWithBottles: Cellar[] = userCellars.map((userCellar) => {
      const { cellars, ...userCellarRest } = userCellar;

      const bottlesInCellar = cellars.bottles_cellars.map(
        (bottleCellar) => bottleCellar.bottles
      );

      return {
        ...userCellarRest,
        cellars: {
          ...cellars,
          bottles: bottlesInCellar as Bottle[],
        },
      };
    });

    return cellarsWithBottles;
  } catch (error) {
    console.error(error);
    return [];
  } finally {
    await prisma.$disconnect();
  }
};
