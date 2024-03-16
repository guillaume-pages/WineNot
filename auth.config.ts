import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: { 
    signIn: '/login',
  },
  // Ce bout de code renvoie toujours sur la nextUrl
  // Trouver une solution pour réussir à autoriser une liste de page ou exclure
  // en fonction du status du user sinon le gérer coté app
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;