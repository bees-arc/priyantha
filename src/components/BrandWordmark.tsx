import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface BrandWordmarkProps {
  variant?: 'light' | 'dark';
  className?: string;
  showSubtitle?: boolean;
  priority?: boolean;
}

export const BrandWordmark: React.FC<BrandWordmarkProps> = ({
  variant = 'light',
  className = '',
  priority = true,
}) => {
  const isDark = variant === 'dark';

  return (
    <Link
      href="/"
      className={`inline-flex items-center group transition-opacity hover:opacity-90 ${className}`}
      aria-label="Priyantha Trading Agencies (PVT) LTD Home"
    >
      <div className="relative flex items-center py-0.5">
        <Image
          src="/PTA Priyantha Trading Agencies Logo.png"
          alt="Priyantha Trading Agencies (PVT) LTD"
          width={2172}
          height={724}
          priority={priority}
          className={`h-9 sm:h-10 md:h-12 w-auto object-contain transition-transform group-hover:scale-[1.02] ${
            isDark ? 'brightness-0 invert' : ''
          }`}
        />
      </div>
    </Link>
  );
};
