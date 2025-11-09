'use client';

import { personalInfo } from '@/lib/data';

export default function StructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: personalInfo.name,
    jobTitle: personalInfo.title,
    email: personalInfo.email,
    telephone: personalInfo.phone,
    url: 'https://marawan-eldeib.com', // Update with your domain
    image: 'https://marawan-eldeib.com/images/Marawan.jpeg',
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
