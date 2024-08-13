'use server';

import { PrismaClient } from '@prisma/client';
import { UserInformation } from '@/types/user.type';

const prisma = new PrismaClient();

export const getUserInformation = async (id: string): Promise<UserInformation> => {
  try {
    const user = await prisma.users.findUnique({
      where: { user_id: id },
    });

    if (!user) {
      throw new Error('Utilisateur introuvable');
    }

    const userCellars = await prisma.users_cellars.findMany({
      where: { user_id: id },
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

    const informations: UserInformation = {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      phone: user.phone,
      image: user.image,
      status: user.status,
      created_at: user.created_at,
      updated_at: user.updated_at,
      cellars: userCellars.map((userCellar) => {
        const { cellars } = userCellar;
        return {
          ...cellars,
        };
      }),
    };

    return informations;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};
