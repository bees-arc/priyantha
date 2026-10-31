'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MessageSquare, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
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
  const primaryImage = product.images?.[0]?.url || `/api/placeholder?type=${productType}&label=${encodeURIComponent(product.name)}&w=600`;
  const displaySpecs = product.specifications?.slice(0, 2) || [];

  return (
    <div className="group flex flex-col bg-white rounded-2xl border border-slate-200/80 overflow-hidden card-hover-elevation transition-all">
      {/* Product Image Link */}
      <Link
        href={`/products/${product.slug}`}
        className="block w-full"
      >
        {/* Aspect-ratio wrapper — bulletproof fill container */}
        <div className="relative w-full overflow-hidden bg-slate-50" style={{ paddingBottom: '100%' }}>
          <Image
            src={primaryImage}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="absolute inset-0 object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />

          {/* Brand tag overlay */}
          {product.brand && (
            <div className="absolute top-3 left-3 bg-[#14213d]/90 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-md tracking-wider uppercase shadow-xs">
              {product.brand}
            </div>
          )}

          {/* Verification provenance tag */}
          {product.provenance?.verificationStatus === 'VERIFIED' && (
            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-[#128c4a] text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs border border-emerald-100">
              <ShieldCheck className="w-3 h-3" />
              <span>Verified</span>
            </div>
          )}
        </div>
      </Link>

      {/* Card Content */}
      <div className="flex flex-col flex-1 p-4 sm:p-5">
        {/* Category breadcrumb */}
        <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
          {product.categoryName}
        </div>

        {/* Title */}
        <Link href={`/products/${product.slug}`} className="group-hover:text-[#14213d] transition-colors">
          <h3 className="font-serif font-bold text-sm sm:text-base text-slate-900 line-clamp-2 leading-snug">
            {product.name}
          </h3>
        </Link>

        {/* Specs snippet */}
        {displaySpecs.length > 0 && (
          <div className="flex flex-wrap gap-1.5 my-3">
            {displaySpecs.map((spec) => (
              <span
                key={spec.id}
                className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium"
              >
                {spec.name}: <strong className="text-slate-800">{spec.value}</strong>
              </span>
            ))}
          </div>
        )}

        {/* Price Section */}
        <div className="mt-auto pt-3 border-t border-slate-100 flex items-baseline justify-between">
          <div>
            {product.priceVisibility === 'visible' && product.price ? (
              <div>
                <span className="text-base sm:text-lg font-bold text-[#14213d]">
                  Rs. {product.price.toLocaleString('en-LK')}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-xs text-slate-400 line-through ml-2">
                    Rs. {product.originalPrice.toLocaleString('en-LK')}
                  </span>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-slate-700">
                <Tag className="w-3.5 h-3.5 text-[#14213d]" />
                <span className="text-xs sm:text-sm font-bold text-[#14213d]">
                  Ask for Price
                </span>
              </div>
            )}
            <span className="text-[10px] text-slate-400 block mt-0.5">
              Contact via WhatsApp for current quote
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-2 mt-4 pt-1">
          <Link
            href={`/products/${product.slug}`}
            className="inline-flex items-center justify-center gap-1 px-3 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-xs transition-colors"
          >
            <span>Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <WhatsAppInquiryButton
            product={product}
            businessWhatsappNumber={whatsappNumber}
            variant="compact"
            label="Inquire"
            className="w-full justify-center"
          />
        </div>
      </div>
    </div>
  );
};
