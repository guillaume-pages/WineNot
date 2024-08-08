import { Metadata } from 'next';

import { Toaster } from 'react-hot-toast';
import { SessionProvider } from 'next-auth/react';

import '@/app/ui/global.css';
import { k2d } from '@/components/fonts';
import Navbar from '@/components/navbar/navbar';
import NavbarMobile from '@/components/navbar/navbar-mobile';
import { ThemeProvider } from '@/components/theme-provider';

export const metadata: Metadata = {
  title: {
    template: '%s | Wine Not',
    default: 'Wine Not',
  },
  description:
    'Venez créer votre cave à vin sur Wine Not et gérez vos bouteilles de vin simplement',
  metadataBase: new URL('https://winenot.vercel.app/'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={`${k2d.className} antialiased`}>
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster />
            <Navbar />
            <NavbarMobile />
            {children}
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
