'use server';

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function deleteUser(id: string, password: string) {
  try {
    const user = await prisma.users.findUnique({
      where: { user_id: id },
    });

    if (!user) {
      throw new Error('Utilisateur introuvable');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error('Mot de passe incorrect');
    }

    await prisma.users_cellars.deleteMany({
      where: { user_id: id },
    });

    const deletedUser = await prisma.users.delete({
      where: { user_id: id },
    });

    return deletedUser;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
