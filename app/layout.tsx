import { Metadata } from 'next';

import { Toaster } from 'react-hot-toast';
import { SessionProvider } from 'next-auth/react';

import '@/app/ui/global.css';
import { k2d } from '@/app/ui/fonts';
import Navbar from '@/app/ui/navbar/navbar';
import NavbarMobile from '@/app/ui/navbar/navbar-mobile';
import { ThemeProvider } from '@/components/theme-provider';

export const metadata: Metadata = {
  title: {
    template: '%s | Cavavin',
    default: 'Cavavin',
  },
  description:
    'Venez créer votre cave à vin, échangez avec des passionnés et retrouvez votre caviste préféré au même endroit',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
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
