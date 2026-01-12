import { MetadataRoute } from 'next'

export default async function sitemap({ params }: { params: Promise<{ locale: string }> }): Promise<MetadataRoute.Sitemap> {
  const { locale } = await params
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://marawaneldeib.com'

  return [
    {
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ]
}
