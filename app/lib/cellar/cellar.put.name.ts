'use server';

import prisma from '@/prisma/prisma';

import { revalidatePath } from 'next/cache';

export const modifCellarName = async (cellarId: string, cellarName: string) => {
  const updateDate = new Date().toISOString();
  try {
    await prisma.cellars.update({
      where: {
        cellar_id: cellarId,
      },
      data: {
        cellar_name: cellarName,
        updated_at: updateDate,
      },
    });

    revalidatePath('/cellar');

    return {
      message: 'La cave a été renommée avec succès.',
    };
  } catch (error) {
    throw new Error('Erreur lors du renommage de la cave. Veuillez réessayer.');
  }
};
