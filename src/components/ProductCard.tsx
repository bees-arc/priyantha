'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, MessageSquare, ArrowRight, ShieldCheck } from 'lucide-react';
import { Product } from '@/types';
import { WhatsAppInquiryButton } from './WhatsAppInquiryButton';

interface ProductCardProps {
  product: Product;
  whatsappNumber?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  whatsappNumber = '94722451812',
}) => {
  const productType = product.categorySlug?.includes('bicycle') ? 'bicycle'
    : product.categorySlug?.includes('bedding') ? 'mattress'
    : product.subcategoryName?.toLowerCase().includes('oven') ? 'oven'
    : product.subcategoryName?.toLowerCase().includes('tv') ? 'tv'
    : product.categorySlug?.includes('electronics') ? 'tv'
    : 'refrigerator';
  const fallbackImages: Record<string, string> = {
    bicycle: '/images/products/tomahawk-bicycle.jpg',
    mattress: '/images/products/arpico-mattress.jpg',
    oven: '/images/products/mitsu-oven.jpg',
    tv: '/images/products/smart-tv.jpg',
    refrigerator: '/images/products/lg-refrigerator.jpg',
  };
  const primaryImage = product.images?.[0]?.url || fallbackImages[productType] || '/images/products/lg-refrigerator.jpg';

  return (
    <div className="group flex flex-col bg-white rounded-3xl p-3 sm:p-4 border border-slate-100/90 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)] hover:border-slate-200 transition-all">
      {/* Product Image Link Container */}
      <div className="relative aspect-square w-full rounded-2xl bg-[#f8f9fa] overflow-hidden mb-3">
        <Link href={`/products/${product.slug}`} className="block w-full h-full">
          <Image
            src={primaryImage}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover object-center group-hover:scale-104 transition-transform duration-300"
          />
        </Link>

        {/* Top Left Pill Tag */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1 pointer-events-none">
          {product.brand ? (
            <span className="bg-[#14213d] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
              {product.brand}
            </span>
          ) : (
            <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
              Verified
            </span>
          )}
        </div>

        {/* Top Right Quick WhatsApp Inquiry Heart/Icon Button */}
        <div className="absolute top-2 right-2 z-10">
          <WhatsAppInquiryButton
            product={product}
            businessWhatsappNumber={whatsappNumber}
            variant="icon-only"
            className="w-7 h-7 bg-white/95 text-slate-700 hover:text-[#128c4a] hover:bg-white shadow-xs border border-slate-100"
          />
        </div>
      </div>

      {/* Product Info */}
      <div className="flex flex-col flex-1">
        <Link href={`/products/${product.slug}`} className="group-hover:text-[#14213d] transition-colors">
          <h3 className="font-semibold text-xs sm:text-sm text-slate-800 line-clamp-1 leading-snug">
            {product.name}
          </h3>
        </Link>

        {/* Price */}
        <div className="mt-1 flex items-baseline gap-2">
          {product.priceVisibility === 'visible' && product.price ? (
            <span className="text-xs sm:text-sm font-bold text-slate-900">
              Rs. {product.price.toLocaleString('en-LK')}
            </span>
          ) : (
            <span className="text-xs sm:text-sm font-bold text-[#14213d]">
              Ask for Price
            </span>
          )}
        </div>

        {/* Rating / Showroom Proof Tag */}
        <div className="mt-1 flex items-center gap-1 text-[11px] text-slate-500">
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          <span className="font-semibold text-slate-700">4.9</span>
          <span className="text-slate-400 text-[10px]">(Panadura)</span>
        </div>

        {/* Actions Button */}
        <div className="mt-3 pt-2 border-t border-slate-100/80 flex items-center gap-2">
          <Link
            href={`/products/${product.slug}`}
            className="flex-1 py-1.5 px-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11px] text-center transition-colors"
          >
            Details
          </Link>

          <WhatsAppInquiryButton
            product={product}
            businessWhatsappNumber={whatsappNumber}
            variant="compact"
            label="Inquire"
            className="px-2.5 py-1.5 text-[11px] rounded-xl shrink-0"
          />
        </div>
      </div>
    </div>
  );
};
