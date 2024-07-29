'use server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getUser (userId: string) {
  try {
  const data = await prisma.users.findUnique({
    where: {
      user_id: userId,
    },
  });

  const user = {
    user_id: data?.user_id,
    firstname: data?.firstname,
    lastname: data?.lastname,
    email: data?.email,
    phone: data?.phone,
    status: data?.status,
    created_at: data?.createdAt,
    updated_at: data?.updatedAt,
    image: data?.image,
    email_verified_at: data?.emailVerified,
  };

  return user;
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'utilisateur:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};