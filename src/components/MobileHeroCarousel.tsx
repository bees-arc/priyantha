'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

interface Slide {
  badge: string;
  badgeColor: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
  image: string;
  alt: string;
  bgGradient: string;
}

const slides: Slide[] = [
  {
    badge: 'Showroom Selection',
    badgeColor: 'text-emerald-300',
    title: 'Crafted Living. \nTimeless Quality.',
    subtitle: 'Discover energy-saving inverter refrigerators & home appliances.',
    ctaText: 'Shop Now',
    ctaHref: '/categories/home-appliances',
    image: '/images/products/innovex-refrigerator.jpg',
    alt: 'Innovex Inverter Refrigerator',
    bgGradient: 'from-[#14213d] via-[#1b2b4d] to-[#24375a]',
  },
  {
    badge: 'Entertainment & TV',
    badgeColor: 'text-sky-300',
    title: 'Cinema Clarity. \nEveryday Joy.',
    subtitle: 'Smart HD LED televisions with official warranty & fast delivery.',
    ctaText: 'Explore TVs',
    ctaHref: '/categories/electronics',
    image: '/images/products/smart-tv.jpg',
    alt: 'Smart LED Television',
    bgGradient: 'from-[#0f172a] via-[#1e293b] to-[#1e3a5f]',
  },
  {
    badge: 'Performance Bikes',
    badgeColor: 'text-amber-300',
    title: 'Ride Strong. \nBuilt to Last.',
    subtitle: 'Genuine Tomahawk mountain bikes & city commuters for the family.',
    ctaText: 'View Bicycles',
    ctaHref: '/categories/bicycles',
    image: '/images/products/tomahawk-bicycle.jpg',
    alt: 'Tomahawk Mountain Bicycle',
    bgGradient: 'from-[#1a1a2e] via-[#16213e] to-[#0f3460]',
  },
  {
    badge: 'Kitchen Range',
    badgeColor: 'text-rose-300',
    title: 'Bake & Roast. \nMaster Your Kitchen.',
    subtitle: 'Heavy-duty rotisserie benchtop ovens & glass-top cookers.',
    ctaText: 'Kitchen Range',
    ctaHref: '/categories/home-appliances',
    image: '/images/products/mitsu-oven.jpg',
    alt: 'Mitsu Electric Rotisserie Oven',
    bgGradient: 'from-[#1b2430] via-[#212d3d] to-[#2a3b50]',
  },
];

export const MobileHeroCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const isPaused = useRef(false);

  // Auto-advance timer (every 4.5 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused.current) {
        setCurrentIndex((prev) => (prev + 1) % slides.length);
      }
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    isPaused.current = true;
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) {
      isPaused.current = false;
      return;
    }

    const diffX = touchStartX - touchEndX;
    const minSwipeDistance = 40;

    if (diffX > minSwipeDistance) {
      // Swiped left -> next slide
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    } else if (diffX < -minSwipeDistance) {
      // Swiped right -> prev slide
      setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    }

    setTouchStartX(null);
    setTouchEndX(null);
    setTimeout(() => {
      isPaused.current = false;
    }, 2000);
  };

  const currentSlide = slides[currentIndex];

  return (
    <section className="md:hidden px-4 pt-3 pb-2">
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className={`relative rounded-[28px] overflow-hidden bg-gradient-to-br ${currentSlide.bgGradient} text-white p-5 sm:p-6 shadow-md transition-colors duration-700 select-none`}
      >
        <div className="grid grid-cols-12 gap-3 items-center min-h-[170px]">
          {/* Left Text Content */}
          <div className="col-span-7 space-y-2">
            <span
              className={`text-[10px] font-bold uppercase tracking-wider ${currentSlide.badgeColor} bg-white/10 px-2.5 py-0.5 rounded-full inline-block transition-colors`}
            >
              {currentSlide.badge}
            </span>

            <h2 className="text-xl font-bold leading-tight tracking-tight whitespace-pre-line animate-in fade-in duration-300">
              {currentSlide.title}
            </h2>

            <p className="text-[11px] text-slate-300 leading-snug line-clamp-2 animate-in fade-in duration-300">
              {currentSlide.subtitle}
            </p>

            <div className="pt-1.5">
              <Link
                href={currentSlide.ctaHref}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-[#14213d] text-xs font-bold active:scale-95 transition-transform shadow-xs"
              >
                <span>{currentSlide.ctaText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Product Image */}
          <div className="col-span-5 relative">
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-white/10 backdrop-blur-xs border border-white/20 p-1 shadow-inner">
              <Image
                key={currentSlide.image}
                src={currentSlide.image}
                alt={currentSlide.alt}
                fill
                className="object-cover rounded-xl transition-opacity duration-500 animate-in fade-in"
                priority
              />
            </div>
          </div>
        </div>

        {/* Interactive Dots Indicator */}
        <div className="flex items-center justify-center gap-1.5 pt-3.5">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentIndex(idx);
                isPaused.current = true;
                setTimeout(() => {
                  isPaused.current = false;
                }, 4000);
              }}
              aria-label={`Go to slide ${idx + 1}`}
              className={`transition-all duration-300 ${
                idx === currentIndex
                  ? 'w-5 h-1.5 rounded-full bg-white shadow-xs'
                  : 'w-1.5 h-1.5 rounded-full bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
