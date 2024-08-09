'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

const cellarNameRegex = /^[a-zA-Z0-9\s'-]{4,50}$/;

export const createCellar = async (cellarName: string, userId: string) => {
  if (!cellarNameRegex.test(cellarName)) {
    throw new Error('Le nom de la cave est invalide. Il doit contenir entre 4 et 50 caractères et ne peut contenir que des lettres, chiffres, espaces, apostrophes ou tirets.');
  }

  try {
    const newCellar = await prisma.cellars.create({
      data: {
        cellar_name: cellarName,
        created_at: new Date(),
      },
    });

    await prisma.users_cellars.create({
      data: {
        user_id: userId,
        cellar_id: newCellar.cellar_id,
      },
    });

    revalidatePath('/cellar');

    return {
      message: 'Votre cave a été créée avec succès.',
    };
  } catch (error) {
    throw new Error(
      'Erreur lors de la création de la cave. Veuillez réessayer.',
    );
  } finally {
    await prisma.$disconnect();
  }
};
