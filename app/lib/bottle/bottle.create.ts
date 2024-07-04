'use server';

import { PrismaClient } from '@prisma/client';
import { th } from 'date-fns/locale';
import { z } from 'zod';

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
  eye_description: z.string().max(300),
  nose_description: z.array(z.string()),
  mouth_description: z.array(z.number()),
  carafage: z.number(),
  temperature: z.number(),
  degree: z.number().optional(),
  accompaniment: z.array(z.string()),
  media: z.string(),
  price: z.number(),
  price_visibility: z.number(),
  global_description: z.string().max(300),
  entry_date: z.date({ required_error: "La date d'entrée est requise." }),
  potential_date: z.date(),
  quantity: z.number({ required_error: 'La quantité est requise.' }),
  global_visibility: z.number({ required_error: 'La visibilité est requise.' }),
  cellar_id: z.string({ required_error: "L'ID de la cave est requis." }),
});

export const createBottle = async (data: any) => {

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

    return {
      message: 'Bouteille ajoutée avec succès à la cave.',
    };
  } catch (error) {
    console.error(error);
    throw new Error('Il y a un problème avec les champs du formulaire. Veuillez vérifier et réessayer.');
  }
};
