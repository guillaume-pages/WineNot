import { PrismaClient } from '@prisma/client';
import { auth } from '@/auth';
import type { Cellar } from '@/types/cellar.type';
import { Bottle } from '@/types/bottle.type';

const prisma = new PrismaClient();

export const getCellars = async () => {
  const session = await auth();
  const id = session?.user?.id;

  if (!id) {
    return [];
  }

  try {
    // Step 1: Get the user cellars
    const userCellars = await prisma.users_cellars.findMany({
      where: {
        user_id: id,
      },
      include: {
        cellars: true,
      },
    });

    if (!userCellars.length) {
      return [];
    }

    // Step 2: Get all bottle IDs from the cellars
    const bottleIds = userCellars.flatMap(
      (userCellar) => userCellar.cellars.bottles,
    );

    // Step 3: Fetch the bottle details
    const bottles = await prisma.bottles.findMany({
      where: {
        bottle_id: { in: bottleIds },
      },
    });

    const cellarsWithBottles: Cellar[] = userCellars.map((userCellar) => {
      const { cellars, ...userCellarRest } = userCellar;
      const bottlesInCellar = cellars.bottles
        .map((bottleId) =>
          bottles.find((bottle) => bottle.bottle_id === bottleId),
        )
        .filter(Boolean); // This line filters out any undefined values

      return {
        ...userCellarRest,
        cellars: {
          ...cellars,
          bottles: bottlesInCellar as Bottle[], // Assure TypeScript that bottlesInCellar is now strictly of type Bottle[]
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
