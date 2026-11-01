'use client';

import React, { useState } from 'react';
import { MessageSquare, ExternalLink, Check, Camera, Download, Image as ImageIcon } from 'lucide-react';
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
  showPhotoShareOption?: boolean;
}

export const WhatsAppInquiryButton: React.FC<WhatsAppInquiryButtonProps> = ({
  product,
  quantity = 1,
  selectedVariant,
  businessWhatsappNumber = '94722451812',
  variant = 'primary',
  className = '',
  label = 'Inquire on WhatsApp',
  showPhotoShareOption = false,
}) => {
  const [clicked, setClicked] = useState(false);
  const [sharingPhoto, setSharingPhoto] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
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

  const [photoCopiedToast, setPhotoCopiedToast] = useState(false);
  const rawImg = product.images?.[0]?.url || '/images/products/lg-refrigerator.jpg';

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

  const handleShareWithPhoto = async () => {
    setSharingPhoto(true);
    trackInquiryClick(product, selectedVariant, quantity);

    try {
      const message = generateInquiryMessage({
        product,
        quantity,
        selectedVariant,
      });

      // 1. Native mobile share with file
      if (typeof navigator !== 'undefined' && navigator.share && navigator.canShare) {
        const response = await fetch(rawImg);
        const blob = await response.blob();
        const file = new File([blob], `${product.slug || 'product'}.jpg`, { type: 'image/jpeg' });

        if (navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: product.name,
            text: message,
            files: [file],
          });
          setSharingPhoto(false);
          return;
        }
      }

      // 2. Desktop clipboard copy fallback
      const copied = await copyPhotoToClipboard(rawImg);
      if (copied) {
        setPhotoCopiedToast(true);
        setTimeout(() => setPhotoCopiedToast(false), 9000);
      }
    } catch (err) {
      console.log('Share handling error:', err);
    }

    // Direct WhatsApp chat fallback with prefilled details and photo link
    window.open(chatUrl, '_blank');
    setSharingPhoto(false);
  };

  if (variant === 'icon-only') {
    return (
      <a
        href={chatUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className={`inline-flex items-center justify-center w-8 h-8 rounded-full bg-white text-[#128c4a] border border-slate-200/80 shadow-xs hover:bg-emerald-50 hover:border-emerald-300 transition-all active:scale-95 ${className}`}
        title={`Inquire about ${product.name} on WhatsApp`}
        aria-label={`Inquire about ${product.name} on WhatsApp`}
      >
        <MessageSquare className="w-4 h-4 fill-current shrink-0" />
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
        <span>{clicked ? 'Opening...' : 'Inquire'}</span>
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

      {showPhotoShareOption && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <button
            type="button"
            onClick={handleShareWithPhoto}
            disabled={sharingPhoto}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border border-emerald-600/30 bg-emerald-50/70 hover:bg-emerald-100 text-emerald-900 text-xs font-semibold transition-all active:scale-98"
            title="Copies photo to clipboard and opens WhatsApp (Mobile: shares photo file directly)"
          >
            <Camera className="w-4 h-4 text-[#128c4a]" />
            <span>{sharingPhoto ? 'Preparing Photo...' : 'Inquire with Photo (Ctrl+V)'}</span>
          </button>

          <a
            href={rawImg}
            download={`${product.slug || 'product'}.jpg`}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-all"
            title="Download product image to your device"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Save Photo</span>
          </a>
        </div>
      )}
    </div>
  );
};
