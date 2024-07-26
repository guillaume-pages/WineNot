'use server';

import { revalidatePath } from 'next/cache';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function modifAvatar(userId: string, newAvatar: string) {
  try {
    const user = await prisma.users.update({
      where: {
        user_id: userId,
      },
      data: {
        image: newAvatar,
      },
    });

    revalidatePath('/'); // Revalidate the profile page or any other relevant pages
    return user;
  } catch (error) {
    console.error("Erreur lors de la modification de l'avatar:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}