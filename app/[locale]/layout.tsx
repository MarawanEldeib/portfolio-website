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
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: "Marawan Eldeib - Software Engineering Student & Developer",
  description: "Master's student in Software Engineering at Stuttgart University with experience in AI, deep learning, and full-stack development. Specializing in Python, Java, and machine learning solutions.",
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
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://marawan-eldeib.com',
    title: 'Marawan Eldeib - Software Engineering Student & Developer',
    description: 'Master\'s student in Software Engineering at Stuttgart University with experience in AI, deep learning, and full-stack development.',
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
    title: 'Marawan Eldeib - Software Engineering Student & Developer',
    description: 'Master\'s student in Software Engineering with AI/ML expertise',
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
        {/* Performance: Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Performance: DNS prefetch for faster lookups */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        
        {/* SEO: Structured Data for ATS */}
        <StructuredData />
        
        {/* Security: Content Security Policy */}
        <meta httpEquiv="Content-Security-Policy" content="
          default-src 'self';
          script-src 'self' 'unsafe-inline' 'unsafe-eval';
          style-src 'self' 'unsafe-inline';
          img-src 'self' data: https:;
          font-src 'self' data:;
          connect-src 'self';
          frame-ancestors 'self';
          base-uri 'self';
          form-action 'self';
        " />
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
