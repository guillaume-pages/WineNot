'use server';

import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { useRouter } from 'next/router';

const prisma = new PrismaClient();

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&,#.])[A-Za-z\d@$!%*?&,#.]{10,}$/;

const CreateUserSchema = z.object({
  id: z.number(),
  firstname: z.string({
    required_error: 'Votre nom est requis.',
  }),
  lastname: z.string(),
  mail: z.string({
    required_error: 'Votre adresse email est requise.',
    invalid_type_error: 'Veuillez entrer une adresse email valide.',
  }).email(),
  password: z.string().regex(passwordRegex),
  confirmPassword: z.string().regex(passwordRegex),
  phone: z.string(),
  status: z.string({
    required_error: 'Veuillez sélectionner un statut.',
  }),
  created_at: z.date(),
});

const CreateUser = CreateUserSchema.omit({ id: true, created_at: true });

export type State = {
  message?: string | null;
}
export async function createUser(prevState: State, formData: FormData) {

  const validatedFields = CreateUser.safeParse({
    firstname: formData.get('first_name'),
    lastname: formData.get('last_name'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
    phone: formData.get('phone'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Il y a un problème avec les champs du formulaire. Veuillez vérifier.',
    }
  }

  const { firstname, lastname, mail, password, phone, status, confirmPassword } = validatedFields.data;
  
  const date = new Date();

  if (password !== confirmPassword) {
    console.error('Les mots de passe ne correspondent pas');
    return {
      message: 'Les mots de passe ne correspondent pas.',
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await prisma.users.create({
      data: {
        firstname: firstname,
        lastname: lastname,
        email: mail,
        password: hashedPassword,
        phone: phone,
        status: status,
        createdAt: date,
      },
    });

    return {
      message: 'Compte utilisateur créé avec succès. Vous pouvez vous connecter.',
    };
  } catch (error) {
    return {
      message: 'Erreur lors de la création du compte utilisateur. Veuillez réessayer.',
    };
  }
}
