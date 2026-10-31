import { NextRequest, NextResponse } from 'next/server';
import { getProducts, saveProduct } from '@/lib/db';
import { Product } from '@/types';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status') || undefined;
  const categorySlug = searchParams.get('category') || undefined;
  const brand = searchParams.get('brand') || undefined;
  const search = searchParams.get('search') || undefined;
  const featured = searchParams.get('featured') === 'true' ? true : undefined;

  const products = getProducts({
    status,
    categorySlug,
    brand,
    search,
    featured,
  });

  return NextResponse.json(products);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.name) {
      return NextResponse.json({ error: 'Product name is required' }, { status: 400 });
    }

    const slug = body.slug || body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const newProduct: Product = {
      id: body.id || `prod-${Date.now()}`,
      name: body.name,
      slug,
      sku: body.sku || `PTA-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
      description: body.description || '',
      categoryId: body.categoryId || 'cat-home-appliances',
      categorySlug: body.categorySlug || 'home-appliances',
      categoryName: body.categoryName || 'Home Appliances',
      subcategoryId: body.subcategoryId,
      subcategoryName: body.subcategoryName,
      brand: body.brand,
      model: body.model,
      price: body.price ? Number(body.price) : undefined,
      originalPrice: body.originalPrice ? Number(body.originalPrice) : undefined,
      priceVisibility: body.priceVisibility || 'ask_for_price',
      availability: body.availability || 'in_stock',
      status: body.status || 'published',
      featured: Boolean(body.featured),
      images: body.images || [],
      specifications: body.specifications || [],
      variants: body.variants || [],
      provenance: body.provenance || {
        source: 'Admin Direct Entry',
        verificationStatus: 'VERIFIED',
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const saved = saveProduct(newProduct);
    return NextResponse.json(saved, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
