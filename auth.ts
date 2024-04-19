import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import type { User } from './app/lib/definitions';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&,#.])[A-Za-z\d@$!%*?&,#.]{10,}$/;

async function getUser(email: string): Promise<User | null> {
  try {
    const user = await prisma.users.findUnique({
      where: {
        mail: email,
      },
    });
    if (user) {
      return {
        id: user.user_id.toString(),
        firstname: user.firstname,
        lastname: user.lastname ?? '',
        mail: user.mail,
        password: user.password,
        status: user.status,
        phone: user.phone ?? '',
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
        .object({ email: z.string().email(), pw: z.string().regex(passwordRegex)})
        .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, pw } = parsedCredentials.data;
          const user = await getUser(email);
          console.log('user', user)
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(pw, user.password);
          const { password, ...userWithouthPassword } = user;
          if (passwordsMatch) return userWithouthPassword;
        }
        
        return null;
      },
    }),
  ],
});