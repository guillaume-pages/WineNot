'use server';
import prisma from '@/prisma/prisma';
import { update } from 'lodash';

export async function getUser(userId: string) {
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
      created_at: data?.created_at,
      updated_at: data?.updated_at,
      image: data?.image,
      email_verified_at: data?.email_verified,
    };

    return user;
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur:", error);
    throw error;
  }
}
