// import NextAuth from 'next-auth';
// import { authConfig } from './auth.config';
// import Credentials from 'next-auth/providers/credentials';
// import { z } from 'zod';
// import type { User } from './app/lib/definitions';
// import bcrypt from 'bcrypt';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&,#.])[A-Za-z\d@$!%*?&,#.]{10,}$/;

// async function getUser(email: string): Promise<User | null> {
//   try {
//     const user = await prisma.users.findUnique({
//       where: {
//         mail: email,
//       },
//     });
//     if (user) {
//       return {
//         id: user.user_id.toString(),
//         firstname: user.firstname,
//         lastname: user.lastname ?? '',
//         mail: user.mail,
//         password: user.password,
//         status: user.status,
//         phone: user.phone ?? '',
//       };
//     } else {
//       return null;
//     }
//   } catch (error) {
//     console.error('Failed to fetch user:', error);
//     throw new Error('Failed to fetch user.');
//   }
// }

// export const { auth, signIn, signOut } = NextAuth({
//   ...authConfig,
//   providers: [
//     Credentials({
//       async authorize(credentials) {
//         const parsedCredentials = z
//         .object({ email: z.string().email(), pw: z.string().regex(passwordRegex)})
//         .safeParse(credentials);

//         if (parsedCredentials.success) {
//           const { email, pw } = parsedCredentials.data;
//           const user = await getUser(email);
//           console.log('user', user)
//           if (!user) return null;
//           const passwordsMatch = await bcrypt.compare(pw, user.password);
//           const { password, ...userWithouthPassword } = user;
//           if (passwordsMatch) return userWithouthPassword;
//         }

//         return null;
//       },
//     }),
//   ],
// });

import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from './prisma/prisma';
import github from 'next-auth/providers/github';
import google from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: 'jwt' },
  adapter: PrismaAdapter(prisma),
  // pages: {
  //   signIn: "/login",
  // },
  providers: [
    github,
    google,
    CredentialsProvider({
      name: 'mot de passe et email',
      id: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'example@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: String(credentials.email),
          },
        });

        if (
          !user ||
          !(await bcrypt.compare(String(credentials.password), user.password!))
        ) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          randomKey: 'Hey cool',
        };
      },
    }),
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const paths = ['/profile', '/cellar'];
      const isProtected = paths.some((path) =>
        nextUrl.pathname.startsWith(path)
      );

      if (isProtected && !isLoggedIn) {
        const redirectUrl = new URL('/api/auth/signin', nextUrl.origin);
        redirectUrl.searchParams.append('callbackUrl', nextUrl.href);
        return Response.redirect(redirectUrl);
      }
      return true;
    },
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
          randomKey: token.randomKey as string,
        },
      };
    },
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
          randomKey: u.randomKey,
        };
      }
      return token;
    },
  },
});
