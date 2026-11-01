import Link from 'next/link';
import Image from 'next/image';
import {
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  MapPin,
  Phone,
  CheckCircle2,
  Clock,
  Sparkles,
  ShoppingBag,
  Truck,
} from 'lucide-react';
import { getBusinessSettings, getCategories, getProducts } from '@/lib/db';
import { ProductCard } from '@/components/ProductCard';
import { CategoryCard } from '@/components/CategoryCard';
import { MobileHeroCarousel } from '@/components/MobileHeroCarousel';

export default function HomePage() {
  const settings = getBusinessSettings();
  const categories = getCategories();
  const featuredProducts = getProducts({ featured: true });
  const allProducts = getProducts();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Auto-Rotating Mobile Hero Carousel (Oakory Style) */}
      <MobileHeroCarousel />

      {/* Mobile: Popular Picks section placed DIRECTLY below Hero Banner (Oakory Screen 1 placing) */}
      <section className="md:hidden px-4 pt-3 pb-2">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">Popular Picks</h2>
          <Link
            href="/products"
            className="text-xs font-semibold text-slate-500 hover:text-slate-900 active:scale-95 transition-transform"
          >
            View All
          </Link>
        </div>

        {/* Horizontal Swipeable Card Row (Matching Oakory Screen 1) */}
        <div className="flex gap-3 overflow-x-auto pb-3 pt-0.5 -mx-4 px-4 scrollbar-none snap-x">
          {featuredProducts.slice(0, 6).map((product) => (
            <div key={product.id} className="w-[165px] shrink-0 snap-start">
              <ProductCard
                product={product}
                whatsappNumber={settings.whatsappNumber}
                compact
              />
            </div>
          ))}
        </div>
      </section>

      {/* Desktop Hero Section */}
      <section className="hidden md:block relative bg-[#14213d] text-white overflow-hidden py-16 sm:py-24 lg:py-28">
        {/* Subtle geometric pattern overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold tracking-wide text-slate-200">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>Showroom at No: 388A Galle Road, Panadura</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]">
                Reliable Living, <br className="hidden sm:inline" />
                <span className="text-slate-200">Trusted Appliances in Panadura</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
                Explore our curated showroom collection of energy-saving inverter refrigerators,
                high-definition LED televisions, heavy-duty baking ovens, Tomahawk bicycles, and
                mattresses. Inquire directly on WhatsApp for real-time stock and prices.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white text-[#14213d] hover:bg-slate-100 font-bold text-sm sm:text-base transition-all shadow-md active:scale-95"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Browse Product Catalogue</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>

                <a
                  href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
                    'Hello Priyantha Trading Agencies! I would like to inquire about products at your Panadura showroom.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#128c4a] hover:bg-[#0e703b] text-white font-bold text-sm sm:text-base transition-all shadow-md active:scale-95"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  <span>WhatsApp Inquiry ({settings.displayWhatsappNumber})</span>
                </a>
              </div>

              {/* Key Trust Signals */}
              <div className="pt-6 border-t border-slate-700/60 grid grid-cols-3 gap-4 text-left">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-white">Genuine Brands</div>
                    <div className="text-[11px] text-slate-400">Distributor Warranty</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <MapPin className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-white">Panadura Showroom</div>
                    <div className="text-[11px] text-slate-400">Direct In-Store Pickup</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <MessageSquare className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-white">Instant WhatsApp</div>
                    <div className="text-[11px] text-slate-400">Fast Personal Replies</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Hero Visual Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-white/20 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-md p-6 shadow-2xl">
                <div className="relative w-full rounded-xl overflow-hidden shadow-inner mb-5" style={{ paddingBottom: '75%', position: 'relative' }}>
                  <Image
                    src="/images/products/lg-refrigerator.jpg"
                    alt="Priyantha Trading Showroom Selection"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="absolute inset-0 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#14213d]/90 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-300">
                      Showroom Selection
                    </span>
                    <h3 className="font-serif text-lg font-bold">
                      Inverter Double Door Refrigerators
                    </h3>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-300 pb-2 border-b border-white/10">
                    <span>Showroom Location:</span>
                    <strong className="text-white">Galle Road, Panadura</strong>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-300 pb-2 border-b border-white/10">
                    <span>Direct Call:</span>
                    <strong className="text-white">{settings.telephone}</strong>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-300">
                    <span>WhatsApp Inquiry:</span>
                    <strong className="text-emerald-400 font-semibold">{settings.displayWhatsappNumber}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brands Bar */}
      <section className="bg-slate-50 border-b border-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Verified Brands Handled
            </span>
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm font-bold text-slate-600 tracking-wider">
              <span className="hover:text-[#14213d] transition-colors">LG</span>
              <span className="hover:text-[#14213d] transition-colors">INNOVEX</span>
              <span className="hover:text-[#14213d] transition-colors">MITSU</span>
              <span className="hover:text-[#14213d] transition-colors">TOMAHAWK</span>
              <span className="hover:text-[#14213d] transition-colors">DAMRO FRESTRA</span>
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Category Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-10">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#14213d] tracking-wider uppercase mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Showroom Departments</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
                Shop by Product Category
              </h2>
            </div>

            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#14213d] hover:text-[#24375a] transition-colors"
            >
              <span>Explore All ({allProducts.length})</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat) => {
              const count = allProducts.filter((p) => p.categorySlug === cat.slug).length;
              return <CategoryCard key={cat.id} category={cat} productCount={count} />;
            })}
          </div>
        </div>
      </section>

      {/* Desktop Featured Products Section */}
      <section className="hidden md:block py-16 sm:py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 mb-6 sm:mb-8">
            <div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">
                Popular Picks
              </h2>
              <p className="text-xs text-slate-500 mt-0.5 hidden sm:block">
                Verified showroom inventory with manufacturer warranty & fast WhatsApp quotes.
              </p>
            </div>

            <Link
              href="/products"
              className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-[#14213d] hover:text-[#24375a] transition-colors"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {featuredProducts.slice(0, 8).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                whatsappNumber={settings.whatsappNumber}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Oakory Style 3-Column Trust Bar */}
      <section className="py-6 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-slate-100 p-4 sm:p-6 shadow-xs grid grid-cols-3 gap-2 text-center">
            <div className="flex flex-col items-center justify-center p-1 sm:p-2">
              <ShieldCheck className="w-5 h-5 text-slate-800 mb-1" />
              <span className="text-[11px] sm:text-xs font-bold text-slate-900 leading-tight">Premium Quality</span>
              <span className="text-[9px] sm:text-[10px] text-slate-400">Crafted to last</span>
            </div>

            <div className="flex flex-col items-center justify-center p-1 sm:p-2 border-x border-slate-100">
              <Truck className="w-5 h-5 text-slate-800 mb-1" />
              <span className="text-[11px] sm:text-xs font-bold text-slate-900 leading-tight">Safe Delivery</span>
              <span className="text-[9px] sm:text-[10px] text-slate-400">Panadura & Islandwide</span>
            </div>

            <div className="flex flex-col items-center justify-center p-1 sm:p-2">
              <MessageSquare className="w-5 h-5 text-emerald-600 mb-1" />
              <span className="text-[11px] sm:text-xs font-bold text-slate-900 leading-tight">WhatsApp Quote</span>
              <span className="text-[9px] sm:text-[10px] text-slate-400">Fast Showroom Reply</span>
            </div>
          </div>
        </div>
      </section>

      {/* How WhatsApp Inquiries Work */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-[#128c4a] px-3 py-1 bg-emerald-50 rounded-full border border-emerald-100">
              Effortless Customer Support
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mt-3">
              How WhatsApp Inquiries Work
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              No registration or complex checkout needed. Connect directly with our Panadura team.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#14213d] text-white flex items-center justify-center font-bold text-lg mb-4">
                1
              </div>
              <h3 className="font-serif font-bold text-base text-slate-900 mb-2">
                Browse & Choose Product
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Explore our catalog of refrigerators, ovens, TVs, bikes, or mattresses and pick your preferred size or variant.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#128c4a] text-white flex items-center justify-center font-bold text-lg mb-4">
                2
              </div>
              <h3 className="font-serif font-bold text-base text-slate-900 mb-2">
                Tap &ldquo;Inquire on WhatsApp&rdquo;
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                A pre-filled inquiry with product code, image link, and questions opens instantly in your WhatsApp app or web.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#14213d] text-white flex items-center justify-center font-bold text-lg mb-4">
                3
              </div>
              <h3 className="font-serif font-bold text-base text-slate-900 mb-2">
                Receive Current Price & Delivery
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our sales staff confirms today&apos;s lowest price, delivery options to your area, or showroom collection times.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Showroom & Location CTA Section */}
      <section className="bg-slate-100 py-16 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#14213d] text-white rounded-3xl p-8 sm:p-12 lg:p-16 shadow-xl relative overflow-hidden">
            <div className="relative z-10 max-w-2xl space-y-4">
              <span className="text-xs font-bold tracking-widest uppercase text-emerald-400">
                Visit Our Showroom
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight">
                Priyantha Trading Agencies (PVT) LTD
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Located conveniently on the Galle Road in Panadura. Come inspect our appliances,
                test bicycle models in person, or get immediate quotes from our experienced team.
              </p>

              <div className="space-y-2 pt-2 text-sm text-slate-200">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{settings.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Telephone: {settings.telephone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{settings.operatingHours}</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <a
                  href={`https://wa.me/${settings.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#128c4a] hover:bg-[#0e703b] text-white font-bold text-sm shadow-md transition-all active:scale-95"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  <span>Chat on WhatsApp ({settings.displayWhatsappNumber})</span>
                </a>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/20 font-bold text-sm transition-all"
                >
                  <span>Showroom Directions</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
