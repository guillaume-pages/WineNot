'use server';

import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

const CreateBottleSchema = z.object({
  bottle_id: z.string(),
  bottle_name: z.string(),
  millesime: z.number(),
  size: z.string(),
  // peut etre un array à la place
  grape_varieties: z.object({
    key: z.string(),
    value: z.string(),
  }),
  region: z.string(),
  eye_description: z.string(),
  nose_description: z.array(z.string()),
  mouth_description: z.object({
    key: z.string(),
    value: z.string(),
  }),
  carafage: z.number(),
  temperature: z.number(),
  degree: z.number(),
  accompaniment: z.array(z.string()),
  media: z.string(),
  price: z.number(),
  price_visibility: z.number(),
  global_description: z.string(),
  entry_date: z.date(),
  potential_date: z.date(),
  quantity: z.number(),
  global_visibility: z.number(),
});