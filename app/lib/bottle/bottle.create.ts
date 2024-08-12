'use server';

import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

const regex = /^[a-zA-Z0-9\s%'\u00C0-\u017F]+$/;

const CreateBottleSchema = z.object({
  bottle_name: z
    .string({
      required_error: 'Le nom de la bouteille est requis.',
    })
    .min(1, { message: 'Le nom de la bouteille ne doit pas être vide.' })
    .regex(/^[a-zA-Z0-9\s]+$/, {
      message:
        'Le nom de la bouteille ne peut contenir que des lettres, des chiffres et des espaces.',
    }),
  millesime: z.number({ required_error: 'Le millesime est requis.' }).min(3),
  type_of_wine: z
    .string({
      required_error: 'Le type de vin est requis.',
    })
    .min(1, { message: 'Le type de vin est requis.' })
    .regex(/^[a-zA-Z\s]+$/, {
      message:
        'Le type de vin ne peut contenir que des lettres et des espaces.',
    }),
  size: z
    .string({
      required_error: 'La taille de la bouteille est requise.',
    })
    .min(1, { message: 'La taille de la bouteille est requise.' })
    .regex(/^[a-zA-Z0-9\s]+$/, {
      message:
        'La taille de la bouteille ne peut contenir que des lettres, des chiffres et des espaces.',
    }),
  grape_varieties: z.array(z.string()).optional(),
  region: z
    .string({
      required_error: 'La région est requise.',
    })
    .min(1, { message: 'La région est requise.' })
    .regex(/^[a-zA-Z\s,-]+$/, {
      message: 'La région ne peut contenir que des lettres et des espaces.',
    }),
  eye_description: z
    .string()
    .max(500, {
      message: 'La description doit comporter au maximum 500 caractères.',
    })
    .refine((val) => val === '' || /^[a-zA-Z0-9\s\-\/,'\.:]+$/.test(val), {
      message:
        'La description visuelle ne peut contenir que des lettres, des espaces et des chiffres.',
    })
    .optional(),
  nose_description: z.array(z.string()).optional(),
  mouth_description: z.array(z.number()).optional(),
  carafage: z.number().optional(),
  temperature: z.number().optional(),
  degree: z.number({ required_error: "Le degré d'alcool est requis" }),
  accompaniment: z.array(z.string()).optional(),
  media: z.string().optional(),
  price: z.number({ required_error: 'Le prix est requis.' }),
  price_visibility: z.number({
    required_error: 'La visibilité du prix est requise.',
  }),
  global_description: z
    .string()
    .max(500, {
      message: 'La description doit comporter au maximum 500 caractères.',
    })
    .refine((val) => val === '' || /^[a-zA-Z0-9\s\-\/,'\.:]+$/.test(val), {
      message:
        'La description globale ne peut contenir que des lettres, des espaces et des chiffres.',
    })
    .optional(),
  entry_date: z.date({ required_error: "La date d'entrée est requise." }),
  potential_date: z.date().optional(),
  quantity: z.number({ required_error: 'La quantité est requise.' }),
  global_visibility: z.number({ required_error: 'La visibilité est requise.' }),
  cellar_id: z.string({ required_error: "L'ID de la cave est requis." }),
});

const isValid = (array: any, regex: any) => {
  return array.every((element: any) => regex.test(element));
};

export const createBottle = async (data: any) => {
  if (!data.entry_date) {
    throw new Error("La date d'entrée est requise.");
  }

  const formatedEntryDate = new Date(data.entry_date);
  const formatedPotentialDate = data.potential_date
    ? new Date(data.potential_date)
    : undefined;

  data.entry_date = formatedEntryDate;
  data.potential_date = formatedPotentialDate;

  if (data.grape_varieties && !isValid(data.grape_varieties, regex)) {
    return {
      errors:
        'Les cépages ne peuvent contenir que des lettres, des chiffres, des espaces et le symbole %.',
    };
  }

  if (data.accompaniment && !isValid(data.accompaniment, regex)) {
    return {
      errors:
        'Les accords ne peuvent contenir que des lettres, des chiffres, des espaces et le symbole %.',
    };
  }

  if (data.nose_description && !isValid(data.nose_description, regex)) {
    return {
      errors:
        'Les descriptions de nez ne peuvent contenir que des lettres, des chiffres, des espaces et le symbole %.',
    };
  }

  try {
    const validatedData = CreateBottleSchema.parse(data);

    const { cellar_id, ...bottleData } = validatedData;

    const newBottle = await prisma.bottles.create({
      data: {
        ...bottleData,
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
    if (error instanceof z.ZodError) {
      const errorMessages = error.errors.map((err) => err.message).join(' ');
      return { errors: errorMessages };
    } else {
      return {
        errors: 'Une erreur inattendue est survenue. Veuillez réessayer.',
      };
    }
  } finally {
    await prisma.$disconnect();
  }
};
