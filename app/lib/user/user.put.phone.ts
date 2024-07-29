'use server';

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const updatePhone = async (id: string, phone: string) => {
  const updateDate = new Date().toISOString();
  try {
    const updatedUser = await prisma.users.update({
      where: { user_id: id },
      data: { phone, updatedAt: updateDate },
    });

    return updatedUser;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}