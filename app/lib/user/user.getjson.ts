'use server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getUserInformation = async (id: string) => {
  try {
    const user = await prisma.users.findUnique({
      where: { user_id: id },
    });

    if (!user) {
      throw new Error('Utilisateur introuvable');
    }

    const informations = {
      firstname: user?.firstname,
      lastname: user?.lastname,
      email: user?.email,
      phone: user?.phone,
      image: user?.image,
      status: user?.status,
      created_at: user?.createdAt,
    };

    return informations;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};
