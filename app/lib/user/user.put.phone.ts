'use server';

import prisma from '@/prisma/prisma';

export const updatePhone = async (id: string, phone: string) => {
  const updateDate = new Date().toISOString();
  try {
    const updatedUser = await prisma.users.update({
      where: { user_id: id },
      data: { phone, updated_at: updateDate },
    });

    return updatedUser;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
