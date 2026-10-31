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

  let message = `Hello Priyantha Trading Agencies! 👋\n`;
  message += `I'm interested in the following product:\n\n`;
  message += `Product: ${product.name}\n`;
  if (product.sku) {
    message += `Product Code: ${product.sku}\n`;
  }
  if (selectedVariant) {
    message += `Variant: ${selectedVariant}\n`;
  }
  if (quantity > 1) {
    message += `Quantity: ${quantity}\n`;
  }
  message += `Product Link: ${canonicalUrl}\n\n`;
  message += `Could you please confirm:\n`;
  message += `• Current price\n`;
  message += `• Availability\n`;
  message += `• Delivery options and charges\n\n`;
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
