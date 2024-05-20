'use server';

import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

type State = {
  message?: string | null;
}

const FormDataSchema = z.object({
  cellar_name: z.string().min(4),
  user_id: z.string(),
});

export const createCellar = async (prevState: State, formData: FormData ) => {
  const cellarName = formData.get('cellar_name') as string;
  const user_id = formData.get('user_id') as string;

  const validationResult = FormDataSchema.safeParse({
    cellar_name: cellarName,
    user_id: user_id,
  });
  
  if (validationResult.success) {
    const { cellar_name, user_id } = validationResult.data;
    
    try {    
      const newCellar = await prisma.cellars.create({
        data: {
          cellar_name: cellar_name,
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
      return {
        message: 'Erreur lors de la création de la cave. Veuillez réessayer.',
      };
    }
  } else {
    return {
      message: 'Données de formulaire invalides. Veuillez vérifier vos entrées.',
    };
  }
};
