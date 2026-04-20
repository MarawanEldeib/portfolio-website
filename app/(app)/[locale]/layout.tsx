import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Analytics } from '@vercel/analytics/react';
import type { Locale } from '@/lib/types';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Toaster } from 'react-hot-toast';
import "../../globals.css";
import ClientBackground from '@/components/ui/ClientBackground';
import StructuredData from '@/components/seo/StructuredData';
import LoadingIndicator from '@/components/ui/LoadingIndicator';
import { VIEWPORT_CONFIG } from '@/lib/constants';
import { THEME_CONFIG, DARK_MODE_SCRIPT } from '@/lib/theme.config';
import PassiveEventsInit from '@/components/utils/PassiveEventsInit';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'arial'],
  adjustFontFallback: false,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
  preload: false,
  fallback: ['ui-monospace', 'SFMono-Regular', 'Monaco', 'Consolas', 'monospace'],
  adjustFontFallback: false,
});

// Locale-specific metadata content
const seoContent = {
  en: {
    title: "Marawan Eldeib - Software Engineer & AI Developer",
    description: "M.Sc. INFOTECH (Software Engineering) student at University of Stuttgart with experience at Fraunhofer IOSB and AirAsia. Specialized in AI, Machine Learning, and Full-Stack Development. Open to working student positions.",
    ogDescription: "M.Sc. INFOTECH (Software Engineering) student with expertise in AI, Machine Learning, and Full-Stack Development. Currently at University of Stuttgart.",
  },
  de: {
    title: "Marawan Eldeib - Software Engineer & AI-Entwickler",
    description: "M.Sc. INFOTECH (Software Engineering) Student an der Universität Stuttgart mit Erfahrung bei Fraunhofer IOSB und AirAsia. Spezialisiert auf KI, Machine Learning und Full-Stack-Entwicklung. Offen für Werkstudentenstellen.",
    ogDescription: "M.Sc. INFOTECH (Software Engineering) Student mit Expertise in KI, Machine Learning und Full-Stack-Entwicklung. Derzeit an der Universität Stuttgart.",
  },
};

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isGerman = locale === 'de';
  const content = isGerman ? seoContent.de : seoContent.en;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://marawaneldeib.com';

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: content.title,
      template: "%s | Marawan Eldeib"
    },
    description: content.description,
    keywords: [
      'Marawan Eldeib',
      'Software Engineer',
      'Full-Stack Developer',
      'AI/ML Engineer',
      'Python',
      'Java',
      'Flutter',
      'Machine Learning',
      'Deep Learning',
      'Computer Vision',
      'Stuttgart',
      'Germany',
      'Fraunhofer IOSB',
      'University of Stuttgart',
      ...(isGerman ? ['Werkstudent', 'Softwaretechnik', 'Künstliche Intelligenz'] : ['Working Student', 'Software Engineering', 'Artificial Intelligence']),
    ],
    authors: [{ name: 'Marawan Eldeib' }],
    creator: 'Marawan Eldeib',
    publisher: 'Marawan Eldeib',
    alternates: {
      canonical: `${siteUrl}/${locale}`,
      languages: {
        'en': `${siteUrl}/en`,
        'de': `${siteUrl}/de`,
      },
    },
    verification: {
      google: 'google-site-verification-placeholder',
    },
    openGraph: {
      type: 'website',
      locale: isGerman ? 'de_DE' : 'en_US',
      url: `${siteUrl}/${locale}`,
      title: content.title,
      description: content.ogDescription,
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
      title: content.title,
      description: content.ogDescription,
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
}

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
    <html lang={locale} className="dark" suppressHydrationWarning>
      <head>
        {/* SEO: Meta Description - Ensures Lighthouse detects it */}
        <meta
          name="description"
          content="Marawan Eldeib - Master's student in Software Engineering at Stuttgart University with 3+ years of experience in AI, machine learning, and full-stack development. Former Research Assistant at Fraunhofer IOSB specializing in computer vision and deep learning. Expert in Python, Java, Flutter, and modern web technologies."
        />

        {/* SEO: Additional meta tags for name visibility */}
        <meta name="author" content="Marawan Eldeib" />
        <link rel="canonical" href="https://marawaneldeib.com" />

        {/* Performance: Preconnect to critical domains */}
        <link rel="preconnect" href="https://vercel.live" />
        <link rel="dns-prefetch" href="https://vercel.live" />

        {/* SEO: Structured Data for ATS */}
        <StructuredData locale={locale as Locale} />

        {/* Performance: Inline critical theme script to force dark mode */}
        <script
          dangerouslySetInnerHTML={{
            __html: DARK_MODE_SCRIPT,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased transition-colors duration-500`}
        suppressHydrationWarning
      >
        <LoadingIndicator />
        <PassiveEventsInit />
        <ClientBackground />
        <Toaster
          position="top-right"
          containerStyle={{
            top: 80,
          }}
          toastOptions={{
            duration: 3500,
            style: THEME_CONFIG.toast.style,
            success: THEME_CONFIG.toast.success,
            error: THEME_CONFIG.toast.error,
          }}
          // Improve performance by reducing re-renders
          reverseOrder={false}
        />
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
