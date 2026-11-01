'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Search, Phone, MessageSquare, Menu, X, MapPin, ChevronRight, SlidersHorizontal } from 'lucide-react';
import { BrandWordmark } from './BrandWordmark';

interface HeaderProps {
  categories?: { name: string; slug: string }[];
  whatsappNumber?: string;
  displayWhatsappNumber?: string;
  telephone?: string;
  address?: string;
  announcementText?: string;
}

export const Header: React.FC<HeaderProps> = ({
  categories = [
    { name: 'Home Appliances', slug: 'home-appliances' },
    { name: 'Electronics & TV', slug: 'electronics' },
    { name: 'Bicycles', slug: 'bicycles' },
    { name: 'Bedding', slug: 'bedding' },
  ],
  whatsappNumber = '94722451812',
  displayWhatsappNumber = '072 245 1812',
  telephone = '077 797 4777',
  address = 'No: 388A Galle Road, Panadura',
  announcementText = 'Panadura Showroom Open: No: 388A Galle Road • WhatsApp Inquiries: 072 245 1812',
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200/80 shadow-xs">
      {/* Top verified announcement bar (Hidden on mobile) */}
      <div className="hidden md:block bg-[#14213d] text-white text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 font-medium">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <MapPin className="w-3.5 h-3.5 text-slate-300 shrink-0 hidden sm:inline" />
            <span className="text-slate-200">{announcementText}</span>
          </div>

          <div className="flex items-center gap-4 text-slate-300">
            <a
              href={`tel:${telephone.replace(/\s+/g, '')}`}
              className="hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Phone className="w-3 h-3 text-slate-400" />
              <span>{telephone}</span>
            </a>
            <span className="text-slate-600">|</span>
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-300 text-emerald-400 transition-colors flex items-center gap-1 font-semibold"
            >
              <MessageSquare className="w-3 h-3 fill-current" />
              <span>WhatsApp: {displayWhatsappNumber}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 md:h-20 gap-3">
          {/* Authentic Brand Wordmark */}
          <div className="shrink-0 py-1">
            <BrandWordmark />
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-6">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search appliances, TVs, bikes, ovens..."
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-slate-100/90 text-sm border border-slate-200 focus:outline-hidden focus:bg-white focus:border-[#14213d] focus:ring-2 focus:ring-[#14213d]/10 transition-all text-slate-800 placeholder:text-slate-400"
              />
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            </form>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-700">
            <Link href="/" className="hover:text-[#14213d] transition-colors">
              Home
            </Link>
            <Link href="/products" className="hover:text-[#14213d] transition-colors">
              All Products
            </Link>
            <div className="relative group py-2">
              <span className="cursor-pointer hover:text-[#14213d] transition-colors flex items-center gap-1">
                Categories
              </span>
              <div className="absolute top-full left-0 w-52 bg-white rounded-xl shadow-xl border border-slate-100 p-2 hidden group-hover:block transition-all animate-in fade-in slide-in-from-top-1">
                {categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/categories/${cat.slug}`}
                    className="block px-3 py-2 text-xs font-medium text-slate-600 hover:text-[#14213d] hover:bg-slate-50 rounded-lg transition-colors"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
            <Link href="/about" className="hover:text-[#14213d] transition-colors">
              About
            </Link>
            <Link href="/contact" className="hover:text-[#14213d] transition-colors">
              Showroom
            </Link>
          </nav>

          {/* Actions: Direct WhatsApp CTA & Mobile Menu Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Desktop WhatsApp CTA */}
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                'Hello Priyantha Trading Agencies! I would like to inquire about products at your Panadura showroom.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#128c4a] hover:bg-[#0e703b] text-white text-xs font-bold transition-all shadow-xs active:scale-95"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Inquire via WhatsApp</span>
            </a>

            {/* Mobile WhatsApp Icon Button (Oakory cart icon equivalent) */}
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                'Hello Priyantha Trading Agencies! I would like to inquire about products at your Panadura showroom.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="sm:hidden relative w-9 h-9 rounded-full bg-emerald-50 text-[#128c4a] flex items-center justify-center border border-emerald-200/80 active:scale-95 transition-transform"
              aria-label="Direct WhatsApp chat"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 lg:hidden focus:outline-hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search & Filter (Oakory style - Only shown on Home Screen!) */}
        {isHomePage && (
          <div className="md:hidden pb-3 pt-1 space-y-2.5">
            <div className="flex items-center gap-2.5">
              <form onSubmit={handleSearchSubmit} className="relative flex-1">
                <Search className="absolute left-4 top-3.5 w-4.5 h-4.5 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search appliances, TVs, bikes..."
                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-100/80 text-xs sm:text-sm border border-transparent focus:outline-hidden focus:bg-white focus:border-[#14213d] text-slate-800 placeholder:text-slate-400 transition-colors"
                />
              </form>
              <Link
                href="/products"
                className="w-12 h-12 rounded-2xl bg-slate-100/80 hover:bg-slate-200 flex items-center justify-center text-slate-700 active:scale-95 transition-transform shrink-0"
                title="Open filters"
              >
                <SlidersHorizontal className="w-5 h-5 text-slate-700" />
              </Link>
            </div>

            {/* Horizontal Swipeable Category Pills (Oakory style) */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-0.5 text-xs font-semibold scrollbar-none">
              <Link
                href="/products"
                className="px-4.5 py-2 rounded-full bg-[#14213d] text-white shrink-0 active:scale-95 transition-transform shadow-xs"
              >
                All
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/categories/${cat.slug}`}
                  className="px-4 py-2 rounded-full bg-slate-100/80 text-slate-700 hover:bg-slate-200 shrink-0 active:scale-95 transition-transform"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2">
          <nav className="flex flex-col gap-1">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-lg"
            >
              <span>Home</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
            <Link
              href="/products"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-lg"
            >
              <span>All Products</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>

            <div className="py-2 border-y border-slate-100 my-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3">
                Categories
              </span>
              <div className="grid grid-cols-2 gap-1 mt-1">
                {categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/categories/${cat.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 rounded-lg"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-lg"
            >
              <span>About Business</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-lg"
            >
              <span>Showroom & Contact</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
            <Link
              href="/faq"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-lg"
            >
              <span>FAQ & Policies</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2.5 text-xs font-semibold text-slate-500 hover:bg-slate-50 rounded-lg mt-2"
            >
              <span>Admin Portal</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>

            <div className="mt-4 pt-3 border-t border-slate-100">
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#128c4a] text-white font-bold text-sm shadow-sm"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Message on WhatsApp ({displayWhatsappNumber})</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
