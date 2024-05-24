'use server';

import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

const CreateBottleSchema = z.object({
  bottle_id: z.string(),
  bottle_name: z.string({ required_error: 'Le nom de la bouteille est requis.' }),
  millesime: z.number({ required_error: 'Le millesime est requis.' }),
  type_of_wine: z.string({ required_error: 'Le type de vin est requis.' }),
  size: z.string({ required_error: 'La taille de la bouteille est requise.' }),
  grape_varieties: z.object({
    key: z.string({ required_error: 'Le cépage est requis.' }),
    value: z.string(),
  }),
  region: z.string({ required_error: 'La région est requise.' }),
  eye_description: z.string().max(300),
  nose_description: z.array(z.string()),
  mouth_description: z.array(z.number()),
  carafage: z.number(),
  temperature: z.number(),
  degree: z.number(),
  accompaniment: z.array(z.string()),
  media: z.string(),
  price: z.number(),
  price_visibility: z.number(),
  global_description: z.string().max(300),
  entry_date: z.date({ required_error: 'La date d\'entrée est requise.'}),
  potential_date: z.date(),
  quantity: z.number({ required_error: 'La quantité est requise.'}),
  global_visibility: z.number({ required_error: 'La visibilité est requise.'}),
});

const CreateBottle = CreateBottleSchema.omit({ bottle_id: true});

export const createBottle = async (data: any) => {
  try {
    const validatedData = CreateBottleSchema.parse(data);
    await prisma.bottles.create({
      data: validatedData,
    });
    revalidatePath('/cellar');
    redirect('/cellar');
    return {
      message: 'Bouteille ajoutée avec succès.',
    };
  } catch (error) {
    console.error(error);
    return {
      message: 'Il y a un problème avec les champs du formulaire. Veuillez vérifier.',
    };
  }
};