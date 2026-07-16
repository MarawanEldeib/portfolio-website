import { personalInfo, publications } from '@/lib/data';
import { getPersonalInfo } from '@/lib/data-localized';
import type { Locale } from '@/lib/types';

interface StructuredDataProps {
  locale: Locale;
}

export default function StructuredData({ locale }: StructuredDataProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://marawaneldeib.com';

  // Get localized personal info
  const localizedPersonalInfo = getPersonalInfo(locale);

  const personId = `${siteUrl}/#person`;

  // Person and the articles they authored are separate entities linked by @id:
  // schema.org's `author` belongs on the CreativeWork, not on the Person.
  const person = {
    '@type': 'Person',
    '@id': personId,
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
        name: 'University of Stuttgart, Institute of Space Systems (IRS)',
        url: 'https://www.irs.uni-stuttgart.de/en/',
      },
    ],
    knowsAbout: [
      'Privacy Engineering',
      'Security Engineering',
      'Network Traffic Analysis',
      'Application Security',
      'Software Engineering',
      'Backend Development',
      'Performance Optimisation',
      'Python',
    ],
    sameAs: [
      personalInfo.orcid,
      personalInfo.linkedin,
      personalInfo.github,
    ],
  };

  const scholarlyArticles = publications.map((pub) => ({
    '@type': 'ScholarlyArticle',
    '@id': pub.doi,
    headline: pub.title,
    name: pub.title,
    author: [{ '@id': personId }],
    datePublished: pub.year,
    pagination: pub.pages,
    isPartOf: {
      '@type': 'PublicationIssue',
      issueNumber: pub.issue,
      isPartOf: {
        '@type': 'PublicationVolume',
        volumeNumber: pub.volume,
        isPartOf: {
          '@type': 'Periodical',
          name: pub.venue,
        },
      },
    },
    url: pub.doi,
    sameAs: pub.doi,
  }));

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [person, ...scholarlyArticles],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
