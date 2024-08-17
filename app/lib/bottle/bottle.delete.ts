'use server';

import prisma from '@/prisma/prisma';

export const deleteBottle = async (bottle_id: string) => {
  try {
    await prisma.bottles.delete({
      where: {
        bottle_id: bottle_id,
      },
    });

    return {
      message: 'Bouteille supprimée avec succès.',
    };
  } catch (error) {
    console.error(error);
    throw new Error('Une erreur inattendue est survenue.');
  }
};
