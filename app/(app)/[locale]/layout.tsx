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
    title: "Marawan Eldeib - Privacy & Security | M.Sc. INFOTECH",
    description: "M.Sc. Information Technology (INFOTECH) student at the University of Stuttgart, Software Engineering specialisation, focused on privacy and security. Experience across network traffic analysis, backend development, and performance optimisation of research software. Seeking a Master's thesis starting October 2026.",
    ogDescription: "M.Sc. Information Technology (INFOTECH) student focused on privacy and security. Seeking a Master's thesis starting October 2026.",
  },
  de: {
    title: "Marawan Eldeib - Privatsphäre & Sicherheit | M.Sc. INFOTECH",
    description: "M.Sc.-Student der Informationstechnologie (INFOTECH) an der Universität Stuttgart, Vertiefung Software Engineering, mit Schwerpunkt Privatsphäre und Sicherheit. Erfahrung in Netzwerkverkehrsanalyse, Backend-Entwicklung und Performance-Optimierung von Forschungssoftware. Auf der Suche nach einer Masterarbeit ab Oktober 2026.",
    ogDescription: "M.Sc.-Student der Informationstechnologie (INFOTECH) mit Schwerpunkt Privatsphäre und Sicherheit. Auf der Suche nach einer Masterarbeit ab Oktober 2026.",
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
      'Privacy Engineering',
      'Security Engineering',
      'Privacy and Security',
      'Network Traffic Analysis',
      'mitmproxy',
      'Application Security',
      'Software Engineering',
      'M.Sc. INFOTECH',
      'Information Technology',
      'Python',
      'Stuttgart',
      'Germany',
      'University of Stuttgart',
      ...(isGerman
        ? ['Masterarbeit', 'Masterarbeit Informatik', 'Datenschutz', 'IT-Sicherheit', 'Netzwerkverkehrsanalyse', 'Informationstechnologie']
        : ["Master's Thesis", 'Masters Thesis 2026', 'Data Privacy', 'Cybersecurity', 'Security Research']),
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
        {/* SEO: description comes from generateMetadata above, which emits it per locale */}

        {/* SEO: Additional meta tags for name visibility */}
        <meta name="author" content="Marawan Eldeib" />
        {/* SEO: canonical comes from alternates.canonical above, which is per-locale */}

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
