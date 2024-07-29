'use server';

import { PrismaClient } from "@prisma/client";

import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export const modifCellarName = async (cellarId: string, cellarName: string) => {
  const updateDate = new Date().toISOString();
  try {
    await prisma.cellars.update({
      where: {
        cellar_id: cellarId,
      },
      data: {
        cellar_name: cellarName,
        updated_at: updateDate,
      },
    });

    revalidatePath("/cellar");

    return {
      message: "La cave a été renommée avec succès.",
    };
  } catch (error) {
    throw new Error(
      "Erreur lors du renommage de la cave. Veuillez réessayer."
    );
  } finally {
    await prisma.$disconnect();
  }
}