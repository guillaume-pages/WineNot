'use server';

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const updatePhone = async (id: string, phone: string) => {
  try {
    const updatedUser = await prisma.users.update({
      where: { user_id: id },
      data: { phone },
    });

    return updatedUser;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}