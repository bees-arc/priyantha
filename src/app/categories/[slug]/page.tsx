import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getCategoryBySlug, getCategories, getProducts, getBusinessSettings } from '@/lib/db';
import { ProductCard } from '@/components/ProductCard';
import { MessageSquare, ArrowLeft } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ sub?: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return { title: 'Category Not Found' };
  }

  return {
    title: `${category.name} | Priyantha Trading Agencies Panadura`,
    description: category.description,
  };
}

export default async function CategoryDetailPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { sub } = await searchParams;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const settings = getBusinessSettings();
  let products = getProducts({
    categorySlug: category.slug,
    status: 'published',
  });

  if (sub) {
    products = products.filter((p) => p.subcategoryId === sub || p.subcategoryName?.toLowerCase() === sub.toLowerCase());
  }

  return (
    <div className="bg-slate-50 min-h-screen py-4 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile Oakory-Style Screen 2 Header */}
        <div className="sm:hidden mb-4 pt-1">
          <div className="flex items-center gap-3 mb-3">
            <Link
              href="/"
              className="w-10 h-10 rounded-full bg-white border border-slate-200/90 flex items-center justify-center text-slate-700 active:scale-95 transition-transform shadow-xs shrink-0"
              aria-label="Back to home"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="min-w-0">
              <h1 className="text-xl font-bold text-slate-900 leading-tight truncate">
                {category.name}
              </h1>
              <p className="text-xs text-slate-500">
                {products.length} verified models in Panadura showroom
              </p>
            </div>
          </div>

          {/* Mobile Subcategories Filter Tabs */}
          {category.subcategories && category.subcategories.length > 0 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 text-xs font-semibold scrollbar-none">
              <Link
                href={`/categories/${category.slug}`}
                className={`px-4 py-2 rounded-full shrink-0 transition-colors ${
                  !sub
                    ? 'bg-[#14213d] text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200/80 hover:bg-slate-50'
                }`}
              >
                All {category.name}
              </Link>
              {category.subcategories.map((sc) => {
                const isActive = sub === sc.id || sub?.toLowerCase() === sc.name.toLowerCase();
                return (
                  <Link
                    key={sc.id}
                    href={`/categories/${category.slug}?sub=${encodeURIComponent(sc.id)}`}
                    className={`px-4 py-2 rounded-full shrink-0 transition-colors ${
                      isActive
                        ? 'bg-[#14213d] text-white shadow-xs'
                        : 'bg-white text-slate-700 border border-slate-200/80 hover:bg-slate-50'
                    }`}
                  >
                    {sc.name}
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Desktop Breadcrumb */}
        <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-slate-500 mb-6">
          <Link href="/" className="hover:text-[#14213d]">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-[#14213d]">Products</Link>
          <span>/</span>
          <span className="text-[#14213d] font-semibold">{category.name}</span>
        </div>

        {/* Category Header Card (Desktop only) */}
        <div className="hidden sm:block bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 mb-8 shadow-xs">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <span className="text-xs font-bold text-[#14213d] tracking-widest uppercase">
                Department
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 mt-1">
                {category.name}
              </h1>
              <p className="text-sm text-slate-600 mt-2 max-w-2xl leading-relaxed">
                {category.description}
              </p>
            </div>

            <a
              href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
                `Hello Priyantha Trading Agencies! I'm inquiring about items in your ${category.name} section.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#128c4a] text-white text-xs font-bold shadow-xs hover:bg-[#0e703b] transition-all"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Inquire about {category.name}</span>
            </a>
          </div>

          {/* Subcategories Filter Tabs */}
          {category.subcategories && category.subcategories.length > 0 && (
            <div className="flex items-center gap-2 mt-8 pt-6 border-t border-slate-100 overflow-x-auto pb-1 text-xs">
              <Link
                href={`/categories/${category.slug}`}
                className={`px-3.5 py-2 rounded-lg font-semibold transition-colors shrink-0 ${
                  !sub ? 'bg-[#14213d] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                All {category.name}
              </Link>
              {category.subcategories.map((sc) => (
                <Link
                  key={sc.id}
                  href={`/categories/${category.slug}?sub=${sc.id}`}
                  className={`px-3.5 py-2 rounded-lg font-semibold transition-colors shrink-0 ${
                    sub === sc.id
                      ? 'bg-[#14213d] text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {sc.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Product Grid */}
        <div className="mb-6 flex items-center justify-between text-xs text-slate-500 font-medium">
          <span>Showing {products.length} products</span>
          <Link href="/products" className="text-[#14213d] font-bold hover:underline flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Departments</span>
          </Link>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                whatsappNumber={settings.whatsappNumber}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto space-y-4">
            <h3 className="font-serif font-bold text-lg text-slate-800">
              No products found in this subcategory
            </h3>
            <p className="text-xs text-slate-500">
              Please check back soon or send us a WhatsApp message to ask about incoming stock.
            </p>
            <Link
              href={`/categories/${category.slug}`}
              className="inline-flex px-4 py-2 rounded-xl bg-[#14213d] text-white text-xs font-semibold"
            >
              View all {category.name}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
