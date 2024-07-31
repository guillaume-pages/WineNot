'use server';

import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

const CreateBottleSchema = z.object({
  bottle_name: z.string({
    required_error: 'Le nom de la bouteille est requis.',
  }).min(3),
  millesime: z.number({ required_error: 'Le millesime est requis.' }),
  type_of_wine: z.string({ required_error: 'Le type de vin est requis.' }),
  size: z.string({ required_error: 'La taille de la bouteille est requise.' }),
  grape_varieties: z.array(z.string()).optional(),
  region: z.string({ required_error: 'La région est requise.' }),
  eye_description: z.string().max(300).optional(),
  nose_description: z.array(z.string()).optional(),
  mouth_description: z.array(z.number()).optional(),
  carafage: z.number().optional(),
  temperature: z.number().optional(),
  degree: z.number({ required_error: "Le degré d'alcool est requis"}),
  accompaniment: z.array(z.string()).optional(),
  media: z.string().optional(),
  price: z.number({ required_error: 'Le prix est requis.' }),
  price_visibility: z.number({ required_error: 'La visibilité du prix est requise.' }),
  global_description: z.string().max(400).optional(),
  entry_date: z.date({ required_error: "La date d'entrée est requise." }),
  potential_date: z.date().optional(),
  quantity: z.number({ required_error: 'La quantité est requise.' }),
  global_visibility: z.number({ required_error: 'La visibilité est requise.' }),
  cellar_id: z.string({ required_error: "L'ID de la cave est requis." }),
});

export const createBottle = async (data: any) => {
  const formatedEntryDate = new Date(data.entry_date);
  const formatedPotentialDate = data.potential_date ? new Date(data.potential_date) : undefined;

  data.entry_date = formatedEntryDate;
  data.potential_date = formatedPotentialDate;

  try {
    const validatedData = CreateBottleSchema.parse(data);

    const { cellar_id, grape_varieties, ...bottleData } = validatedData;

    const newBottle = await prisma.bottles.create({
      data: {
        ...bottleData,
        grape_varieties: grape_varieties || [],
        cellar_id: cellar_id,
      },
    });

    await prisma.cellars.update({
      where: { cellar_id: cellar_id },
      data: {
        bottles: {
          push: newBottle.bottle_id,
        },
      },
    });

    revalidatePath('/cellar');

    return {
      message: 'Bouteille ajoutée avec succès à la cave.',
    };
  } catch (error) {
    console.error(error);
    throw new Error('Il y a un problème avec les champs du formulaire. Veuillez vérifier et réessayer.');
  } finally {
    await prisma.$disconnect();
  }
};
