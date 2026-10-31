'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ProductImage } from '@/types';

interface ProductGalleryProps {
  images: ProductImage[];
  productName: string;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ images, productName }) => {
  const safeImages = images && images.length > 0
    ? images
    : [
        {
          id: 'placeholder',
          url: `/api/placeholder?type=default&label=${encodeURIComponent(productName)}&w=800`,
          alt: productName,
        },
      ];

  const [activeIndex, setActiveIndex] = useState(0);
  const currentImage = safeImages[activeIndex] || safeImages[0];

  return (
    <div className="flex flex-col gap-4">
      {/* Main Large Display Image */}
      <div className="relative w-full rounded-2xl overflow-hidden bg-slate-50 border border-slate-200" style={{ paddingBottom: '100%', position: 'relative' }}>
        <Image
          src={currentImage.url}
          alt={currentImage.alt || productName}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="absolute inset-0 object-cover object-center transition-all duration-300"
        />
      </div>

      {/* Thumbnails row (if more than 1 image) */}
      {safeImages.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2">
          {safeImages.map((img, idx) => (
            <button
              key={img.id || idx}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`relative shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
                activeIndex === idx
                  ? 'border-[#14213d] ring-2 ring-[#14213d]/20 scale-102'
                  : 'border-slate-200 hover:border-slate-400 opacity-70 hover:opacity-100'
              }`}
              style={{ width: 80, height: 80, position: 'relative', flexShrink: 0 }}
            >
              <Image
                src={img.url}
                alt={img.alt || `${productName} thumbnail ${idx + 1}`}
                fill
                sizes="80px"
                className="object-cover object-center"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
