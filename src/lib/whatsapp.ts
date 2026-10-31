import { Product } from '@/types';

export interface WhatsAppInquiryParams {
  product: Product;
  quantity?: number;
  selectedVariant?: string;
  businessWhatsappNumber?: string;
  baseUrl?: string;
}

/**
 * Generates the verified official inquiry message template according to Phase 4 specifications.
 */
export function generateInquiryMessage({
  product,
  quantity = 1,
  selectedVariant,
  baseUrl = 'https://priyantha-trading.lk',
}: Omit<WhatsAppInquiryParams, 'businessWhatsappNumber'>): string {
  const canonicalUrl = `${baseUrl}/products/${product.slug}`;
  const rawImg = product.images?.[0]?.url || '/images/products/lg-refrigerator.jpg';
  const imageUrl = rawImg.startsWith('http') ? rawImg : `${baseUrl}${rawImg}`;

  let message = `*PRIYANTHA TRADING AGENCIES (PVT) LTD*\n`;
  message += `📍 Showroom: 388A Galle Road, Panadura\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `*PRODUCT INQUIRY*\n\n`;
  message += `📌 *Item:* ${product.name}\n`;
  if (product.brand) {
    message += `🏷️ *Brand:* ${product.brand}\n`;
  }
  if (product.model) {
    message += `🔢 *Model:* ${product.model}\n`;
  }
  if (product.sku) {
    message += `📦 *SKU / Code:* ${product.sku}\n`;
  }
  if (product.priceVisibility === 'visible' && product.price) {
    message += `💰 *Showroom Price:* Rs. ${product.price.toLocaleString('en-LK')}\n`;
  } else {
    message += `💰 *Price:* Inquire current showroom quotation\n`;
  }
  if (selectedVariant) {
    message += `⚙️ *Selected Option:* ${selectedVariant}\n`;
  }
  if (quantity > 1) {
    message += `🔢 *Quantity:* ${quantity}\n`;
  }

  if (product.specifications && product.specifications.length > 0) {
    message += `\n*Key Specifications:*\n`;
    product.specifications.slice(0, 3).forEach((s) => {
      message += `• ${s.name}: ${s.value}\n`;
    });
  }

  message += `\n🔗 *Product Page:* ${canonicalUrl}\n`;
  message += `🖼️ *Product Photo:* ${imageUrl}\n\n`;
  message += `Please confirm:\n`;
  message += `1. Current best price & stock availability\n`;
  message += `2. Warranty details\n`;
  message += `3. Delivery options to my location\n\n`;
  message += `Thank you!`;

  return message;
}

/**
 * Builds the official WhatsApp click-to-chat URL format:
 * https://wa.me/{businessNumber}?text={encodedMessage}
 */
export function buildWhatsAppChatUrl(params: WhatsAppInquiryParams): string {
  const number = params.businessWhatsappNumber || '94722451812';
  // sanitize number: digits only
  const cleanNumber = number.replace(/\D/g, '');
  const message = generateInquiryMessage(params);
  const encoded = encodeURIComponent(message);

  return `https://wa.me/${cleanNumber}?text=${encoded}`;
}

/**
 * Asynchronously logs inquiry click event for analytics without blocking redirect
 */
export async function trackInquiryClick(product: Product, variant?: string, quantity = 1): Promise<void> {
  try {
    if (typeof window === 'undefined') return;
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const deviceType = isMobile ? 'mobile' : 'desktop';

    await fetch('/api/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productId: product.id,
        productName: product.name,
        productSku: product.sku,
        variant,
        quantity,
        deviceType,
      }),
    });
  } catch (err) {
    console.warn('Could not record inquiry click event:', err);
  }
}
