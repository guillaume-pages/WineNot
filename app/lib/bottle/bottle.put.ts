'use server';

import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

const UpdateBottleSchema = z.object({
  bottle_name: z.string({
    required_error: 'Le nom de la bouteille est requis.',
  }).min(1, { message: 'Le nom de la bouteille ne doit pas être vide.' }),
  millesime: z.number({ required_error: 'Le millesime est requis.' }).min(3),
  type_of_wine: z.string({ required_error: 'Le type de vin est requis.' }).min(1, { message: 'Le type de vin est requis.' }),
  size: z.string({ required_error: 'La taille de la bouteille est requise.' }),
  grape_varieties: z.array(z.string()).optional(),
  region: z.string({ required_error: 'La région est requise.' }),
  eye_description: z.string().max(500, { message: 'La description doit comporter au maximum 500 caractères.' }).optional(),
  nose_description: z.array(z.string()).optional(),
  mouth_description: z.array(z.number()).optional(),
  carafage: z.number().optional(),
  temperature: z.number().optional(),
  degree: z.number({ required_error: "Le degré d'alcool est requis" }),
  accompaniment: z.array(z.string()).optional(),
  media: z.string().optional(),
  price: z.number({ required_error: 'Le prix est requis.' }),
  price_visibility: z.number({ required_error: 'La visibilité du prix est requise.' }),
  global_description: z.string().max(400, { message: 'La description doit comporter au maximum 400 caractères.' }).optional(),
  entry_date: z.date({ required_error: "La date d'entrée est requise." }),
  potential_date: z.date().optional(),
  quantity: z.number({ required_error: 'La quantité est requise.' }),
  global_visibility: z.number({ required_error: 'La visibilité est requise.' }),
  cellar_id: z.string({ required_error: "L'ID de la cave est requis." }),
});

export const updateBottle = async (data: any) => {
  const formatedEntryDate = new Date(data.entry_date);
  const formatedPotentialDate = data.potential_date ? new Date(data.potential_date) : undefined;

  data.entry_date = formatedEntryDate;
  data.potential_date = formatedPotentialDate;

  try {
    const validatedData = UpdateBottleSchema.parse(data);

    const bottleData  = validatedData;

    await prisma.bottles.update({
      where: { bottle_id: data.bottle_id },
      data: {
        ...bottleData,
      },
    });

    revalidatePath('/cellar')

    return {
      message: 'Bouteille modifiée avec succès.',
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessages = error.errors.map(err => err.message).join(' ');
      return { errors: errorMessages };
    } else {
      return { errors: 'Une erreur inattendue est survenue. Veuillez réessayer.' };
    }  } finally {
    await prisma.$disconnect();
  }
};
