import Link from 'next/link';
import { Search, Filter, MessageSquare, ArrowUpDown } from 'lucide-react';
import { getBusinessSettings, getCategories, getProducts } from '@/lib/db';
import { ProductCard } from '@/components/ProductCard';

export const metadata = {
  title: 'Product Catalogue',
  description:
    'Browse the full product inventory of Priyantha Trading Agencies in Panadura. Refrigerators, ovens, televisions, bicycles, and mattresses.',
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{
    category?: string;
    brand?: string;
    search?: string;
    sort?: string;
  }>;
}) {
  const params = await searchParams;
  const settings = getBusinessSettings();
  const categories = getCategories();

  const products = getProducts({
    categorySlug: params.category,
    brand: params.brand,
    search: params.search,
    status: 'published',
  });

  // Extract unique brands for filter
  const allBrands = Array.from(
    new Set(getProducts({ status: 'all' }).map((p) => p.brand).filter(Boolean))
  ) as string[];

  // Sorting
  const sortedProducts = [...products].sort((a, b) => {
    if (params.sort === 'name') {
      return a.name.localeCompare(b.name);
    }
    return 0; // default order
  });

  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Breadcrumb & Title */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-2">
            <Link href="/" className="hover:text-[#14213d]">Home</Link>
            <span>/</span>
            <span className="text-[#14213d] font-semibold">Catalogue</span>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                Product Catalogue
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Showing {sortedProducts.length} verified products available for inquiry at Panadura showroom
              </p>
            </div>

            <a
              href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
                'Hello Priyantha Trading Agencies! I have a general question about products available at your showroom.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#128c4a] text-white text-xs font-bold shadow-xs hover:bg-[#0e703b] transition-all"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-current" />
              <span>General WhatsApp Inquiry</span>
            </a>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-8 shadow-xs space-y-4">
          {/* Search Form */}
          <form method="GET" action="/products" className="relative w-full">
            <input
              type="text"
              name="search"
              defaultValue={params.search || ''}
              placeholder="Search products by title, model, or SKU..."
              className="w-full pl-10 pr-24 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-hidden focus:bg-white focus:border-[#14213d] transition-colors"
            />
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <button
              type="submit"
              className="absolute right-2 top-1.5 px-4 py-1.5 rounded-lg bg-[#14213d] text-white text-xs font-bold hover:bg-[#24375a] transition-colors"
            >
              Search
            </button>
          </form>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 text-xs">
            <Link
              href="/products"
              className={`px-3.5 py-2 rounded-lg font-semibold shrink-0 transition-colors ${
                !params.category
                  ? 'bg-[#14213d] text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Categories
            </Link>

            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/products?category=${cat.slug}${params.brand ? `&brand=${params.brand}` : ''}`}
                className={`px-3.5 py-2 rounded-lg font-semibold shrink-0 transition-colors ${
                  params.category === cat.slug
                    ? 'bg-[#14213d] text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.name}
              </Link>
            ))}
          </div>

          {/* Brand & Sort filter pills */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-slate-400 font-semibold flex items-center gap-1">
                <Filter className="w-3 h-3" /> Brand:
              </span>
              <Link
                href={`/products${params.category ? `?category=${params.category}` : ''}`}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium ${
                  !params.brand ? 'bg-slate-200 text-slate-800' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                All
              </Link>
              {allBrands.map((b) => (
                <Link
                  key={b}
                  href={`/products?brand=${encodeURIComponent(b)}${params.category ? `&category=${params.category}` : ''}`}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium ${
                    params.brand?.toLowerCase() === b.toLowerCase()
                      ? 'bg-slate-200 text-slate-800 font-bold'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {b}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-3 h-3 text-slate-400" />
              <Link
                href={`/products?sort=name${params.category ? `&category=${params.category}` : ''}${params.brand ? `&brand=${params.brand}` : ''}`}
                className={`px-2.5 py-1 rounded-md text-[11px] ${
                  params.sort === 'name' ? 'bg-slate-200 text-slate-800 font-bold' : 'text-slate-500'
                }`}
              >
                Sort A-Z
              </Link>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {sortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                whatsappNumber={settings.whatsappNumber}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto space-y-4">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-slate-800">
              No matching products found
            </h3>
            <p className="text-xs text-slate-500">
              We couldn&apos;t find any item matching your query. Please reset filters or send us a quick WhatsApp inquiry.
            </p>
            <div className="pt-2">
              <Link
                href="/products"
                className="inline-flex px-4 py-2 rounded-xl bg-[#14213d] text-white text-xs font-semibold"
              >
                Clear all filters
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
