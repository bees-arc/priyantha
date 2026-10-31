'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Grid, MessageSquare, MapPin, Sparkles } from 'lucide-react';

interface BottomNavProps {
  whatsappNumber?: string;
}

export const BottomNav: React.FC<BottomNavProps> = ({ whatsappNumber = '94722451812' }) => {
  const pathname = usePathname();

  // Don't show bottom nav inside admin dashboard
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const navItems = [
    {
      name: 'Home',
      href: '/',
      icon: Home,
      isActive: pathname === '/',
    },
    {
      name: 'Shop',
      href: '/products',
      icon: Grid,
      isActive: pathname?.startsWith('/products') && pathname === '/products',
    },
    {
      name: 'WhatsApp',
      href: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hello Priyantha Trading Agencies! I would like to inquire about your products in the Panadura showroom.')}`,
      icon: MessageSquare,
      isExternal: true,
      badge: 'Fast',
      isHighlight: true,
    },
    {
      name: 'Categories',
      href: '/categories/home-appliances',
      icon: Sparkles,
      isActive: pathname?.startsWith('/categories'),
    },
    {
      name: 'Showroom',
      href: '/contact',
      icon: MapPin,
      isActive: pathname === '/contact' || pathname === '/about',
    },
  ];

  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] pb-safe"
    >
      <div className="max-w-md mx-auto grid grid-cols-5 h-16 items-center px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isItemActive = item.isActive;

          if (item.isExternal) {
            return (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center relative py-1 text-slate-500 hover:text-[#128c4a] transition-colors"
              >
                <div className="relative">
                  <div className="w-10 h-10 -mt-5 rounded-full bg-[#128c4a] text-white flex items-center justify-center shadow-lg shadow-emerald-600/30 active:scale-95 transition-transform">
                    <Icon className="w-5 h-5 fill-current" />
                  </div>
                  <span className="absolute -top-6 right-0 bg-emerald-500 text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full border border-white">
                    {item.badge}
                  </span>
                </div>
                <span className="text-[10px] font-semibold text-slate-700 mt-1">
                  {item.name}
                </span>
              </a>
            );
          }

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 transition-colors relative ${
                isItemActive
                  ? 'text-[#14213d] font-bold'
                  : 'text-slate-400 hover:text-slate-700 font-medium'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform ${
                    isItemActive ? 'scale-110 stroke-[2.4]' : 'stroke-[1.8]'
                  }`}
                />
                {isItemActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#14213d]" />
                )}
              </div>
              <span className="text-[10px] tracking-tight mt-1">
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
