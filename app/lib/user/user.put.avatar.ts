'use server';

import prisma from '@/prisma/prisma';

export async function modifAvatar(userId: string, newAvatar: string) {
  const updatetedDate = new Date().toISOString();
  try {
    const user = await prisma.users.update({
      where: {
        user_id: userId,
      },
      data: {
        image: newAvatar,
        updated_at: updatetedDate,
      },
    });

    return user;
  } catch (error) {
    console.error("Erreur lors de la modification de l'avatar:", error);
    throw error;
  }
}
