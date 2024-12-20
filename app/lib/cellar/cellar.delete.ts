'use server';

import prisma from '@/prisma/prisma';

import { revalidatePath } from 'next/cache';

export const deleteCellar = async (cellarId: string) => {
  try {
    await prisma.bottles_cellars.deleteMany({
      where: {
        cellar_id: cellarId,
      },
    });
    
    await prisma.users_cellars.deleteMany({
      where: {
        cellar_id: cellarId,
      },
    });

    await prisma.cellars.delete({
      where: {
        cellar_id: cellarId,
      },
    });

    console.log('Cellar deleted');

    revalidatePath('/cellar');

    return {
      message: 'La cave a été supprimée avec succès.',
    };
  } catch (error) {
    console.error('Error while deleting cellar', error);
    throw new Error(
      'Erreur lors de la suppression de la cave. Veuillez réessayer.',
    );
  }
};
