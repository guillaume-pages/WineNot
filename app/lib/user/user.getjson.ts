'use server';

import { PrismaClient } from '@prisma/client';
import { UserInformation } from '@/types/user.type';

const prisma = new PrismaClient();

export const getUserInformation = async (id: string) => {
  try {
    const user = await prisma.users.findUnique({
      where: { user_id: id },
    });

    if (!user) {
      throw new Error('Utilisateur introuvable');
    }

    const user_cellar = await prisma.users_cellars.findMany({
      where: { user_id: id },
    });

    const cellarsId = user_cellar.map((cellar) => cellar.cellar_id);

    const informations: UserInformation = {
      firstname: user?.firstname,
      lastname: user?.lastname,
      email: user?.email,
      phone: user?.phone,
      image: user?.image,
      status: user?.status,
      created_at: user?.createdAt,
      updated_at: user?.updatedAt,
      cellars: [],
    };
    
    const cellars = await prisma.cellars.findMany({
      where: { cellar_id: { in: cellarsId } },
    });
    
    const bottleIds = cellars.flatMap(cellar => cellar.bottles);
    
    const bottles = await prisma.bottles.findMany({
      where: { bottle_id: { in: bottleIds } },
    });
    
    const cellarsWithBottles = cellars.map(cellar => {
      return {
        ...cellar,
        bottles: bottles.filter(bottle => cellar.bottles.includes(bottle.bottle_id))
      };
    });
    
    informations.cellars = cellarsWithBottles;    

    return informations;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};
