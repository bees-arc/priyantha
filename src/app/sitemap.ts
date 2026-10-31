import { MetadataRoute } from 'next';
import { getProducts, getCategories } from '@/lib/db';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://priyantha-trading.lk';
  const products = getProducts({ status: 'published' });
  const categories = getCategories();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date('2026-10-31'),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date('2026-10-31'),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date('2026-10-31'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date('2026-10-31'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date('2026-10-31'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  const categoryPages: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${baseUrl}/categories/${cat.slug}`,
    lastModified: new Date('2026-10-31'),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const productPages: MetadataRoute.Sitemap = products.map((prod) => ({
    url: `${baseUrl}/products/${prod.slug}`,
    lastModified: new Date(prod.updatedAt || '2026-10-31'),
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  return [...staticPages, ...categoryPages, ...productPages];
}
