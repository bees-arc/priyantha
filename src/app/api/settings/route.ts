import { NextRequest, NextResponse } from 'next/server';
import { getBusinessSettings, updateBusinessSettings } from '@/lib/db';

export async function GET() {
  const settings = getBusinessSettings();
  return NextResponse.json(settings);
}

export async function PUT(request: NextRequest) {
  try {
    const updates = await request.json();
    const updated = updateBusinessSettings(updates);
    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}
