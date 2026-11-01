'use client';

import React, { useState } from 'react';
import { MessageSquare, ExternalLink, Check } from 'lucide-react';
import { Product } from '@/types';
import { buildWhatsAppChatUrl, generateInquiryMessage, trackInquiryClick } from '@/lib/whatsapp';

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
  const [photoCopiedToast, setPhotoCopiedToast] = useState(false);
  const rawImg = product.images?.[0]?.url || '/images/products/lg-refrigerator.jpg';

  const chatUrl = buildWhatsAppChatUrl({
    product,
    quantity,
    selectedVariant,
    businessWhatsappNumber,
  });

  const copyPhotoToClipboard = async (imgUrl: string): Promise<boolean> => {
    try {
      const res = await fetch(imgUrl);
      const blob = await res.blob();
      const img = new window.Image();
      const objectUrl = URL.createObjectURL(blob);

      return new Promise((resolve) => {
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0);
          canvas.toBlob(async (pngBlob) => {
            URL.revokeObjectURL(objectUrl);
            if (pngBlob && typeof navigator !== 'undefined' && navigator.clipboard?.write) {
              try {
                await navigator.clipboard.write([
                  new ClipboardItem({ 'image/png': pngBlob }),
                ]);
                resolve(true);
                return;
              } catch {
                resolve(false);
                return;
              }
            }
            resolve(false);
          }, 'image/png');
        };
        img.onerror = () => {
          URL.revokeObjectURL(objectUrl);
          resolve(false);
        };
        img.src = objectUrl;
      });
    } catch {
      return false;
    }
  };

  const handleInquiry = async (e: React.MouseEvent) => {
    e.preventDefault();
    trackInquiryClick(product, selectedVariant, quantity);
    setClicked(true);

    try {
      const message = generateInquiryMessage({
        product,
        quantity,
        selectedVariant,
      });

      // 1. Mobile native share with photo attachment if supported
      if (typeof navigator !== 'undefined' && navigator.share && navigator.canShare) {
        try {
          const response = await fetch(rawImg);
          const blob = await response.blob();
          const file = new File([blob], `${product.slug || 'product'}.jpg`, { type: 'image/jpeg' });

          if (navigator.canShare({ files: [file] })) {
            await navigator.share({
              title: product.name,
              text: message,
              files: [file],
            });
            setTimeout(() => setClicked(false), 2000);
            return;
          }
        } catch {
          // If user cancels share, proceed to open WhatsApp URL
        }
      }

      // 2. Desktop: Copy product photo to clipboard so user can press Ctrl + V in chat
      const copied = await copyPhotoToClipboard(rawImg);
      if (copied) {
        setPhotoCopiedToast(true);
        setTimeout(() => setPhotoCopiedToast(false), 9000);
      }
    } catch (err) {
      console.log('Inquiry photo preparation:', err);
    }

    // Direct WhatsApp chat
    window.open(chatUrl, '_blank');
    setTimeout(() => setClicked(false), 3000);
  };

  if (variant === 'icon-only') {
    return (
      <button
        type="button"
        onClick={handleInquiry}
        className={`inline-flex items-center justify-center w-8 h-8 rounded-full bg-white text-[#128c4a] border border-slate-200/80 shadow-xs hover:bg-emerald-50 hover:border-emerald-300 transition-all active:scale-95 ${className}`}
        title={`Inquire about ${product.name} on WhatsApp`}
        aria-label={`Inquire about ${product.name} on WhatsApp`}
      >
        <MessageSquare className="w-4 h-4 fill-current shrink-0" />
      </button>
    );
  }

  if (variant === 'compact') {
    return (
      <button
        type="button"
        onClick={handleInquiry}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#128c4a] hover:bg-[#0e703b] text-white text-xs font-semibold tracking-wide transition-all active:scale-95 shadow-xs ${className}`}
      >
        <MessageSquare className="w-3.5 h-3.5 fill-current" />
        <span>{clicked ? 'Opening...' : 'Inquire'}</span>
      </button>
    );
  }

  if (variant === 'secondary') {
    return (
      <button
        type="button"
        onClick={handleInquiry}
        className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border-2 border-[#128c4a] text-[#128c4a] hover:bg-[#128c4a]/5 font-semibold text-sm transition-all active:scale-95 ${className}`}
      >
        <MessageSquare className="w-4 h-4" />
        <span>{clicked ? 'Opening WhatsApp...' : label}</span>
        <ExternalLink className="w-3.5 h-3.5 opacity-60" />
      </button>
    );
  }

  // Primary large CTA
  return (
    <div className="flex flex-col gap-2.5 w-full">
      {/* Toast Notification when photo is copied */}
      {photoCopiedToast && (
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs flex items-start gap-2 animate-in fade-in slide-in-from-top-2">
          <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <strong className="font-bold">📸 Product Photo copied to clipboard!</strong>
            <p className="text-[11px] text-emerald-700 mt-0.5">
              In your WhatsApp chat, just press <strong>Ctrl + V</strong> (Paste) to attach this photo directly with your inquiry message.
            </p>
          </div>
        </div>
      )}

      {/* Main WhatsApp Inquiry Button */}
      <button
        type="button"
        onClick={handleInquiry}
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
      </button>
    </div>
  );
};
