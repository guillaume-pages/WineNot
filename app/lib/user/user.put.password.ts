'use server';

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&,#.])[A-Za-z\d@$!%*?&,#.]{10,}$/;

export async function modifPassword(userId: string, oldPassword: string, newPassword: string) {
  const updatetedDate = new Date().toISOString();

  try {
    if (!newPassword.match(passwordRegex)) {
      throw new Error('Le nouveau mot de passe doit contenir au moins 10 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial');
    }

    const user = await prisma.users.findUnique({
      where: {
        user_id: userId,
      },
    });

    if (!user) {
      throw new Error('Utilisateur non trouvé');
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordValid) {
      throw new Error('Ancien mot de passe incorrect');
    }

    const isPasswordSame = await bcrypt.compare(newPassword, user.password);

    if (isPasswordSame) {
      throw new Error('Le nouveau mot de passe doit être différent de l\'ancien');
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    await prisma.users.update({
      where: {
        user_id: userId,
      },
      data: {
        password: hashedNewPassword,
        updatedAt: updatetedDate,
      },
    });

    return user;
  } catch (error) {
    console.error('Erreur lors de la modification du mot de passe:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
