import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { siteConfig } from '@/config/site';
import { hostingPlansData } from '@/config/plans';

const geist = Geist({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist',
});

export const metadata: Metadata = {
  title: `${siteConfig.name} — Web Hosting, Domains & Google Workspace`,
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: siteConfig.url,
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: `${siteConfig.name} — High Performance Web Hosting & Domains`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // JSON-LD Organization Schema
  const jsonLdOrganization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    contactPoint: {
      '@type': 'ContactPoint',
      email: siteConfig.contact.email,
      telephone: siteConfig.contact.phone,
      contactType: 'customer support',
    },
  };

  // JSON-LD Hosting Services Schema with Offers
  const jsonLdHostingService = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Web Hosting',
    provider: {
      '@type': 'Organization',
      name: siteConfig.name,
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Web Hosting Plans',
      itemListElement: hostingPlansData.map((plan) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: plan.name,
          description: plan.description,
        },
        price: plan.monthlyPrice,
        priceCurrency: 'INR',
      })),
    },
  };

  return (
    <html lang="en" className={geist.variable} data-scroll-behavior="smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdHostingService) }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <Nav />
        <div className="flex-grow">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
