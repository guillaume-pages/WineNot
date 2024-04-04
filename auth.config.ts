import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: { 
    signIn: '/login',
  },
  // Ce bout de code renvoie toujours sur la nextUrl
  // Trouver une solution pour réussir à autoriser une liste de page ou exclure
  // en fonction du status du user sinon le gérer coté app
  callbacks: {
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;