'use server';

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const mailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export async function modifMail(userId: string, oldMail: string, newMail: string) {
  try {
    if (!newMail.match(mailRegex)) {
      throw new Error('Le nouveau mail n\'est pas valide');
    }

    const user = await prisma.users.findUnique({
      where: {
        user_id: userId,
      },
    });

    if (!user) {
      throw new Error('Utilisateur non trouvé');
    }

    let isMailValid = false;
    
    if (oldMail === user.email) {
      isMailValid = true;
    }

    if (!isMailValid) {
      throw new Error('Ancien mail incorrect');
    }

    const isMailSame = await bcrypt.compare(newMail, user.email);

    if (isMailSame) {
      throw new Error('Le nouveau mail doit être différent de l\'ancien');
    }

    await prisma.users.update({
      where: {
        user_id: userId,
      },
      data: {
        email: newMail,
      },
    });

    return user;
  } catch (error) {
    console.error('Erreur lors de la modification du mail:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}