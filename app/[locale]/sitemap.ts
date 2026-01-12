import { MetadataRoute } from 'next'

export default function sitemap({ params }: { params: { locale: string } }): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://marawaneldeib.com'
  const locale = params.locale

  return [
    {
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ]
}
