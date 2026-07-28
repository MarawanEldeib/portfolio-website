import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://marawaneldeib.com'

  // Each entry declares the full set of locale alternates, so crawlers read the
  // two pages as translations of one another rather than competing duplicates.
  const languages = {
    en: `${baseUrl}/en`,
    de: `${baseUrl}/de`,
  }

  // "/" is deliberately absent: it redirects to whichever locale matches the
  // visitor (/en or /de), and a sitemap should list the canonical destinations
  // rather than a URL that redirects.
  return [
    {
      url: `${baseUrl}/en`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
      alternates: { languages },
    },
    {
      url: `${baseUrl}/de`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: { languages },
    },
  ]
}
