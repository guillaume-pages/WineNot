'use server';

import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { auth } from '@/auth';

const prisma = new PrismaClient();

export const getCellars = async () => {
  const session = await auth();
  console.log(session);

  const id = session?.user?.id;

  const userCellars = await prisma.users_cellars.findMany({
    where: {
      user_id: id,
    },
    include: {
      cellars: true,
    },
  });
  
  return userCellars;
}