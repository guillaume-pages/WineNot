'use server';

import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

type State = {
  message?: string | null;
};

const FormDataSchema = z.object({
  cellar_name: z.string().min(4),
  user_id: z.string(),
});

export const createCellar = async (cellarName: string, user_id: string) => {
  if (cellarName.length <= 4) {
    throw new Error('Le nom de la cave doit contenir au moins 4 caractères.');
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
        user_id: user_id,
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
