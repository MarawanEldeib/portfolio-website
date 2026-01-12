import { MetadataRoute } from 'next'

export async function generateSitemaps() {
  return [
    { id: 'en' },
    { id: 'de' },
  ]
}

export default async function sitemap({ params, id }: {
  params: Promise<{ locale: string }>,
  id: string
}): Promise<MetadataRoute.Sitemap> {
  const { locale } = await params
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://marawaneldeib.com'

  return [
    {
      url: `${baseUrl}/${id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ]
}
