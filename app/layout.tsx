import '@/app/ui/global.css';
import { k2d } from '@/app/ui/fonts';
import { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import Navbar from './ui/navbar/navbar';
import NavbarMobile from './ui/navbar/navbar-mobile';
 
export const metadata: Metadata = {
  title: {
    template: '%s | Cavavin',
    default: 'Cavavin',
  },  description: 'Venez créer votre cave à vin, échangez avec des passionnés et retrouvez votre caviste préféré au même endroit',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${k2d.className} antialiased`}>
        <Navbar />
        <NavbarMobile />
        <div className='mt-3'>
          {children}  
        </div>
        </body>
    </html>
  );
}
