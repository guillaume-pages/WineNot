import { PrismaClient } from '@prisma/client';
import { auth } from '@/auth';
import type { Cellar } from '@/types/cellar.type';


const prisma = new PrismaClient();

export const getCellars = async () => {
  const session = await auth();

  const id = session?.user?.id;

  try {
    const userCellars = await prisma.users_cellars.findMany({
      where: {
        user_id: id,
      },
      include: {
        cellars: true,
      },
    });

    return userCellars as Cellar[];
  
  } catch (error) {
    console.error(error);
    return [];
  }
}