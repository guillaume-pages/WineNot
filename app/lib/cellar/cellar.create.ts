'use server';

import { PrismaClient } from '@prisma/client';
import { auth } from '@/auth';


const prisma = new PrismaClient();

type State = {
  message?: string | null;
}

export const createCellar = async (prevState: State, formData: FormData ) => {
  const cellarName = formData.get('cellar_name') as string;
  const user_id = formData.get('user_id') as string;

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

    return {
      message: 'Votre cave a été créée avec succès.',
    };
  } catch (error) {
    return {
      message: 'Erreur lors de la création de la cave. Veuillez réessayer.',
    };
  }
};
