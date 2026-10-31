import { NextRequest, NextResponse } from 'next/server';
import { getCategories, saveCategory, deleteCategory } from '@/lib/db';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const categories = getCategories(true);
    const existing = categories.find((c) => c.id === id);
    if (!existing) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    const updates = await request.json();
    const updated = saveCategory({
      ...existing,
      ...updates,
      id,
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating category:', error);
    return NextResponse.json({ error: 'Failed to update category' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const deleted = deleteCategory(id);
  return NextResponse.json({ success: deleted });
}
