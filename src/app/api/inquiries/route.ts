import { NextRequest, NextResponse } from 'next/server';
import { getInquiries, logInquiry } from '@/lib/db';

export async function GET() {
  const inquiries = getInquiries();
  return NextResponse.json(inquiries);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.productId || !body.productName) {
      return NextResponse.json({ error: 'Product details required' }, { status: 400 });
    }

    const event = logInquiry({
      productId: body.productId,
      productName: body.productName,
      productSku: body.productSku || '',
      variant: body.variant,
      quantity: Number(body.quantity) || 1,
      deviceType: body.deviceType || 'desktop',
    });

    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error('Error logging inquiry:', error);
    return NextResponse.json({ error: 'Failed to log inquiry' }, { status: 500 });
  }
}
