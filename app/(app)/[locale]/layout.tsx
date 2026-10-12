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
    title: "Marawan Eldeib | Software, Security & AI Engineering",
    description: "Software engineer and M.Sc. Information Technology student working on secure system design and LLM-based AI systems. Optimised NASA/DLR research software at the Institute of Space Systems, measured how LLM-integrated tools leak confidential data, and built and hardened a production full-stack platform. Currently writing my Master's thesis on GitOps-constrained agentic workflows (Oct 2026 to Mar 2027).",
    ogDescription: "Software engineer and M.Sc. Information Technology student working on secure system design and LLM-based AI systems. Optimised NASA/DLR research software at the Institute of Space Systems, measured how LLM-integrated tools leak confidential data, and built and hardened a production full-stack platform.",
  },
  de: {
    title: "Marawan Eldeib | Software-, Security- & KI-Engineering",
    description: "Softwareentwickler und M.Sc.-Student Information Technology mit Schwerpunkten in sicherem Systemdesign und LLM-basierten KI-Systemen. Optimierte NASA/DLR-Forschungssoftware am Institut für Raumfahrtsysteme, untersuchte, wie LLM-integrierte Werkzeuge vertrauliche Daten preisgeben, und entwickelte und härtete eine produktive Full-Stack-Plattform. Schreibe derzeit meine Masterarbeit zu GitOps-beschränkten agentischen Workflows (10/2026 bis 03/2027).",
    ogDescription: "Softwareentwickler und M.Sc.-Student Information Technology mit Schwerpunkten in sicherem Systemdesign und LLM-basierten KI-Systemen. Optimierte NASA/DLR-Forschungssoftware am Institut für Raumfahrtsysteme, untersuchte, wie LLM-integrierte Werkzeuge vertrauliche Daten preisgeben, und entwickelte und härtete eine produktive Full-Stack-Plattform.",
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
      'Software Engineering',
      'M.Sc. INFOTECH',
      'Information Technology',
      'Python',
      'Stuttgart',
      'Germany',
      'University of Stuttgart',
      'Software Engineer',
      'Security Engineer',
      'AI Engineer',
      'Full-time',
      'Application Security',
      'GitOps',
      'LLM Agents',
      'Data Privacy',
      'Cybersecurity',
      'Security Research',
      ...(isGerman
        ? ['Datenschutz', 'IT-Sicherheit', 'Netzwerkverkehrsanalyse', 'Informationstechnologie']
        : []),
    ],
    authors: [{ name: 'Marawan Eldeib' }],
    creator: 'Marawan Eldeib',
    publisher: 'Marawan Eldeib',
    alternates: {
      canonical: `${siteUrl}/${locale}`,
      languages: {
        'en': `${siteUrl}/en`,
        'de': `${siteUrl}/de`,
        // Tells crawlers which locale to serve when none of the above match the
        // user's language. Without it "/" has no declared fallback target.
        'x-default': `${siteUrl}/en`,
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

        {/* No preconnect to vercel.live: that host only serves the preview-comments
            toolbar, which never loads in production, so the connection was always
            opened and never used. */}

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
