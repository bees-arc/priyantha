import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { getBusinessSettings, getCategories } from '@/lib/db';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://priyantha-trading.lk'),
  title: {
    default: 'Priyantha Trading Agencies (PVT) LTD | Panadura, Sri Lanka',
    template: '%s | Priyantha Trading Agencies',
  },
  description:
    'Official product catalogue of Priyantha Trading Agencies (PVT) LTD. Panadura showroom dealing in inverter refrigerators, LED televisions, benchtop ovens, Tomahawk bicycles, and mattresses with direct WhatsApp customer inquiries.',
  keywords: [
    'Priyantha Trading Agencies',
    'Panadura appliances',
    'refrigerators Panadura',
    'Tomahawk bicycles Panadura',
    'LED TV Sri Lanka',
    'Mitsu electric ovens',
    'Galle Road Panadura electronics',
  ],
  authors: [{ name: 'Priyantha Trading Agencies (PVT) LTD' }],
  openGraph: {
    title: 'Priyantha Trading Agencies (PVT) LTD | Panadura',
    description: 'Explore quality home appliances, televisions, and bicycles. Inquire instantly via WhatsApp.',
    url: 'https://priyantha-trading.lk',
    siteName: 'Priyantha Trading Agencies',
    locale: 'en_LK',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = getBusinessSettings();
  const categories = getCategories();

  const businessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: settings.businessName,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'No: 388A Galle Road',
      addressLocality: 'Panadura',
      addressRegion: 'Western Province',
      addressCountry: 'LK',
    },
    telephone: settings.telephone,
    email: settings.email,
    url: 'https://priyantha-trading.lk',
    priceRange: '$$',
    paymentAccepted: 'Cash, Bank Transfer, WhatsApp Inquiry',
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${poppins.className} ${poppins.variable} min-h-screen flex flex-col bg-white text-slate-900 antialiased selection:bg-[#14213d] selection:text-white font-sans`}
      >
        <Header
          categories={categories}
          whatsappNumber={settings.whatsappNumber}
          displayWhatsappNumber={settings.displayWhatsappNumber}
          telephone={settings.telephone}
          address={settings.address}
          announcementText={settings.announcementBar?.text}
        />
        <main className="flex-1">{children}</main>
        <Footer
          whatsappNumber={settings.whatsappNumber}
          displayWhatsappNumber={settings.displayWhatsappNumber}
          telephone={settings.telephone}
          landline={settings.landline}
          email={settings.email}
          address={settings.address}
        />
      </body>
    </html>
  );
}
