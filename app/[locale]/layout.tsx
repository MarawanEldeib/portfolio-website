import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import "../globals.css";
import ClientBackground from '@/components/ui/ClientBackground';
import LoadingIndicator from '@/components/ui/LoadingIndicator';
import StructuredData from '@/components/seo/StructuredData';
import { VIEWPORT_CONFIG } from '@/lib/constants';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  fallback: ['ui-monospace', 'monospace'],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://marawaneldeib.vercel.app'),
  title: {
    default: "Marawan Eldeib - Software Engineering Student & AI Developer",
    template: "%s | Marawan Eldeib"
  },
  description: "Master's student in Software Engineering at Stuttgart University with 3+ years of experience in AI, machine learning, and full-stack development. Former Research Assistant at Fraunhofer IOSB specializing in computer vision and deep learning. Expert in Python, Java, Flutter, and modern web technologies.",
  keywords: [
    'Software Engineer',
    'Full-Stack Developer',
    'AI/ML Engineer',
    'Python Developer',
    'Java Developer',
    'Flutter Developer',
    'Machine Learning',
    'Deep Learning',
    'Computer Vision',
    'Stuttgart',
    'Germany',
    'Fraunhofer IOSB',
    'University of Stuttgart',
  ],
  authors: [{ name: 'Marawan Eldeib' }],
  creator: 'Marawan Eldeib',
  publisher: 'Marawan Eldeib',
  alternates: {
    canonical: 'https://marawaneldeib.vercel.app',
    languages: {
      'en': 'https://marawaneldeib.vercel.app/en',
      'de': 'https://marawaneldeib.vercel.app/de',
    },
  },
  verification: {
    google: 'google-site-verification-placeholder',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://marawaneldeib.vercel.app',
    title: 'Marawan Eldeib - Software Engineering Student & AI Developer',
    description: 'Master\'s student in Software Engineering at Stuttgart University with 3+ years of experience in AI, machine learning, and full-stack development. Former Research Assistant at Fraunhofer IOSB.',
    siteName: 'Marawan Eldeib Portfolio',
    images: [
      {
        url: '/images/Marawan.jpeg',
        width: 1200,
        height: 630,
        alt: 'Marawan Eldeib',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Marawan Eldeib - Software Engineering Student & AI Developer',
    description: 'Master\'s student in Software Engineering with 3+ years of AI/ML expertise at Fraunhofer IOSB and AirAsia',
    images: ['/images/Marawan.jpeg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport = VIEWPORT_CONFIG;

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        {/* Performance: Preconnect to critical domains */}
        <link rel="preconnect" href="https://vercel.live" />
        <link rel="dns-prefetch" href="https://vercel.live" />
        
        {/* SEO: Structured Data for ATS */}
        <StructuredData />
        
        {/* Performance: Inline critical theme script to prevent FOUC */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme');
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (theme === 'dark' || (!theme && prefersDark)) {
                  document.documentElement.classList.add('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased transition-colors duration-500`}
        suppressHydrationWarning
      >
        <LoadingIndicator />
        <ClientBackground />
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
