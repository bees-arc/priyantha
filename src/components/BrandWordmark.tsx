import React from 'react';
import Link from 'next/link';

interface BrandWordmarkProps {
  variant?: 'light' | 'dark';
  className?: string;
  showSubtitle?: boolean;
}

export const BrandWordmark: React.FC<BrandWordmarkProps> = ({
  variant = 'light',
  className = '',
  showSubtitle = true,
}) => {
  const isDark = variant === 'dark';

  return (
    <Link
      href="/"
      className={`inline-flex flex-col group transition-opacity hover:opacity-95 ${className}`}
      data-temporary-logo="true"
      aria-label="Priyantha Trading Agencies (PVT) LTD Home"
    >
      <div className="flex items-center gap-2">
        {/* Monogram emblem */}
        <div
          className={`w-9 h-9 rounded-lg flex items-center justify-center font-serif font-bold text-lg shadow-xs transition-transform group-hover:scale-105 ${
            isDark
              ? 'bg-white text-[#14213d]'
              : 'bg-[#14213d] text-white ring-1 ring-white/10'
          }`}
        >
          P
        </div>

        <div className="flex flex-col leading-none">
          <span
            className={`font-serif tracking-tight font-bold text-lg sm:text-xl ${
              isDark ? 'text-white' : 'text-[#14213d]'
            }`}
          >
            PRIYANTHA
          </span>
          <span
            className={`text-[9px] sm:text-[10px] font-semibold tracking-[0.2em] uppercase mt-0.5 ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            TRADING AGENCIES
          </span>
        </div>
      </div>

      {showSubtitle && (
        <div className="flex items-center gap-1.5 mt-1 pl-11">
          <span
            className={`text-[9px] font-medium tracking-wider uppercase px-1.5 py-0.2 rounded ${
              isDark
                ? 'bg-white/10 text-slate-300'
                : 'bg-slate-100 text-slate-600 border border-slate-200'
            }`}
          >
            Panadura
          </span>
          <span
            className={`text-[9px] font-medium ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            (PVT) LTD
          </span>
        </div>
      )}
    </Link>
  );
};
