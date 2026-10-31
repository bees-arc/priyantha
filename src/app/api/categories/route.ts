import { NextRequest, NextResponse } from 'next/server';
import { getCategories, saveCategory } from '@/lib/db';
import { Category } from '@/types';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const includeInactive = searchParams.get('all') === 'true';
  const categories = getCategories(includeInactive);
  return NextResponse.json(categories);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.name) {
      return NextResponse.json({ error: 'Category name is required' }, { status: 400 });
    }

    const slug = body.slug || body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const newCategory: Category = {
      id: body.id || `cat-${Date.now()}`,
      name: body.name,
      slug,
      description: body.description || '',
      iconName: body.iconName || 'ShoppingBag',
      sortOrder: Number(body.sortOrder) || 1,
      isActive: body.isActive !== undefined ? Boolean(body.isActive) : true,
      subcategories: body.subcategories || [],
    };

    const saved = saveCategory(newCategory);
    return NextResponse.json(saved, { status: 201 });
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
  }
}
