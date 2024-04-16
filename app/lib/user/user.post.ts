'use server';

import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

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
  passwordError?: string | null;
  messageCreateAccount?: string | null;
}

// Creation d'un compte utilisateur
export async function createUser(prevState: State, formData: FormData) {
  
  const { firstname, lastname, mail, password, phone, status, confirmPassword } =
    CreateUser.parse({
      firstname: formData.get('first_name'),
      lastname: formData.get('last_name'),
      mail: formData.get('email'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
      phone: formData.get('phone'),
      status: formData.get('status'),
    });
  const date = new Date();

  if (password !== confirmPassword) {
    console.error('Les mots de passe ne correspondent pas');
    return {
      passwordError: 'Les mots de passe ne correspondent pas.',
    };
  }

  console.log(firstname, lastname, mail, password, phone, status, date);

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await prisma.users.create({
      data: {
        firstname: firstname,
        lastname: lastname,
        mail: mail,
        password: hashedPassword,
        phone: phone,
        status: status,
        created_at: date,
      },
    });
    return {
      messageCreateAccount: 'Compte utilisateur créé avec succès.',
    };
  } catch (error) {
    return {
      messageCreateAccount: 'Erreur lors de la création du compte utilisateur.',
    };
  }
}
