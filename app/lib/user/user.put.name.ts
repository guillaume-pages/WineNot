'use server';

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function modifNames(userId: string, newFirstname: string, newLastname: string) {
  const updatetedDate = new Date().toISOString();

  try {
    const user = await prisma.users.findUnique({
      where: {
        user_id: userId,
      },
    });

    if (!user) {
      throw new Error("Utilisateur non trouvé");
    }

    await prisma.users.update({
      where: {
        user_id: userId,
      },
      data: {
        firstname: newFirstname,
        lastname: newLastname,
        updatedAt: updatetedDate,
      },
    });

    return user;
  } catch (error) {
    console.error("Erreur lors de la modification du nom:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}