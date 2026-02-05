'use client';

import { useLocale } from 'next-intl';
import { personalInfo } from '@/lib/data';
import { getPersonalInfo } from '@/lib/data-localized';

export default function StructuredData() {
  const locale = useLocale() as 'en' | 'de';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://marawaneldeib.com';
  
  // Get localized personal info
  const localizedPersonalInfo = getPersonalInfo(locale);

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: personalInfo.name,
    jobTitle: localizedPersonalInfo.title,
    email: personalInfo.email,
    telephone: personalInfo.phone,
    url: siteUrl,
    image: `${siteUrl}/images/Marawan.jpeg`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Stuttgart',
      addressRegion: 'Baden-Württemberg',
      addressCountry: 'Germany',
    },
    alumniOf: [
      {
        '@type': 'CollegeOrUniversity',
        name: 'University of Stuttgart',
        location: 'Stuttgart, Germany',
      },
      {
        '@type': 'CollegeOrUniversity',
        name: 'Multimedia University',
        location: 'Malaysia',
      },
    ],
    worksFor: [
      {
        '@type': 'Organization',
        name: 'Fraunhofer IOSB',
        url: 'https://www.iosb.fraunhofer.de/',
      },
    ],
    knowsAbout: [
      'Software Engineering',
      'Artificial Intelligence',
      'Machine Learning',
      'Full-Stack Development',
      'Python',
      'Java',
      'Flutter',
      'Deep Learning',
      'Computer Vision',
    ],
    sameAs: [
      personalInfo.linkedin,
      personalInfo.github,
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
