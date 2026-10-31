'use client';

import React, { useState } from 'react';
import { MessageSquare, ExternalLink, Check } from 'lucide-react';
import { Product } from '@/types';
import { buildWhatsAppChatUrl, trackInquiryClick } from '@/lib/whatsapp';

interface WhatsAppInquiryButtonProps {
  product: Product;
  quantity?: number;
  selectedVariant?: string;
  businessWhatsappNumber?: string;
  variant?: 'primary' | 'secondary' | 'compact' | 'icon-only';
  className?: string;
  label?: string;
}

export const WhatsAppInquiryButton: React.FC<WhatsAppInquiryButtonProps> = ({
  product,
  quantity = 1,
  selectedVariant,
  businessWhatsappNumber = '94722451812',
  variant = 'primary',
  className = '',
  label = 'Inquire on WhatsApp',
}) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // track inquiry event asynchronously
    trackInquiryClick(product, selectedVariant, quantity);
    setClicked(true);
    setTimeout(() => setClicked(false), 3000);
  };

  const chatUrl = buildWhatsAppChatUrl({
    product,
    quantity,
    selectedVariant,
    businessWhatsappNumber,
  });

  if (variant === 'icon-only') {
    return (
      <a
        href={chatUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className={`inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#128c4a] hover:bg-[#0e703b] text-white transition-all shadow-sm hover:shadow active:scale-95 ${className}`}
        title={`Inquire about ${product.name} on WhatsApp`}
        aria-label={`Inquire about ${product.name} on WhatsApp`}
      >
        <MessageSquare className="w-5 h-5 fill-current" />
      </a>
    );
  }

  if (variant === 'compact') {
    return (
      <a
        href={chatUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#128c4a] hover:bg-[#0e703b] text-white text-xs font-semibold tracking-wide transition-all active:scale-95 shadow-xs ${className}`}
      >
        <MessageSquare className="w-3.5 h-3.5 fill-current" />
        <span>{clicked ? 'Opening WhatsApp...' : 'Inquire'}</span>
      </a>
    );
  }

  if (variant === 'secondary') {
    return (
      <a
        href={chatUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border-2 border-[#128c4a] text-[#128c4a] hover:bg-[#128c4a]/5 font-semibold text-sm transition-all active:scale-95 ${className}`}
      >
        <MessageSquare className="w-4 h-4" />
        <span>{clicked ? 'Opening WhatsApp...' : label}</span>
        <ExternalLink className="w-3.5 h-3.5 opacity-60" />
      </a>
    );
  }

  // Primary large CTA
  return (
    <a
      href={chatUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={`inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#128c4a] hover:bg-[#0e703b] text-white font-semibold text-base transition-all shadow-md hover:shadow-lg active:scale-98 ${className}`}
    >
      {clicked ? (
        <>
          <Check className="w-5 h-5 animate-pulse" />
          <span>Opening WhatsApp...</span>
        </>
      ) : (
        <>
          <MessageSquare className="w-5 h-5 fill-current" />
          <span>{label}</span>
          <ExternalLink className="w-4 h-4 opacity-75" />
        </>
      )}
    </a>
  );
};
