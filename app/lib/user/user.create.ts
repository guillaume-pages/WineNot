'use server';

import bcrypt from 'bcrypt';
import prisma from '@/prisma/prisma';
import { z } from 'zod';

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&,#.])[A-Za-z\d@$!%*?&,#.]{10,}$/;

const CreateUserSchema = z.object({
  firstname: z.string({
    required_error: 'Votre prénom est requis.',
  }),
  lastname: z.string().optional(),
  email: z
    .string({
      required_error: 'Votre adresse email est requise.',
      invalid_type_error: 'Veuillez entrer une adresse email valide.',
    })
    .email(),
  password: z.string().regex(passwordRegex, {
    message: 'Le mot de passe ne respecte pas les critères de sécurité.',
  }),
  confirmPassword: z.string().regex(passwordRegex, {
    message: 'Le mot de passe ne respecte pas les critères de sécurité.',
  }),
  phone: z.string().optional(),
  status: z.string({
    required_error: 'Veuillez sélectionner un statut.',
  }),
});

export async function createUser(data: {
  firstname: string;
  lastname?: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
  status: string;
}) {

  const validatedFields = CreateUserSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      message: 'Il y a un problème avec les champs du formulaire. Veuillez vérifier.',
      errors: validatedFields.error.format(), // Pour retourner des erreurs spécifiques si besoin
    };
  }

  const { firstname, lastname, email, password, confirmPassword, phone, status } =
    validatedFields.data;

  if (password !== confirmPassword) {
    return {
      message: 'Les mots de passe ne correspondent pas.',
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const date = new Date();

  try {
    await prisma.users.create({
      data: {
        firstname: firstname,
        lastname: lastname || '',
        email: email.toLowerCase(),
        password: hashedPassword,
        phone: phone || '',
        status: status,
        created_at: date,
      },
    });

    return {
      message: 'Compte utilisateur créé avec succès. Vous pouvez vous connecter.',
    };
  } catch (error) {
    console.error('Erreur lors de la création du compte utilisateur:', error);
    return {
      message: 'Erreur lors de la création du compte utilisateur. Veuillez réessayer.',
    };
  }
}
