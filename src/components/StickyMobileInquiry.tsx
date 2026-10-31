'use client';

import React from 'react';
import { Product } from '@/types';
import { WhatsAppInquiryButton } from './WhatsAppInquiryButton';

interface StickyMobileInquiryProps {
  product: Product;
  selectedVariant?: string;
  quantity?: number;
  whatsappNumber?: string;
}

export const StickyMobileInquiry: React.FC<StickyMobileInquiryProps> = ({
  product,
  selectedVariant,
  quantity = 1,
  whatsappNumber = '94722451812',
}) => {
  return (
    <aside aria-label="Mobile inquiry action" className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-3 shadow-2xl">
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-col min-w-0">
          <span className="text-xs text-slate-500 truncate">{product.name}</span>
          <span className="text-sm font-bold text-[#14213d]">
            {product.priceVisibility === 'visible' && product.price
              ? `Rs. ${product.price.toLocaleString('en-LK')}`
              : 'Ask for Price'}
          </span>
        </div>

        <div className="shrink-0">
          <WhatsAppInquiryButton
            product={product}
            selectedVariant={selectedVariant}
            quantity={quantity}
            businessWhatsappNumber={whatsappNumber}
            variant="compact"
            label="Inquire via WhatsApp"
            className="px-4 py-2.5 text-xs font-bold"
          />
        </div>
      </div>
    </aside>
  );
};
