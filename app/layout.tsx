import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { WhatsAppButton } from '@/components/whatsapp-button';
import { Toaster } from '@/components/ui/sonner';
import { GoogleAdSense, MetaPixel } from '@/components/ads';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: 'Frenzy Interiors | Transforming Spaces Into Masterpieces',
  description: 'Frenzy Interiors offers premium interior decoration, painting services, wall finishes, and furniture solutions in Nigeria. Request a consultation today.',
  keywords: 'interior decoration, painting services, wall finishes, furniture, POP ceilings, Nigeria, Lagos',
  openGraph: {
    title: 'Frenzy Interiors | Transforming Spaces Into Masterpieces',
    description: 'Premium interior decoration, painting services, wall finishes, and furniture solutions in Nigeria.',
    type: 'website',
    locale: 'en_NG',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Frenzy Interiors | Transforming Spaces Into Masterpieces',
    description: 'Premium interior decoration, painting services, wall finishes, and furniture solutions in Nigeria.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://frenzyinteriors.com',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <GoogleAdSense />
        <MetaPixel />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
