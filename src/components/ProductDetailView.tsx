'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  MessageSquare,
  ShieldCheck,
  Check,
  Truck,
  RotateCcw,
  Tag,
  Share2,
  ChevronRight,
  Plus,
  Minus,
} from 'lucide-react';
import { Product } from '@/types';
import { ProductGallery } from './ProductGallery';
import { WhatsAppInquiryButton } from './WhatsAppInquiryButton';
import { StickyMobileInquiry } from './StickyMobileInquiry';

interface ProductDetailViewProps {
  product: Product;
  relatedProducts: Product[];
  whatsappNumber?: string;
  displayWhatsappNumber?: string;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  product,
  relatedProducts,
  whatsappNumber = '94722451812',
  displayWhatsappNumber = '072 245 1812',
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<string | undefined>(
    product.variants && product.variants.length > 0 ? product.variants[0].value : undefined
  );
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      if (navigator.share) {
        navigator.share({
          title: product.name,
          url: window.location.href,
        }).catch(() => {});
      } else {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-6 flex-wrap">
          <Link href="/" className="hover:text-[#14213d]">Home</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <Link href="/products" className="hover:text-[#14213d]">Products</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <Link href={`/categories/${product.categorySlug}`} className="hover:text-[#14213d]">
            {product.categoryName}
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-slate-800 font-semibold truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Main Product Container */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 lg:p-10 shadow-xs mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left: Gallery */}
            <div className="lg:col-span-6">
              <ProductGallery images={product.images} productName={product.name} />

              {/* Provenance note */}
              {product.provenance && (
                <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-[#14213d]">
                    <ShieldCheck className="w-4 h-4 text-[#128c4a]" />
                    <span>Showroom Verified Inventory</span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Source: {product.provenance.source}
                  </p>
                  {product.provenance.notes && (
                    <p className="text-[11px] text-slate-400 italic">
                      Note: {product.provenance.notes}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Right: Product Details & Inquiries */}
            <div className="lg:col-span-6 flex flex-col">
              {/* Category & Brand tags */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  {product.brand && (
                    <span className="text-xs font-bold uppercase tracking-wider text-white bg-[#14213d] px-2.5 py-1 rounded-md">
                      {product.brand}
                    </span>
                  )}
                  <span className="text-xs font-semibold text-slate-500">
                    SKU: <strong className="text-slate-700">{product.sku}</strong>
                  </span>
                </div>

                <button
                  onClick={handleShare}
                  className="flex items-center gap-1 text-xs text-slate-500 hover:text-[#14213d] px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
                  title="Share product link"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copied ? 'Link Copied!' : 'Share'}</span>
                </button>
              </div>

              {/* Product Title */}
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-tight mb-4">
                {product.name}
              </h1>

              {/* Price Banner */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 mb-6">
                <div className="flex items-baseline gap-3">
                  {product.priceVisibility === 'visible' && product.price ? (
                    <div>
                      <span className="text-2xl sm:text-3xl font-bold text-[#14213d]">
                        Rs. {product.price.toLocaleString('en-LK')}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-slate-400 line-through ml-3">
                          Rs. {product.originalPrice.toLocaleString('en-LK')}
                        </span>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Tag className="w-5 h-5 text-[#14213d]" />
                      <span className="text-xl sm:text-2xl font-bold text-[#14213d]">
                        Ask for Today&apos;s Price
                      </span>
                    </div>
                  )}
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Special showroom rates & seasonal offers confirmed in real-time via WhatsApp.
                </p>
              </div>

              {/* Description */}
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Variants Selector (if any) */}
              {product.variants && product.variants.length > 0 && (
                <div className="mb-6 space-y-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Select Option / Size:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((v) => (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => setSelectedVariant(v.value)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                          selectedVariant === v.value
                            ? 'bg-[#14213d] text-white border-[#14213d] shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'
                        }`}
                      >
                        {v.value}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Counter */}
              <div className="mb-6">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Quantity for Inquiry:
                </label>
                <div className="inline-flex items-center rounded-xl border border-slate-200 bg-slate-50 p-1">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-slate-700 shadow-xs hover:bg-slate-100 disabled:opacity-50"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-12 text-center text-sm font-bold text-slate-800">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-slate-700 shadow-xs hover:bg-slate-100"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Primary WhatsApp Action */}
              <div className="space-y-3 mb-6">
                <WhatsAppInquiryButton
                  product={product}
                  quantity={quantity}
                  selectedVariant={selectedVariant}
                  businessWhatsappNumber={whatsappNumber}
                  label="Inquire on WhatsApp Now"
                  className="w-full text-base py-4"
                  showPhotoShareOption={true}
                />

                <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500">
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span>
                    Direct chat with Panadura sales team at <strong>{displayWhatsappNumber}</strong>
                  </span>
                </div>
              </div>

              {/* Value Signals */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#14213d] shrink-0" />
                  <span>Panadura & Islandwide Delivery Options</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-[#14213d] shrink-0" />
                  <span>Manufacturer Warranty Included</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications Table */}
        {product.specifications && product.specifications.length > 0 && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 mb-12 shadow-xs">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 mb-6">
              Technical Specifications
            </h2>

            <div className="border border-slate-200 rounded-2xl overflow-hidden divide-y divide-slate-200">
              {product.specifications.map((spec, i) => (
                <div
                  key={spec.id || i}
                  className={`grid grid-cols-1 sm:grid-cols-3 p-3.5 sm:p-4 text-xs sm:text-sm ${
                    i % 2 === 0 ? 'bg-white' : 'bg-slate-50/70'
                  }`}
                >
                  <span className="font-semibold text-slate-600 sm:col-span-1">
                    {spec.name}
                  </span>
                  <span className="text-slate-900 sm:col-span-2 font-medium">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="space-y-6">
            <h2 className="font-serif text-2xl font-bold text-slate-900">
              Related Items in {product.categoryName}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/products/${rel.slug}`}
                  className="bg-white rounded-2xl border border-slate-200 p-4 hover:border-[#14213d]/40 transition-all flex flex-col group"
                >
                  <div className="aspect-square relative rounded-xl bg-slate-50 overflow-hidden mb-3">
                    <img
                      src={rel.images?.[0]?.url || '/images/products/lg-refrigerator.jpg'}
                      alt={rel.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <span className="text-[10px] font-bold uppercase text-slate-400">
                    {rel.brand || 'Item'}
                  </span>
                  <h3 className="font-serif text-xs font-bold text-slate-800 line-clamp-2 mt-1">
                    {rel.name}
                  </h3>
                  <div className="mt-auto pt-2 text-xs font-bold text-[#14213d]">
                    {rel.priceVisibility === 'visible' && rel.price
                      ? `Rs. ${rel.price.toLocaleString('en-LK')}`
                      : 'Ask for Price'}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Sticky Bar */}
      <StickyMobileInquiry
        product={product}
        selectedVariant={selectedVariant}
        quantity={quantity}
        whatsappNumber={whatsappNumber}
      />
    </div>
  );
};
