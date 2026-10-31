import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getProductBySlug, getProducts, getBusinessSettings } from '@/lib/db';
import { ProductDetailView } from '@/components/ProductDetailView';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  const primaryImage = product.images?.[0]?.url || '/images/products/lg-refrigerator.jpg';
  const canonicalUrl = `https://priyantha-trading.lk/products/${product.slug}`;

  return {
    title: `${product.name} | Priyantha Trading Agencies Panadura`,
    description: product.description || `Inquire about ${product.name} at Priyantha Trading Agencies Panadura showroom.`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${product.name} - Priyantha Trading Agencies`,
      description: product.description || `Inquire directly on WhatsApp for price & availability in Panadura.`,
      url: canonicalUrl,
      type: 'article',
      images: [
        {
          url: primaryImage,
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.description,
      images: [primaryImage],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const settings = getBusinessSettings();
  const relatedProducts = getProducts({
    categorySlug: product.categorySlug,
    status: 'published',
  })
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <ProductDetailView
      product={product}
      relatedProducts={relatedProducts}
      whatsappNumber={settings.whatsappNumber}
      displayWhatsappNumber={settings.displayWhatsappNumber}
    />
  );
}
