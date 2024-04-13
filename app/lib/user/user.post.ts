'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';

const CreateUserSchema = z.object({
  id: z.number(),
  firstname: z.string(),
  lastname: z.string(),
  mail: z.string(),
  password: z.string(),
  phone: z.string(),
  status: z.string(),
  created_at: z.date(),
});

const CreateUser = CreateUserSchema.omit({ id: true, created_at: true });

// Creation d'un compte utilisateur
export async function createUser(formData: FormData) {
  const { firstname, lastname, mail, password, phone, status } =
    CreateUser.parse({
      firstname: formData.get('first_name'),
      lastname: formData.get('last_name'),
      mail: formData.get('email'),
      password: formData.get('password'),
      phone: formData.get('phone'),
      status: formData.get('status'),
    });
  const date = new Date().toISOString().split('T')[0];

  console.log(firstname, lastname, mail, password, phone, status, date);

  await sql`
    INSERT INTO users (firstname, lastname, mail, password, phone, status, created_at) 
    VALUES (${firstname}, ${lastname}, ${mail}, ${password}, ${phone}, ${status}, ${date})
    `;

    
}
