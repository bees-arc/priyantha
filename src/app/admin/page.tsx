import Link from 'next/link';
import {
  Package,
  Layers,
  MessageSquare,
  Settings,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  PlusCircle,
  ExternalLink,
} from 'lucide-react';
import { getProducts, getCategories, getInquiries, getBusinessSettings } from '@/lib/db';

export const metadata = {
  title: 'Admin Dashboard | Priyantha Trading Agencies',
};

export default function AdminDashboardPage() {
  const allProducts = getProducts({ status: 'all' });
  const publishedProducts = allProducts.filter((p) => p.status === 'published');
  const draftProducts = allProducts.filter((p) => p.status === 'draft');
  const categories = getCategories(true);
  const inquiries = getInquiries();
  const settings = getBusinessSettings();

  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-[#14213d] uppercase tracking-wider">
              Showroom Management
            </span>
            <h1 className="font-serif text-3xl font-bold text-slate-900 mt-0.5">
              Admin Portal
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Active WhatsApp: <strong className="text-emerald-600">+{settings.whatsappNumber}</strong> ({settings.displayWhatsappNumber})
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/products?action=new"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#14213d] text-white text-xs font-bold shadow-xs hover:bg-[#24375a] transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add New Product</span>
            </Link>

            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors shadow-xs"
            >
              <span>View Public Store</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-60" />
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Total Products
              </span>
              <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-[#14213d]">
                <Package className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-bold text-slate-900">{allProducts.length}</div>
            <div className="text-xs text-slate-500 mt-2 flex items-center gap-2">
              <span className="text-emerald-600 font-semibold">{publishedProducts.length} published</span>
              <span>•</span>
              <span className="text-amber-600 font-semibold">{draftProducts.length} drafts</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Categories
              </span>
              <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-[#14213d]">
                <Layers className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-bold text-slate-900">{categories.length}</div>
            <div className="text-xs text-slate-500 mt-2">
              Active departments in showroom
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                WhatsApp Clicks
              </span>
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#128c4a] flex items-center justify-center">
                <MessageSquare className="w-5 h-5 fill-current" />
              </div>
            </div>
            <div className="text-3xl font-bold text-[#128c4a]">{inquiries.length}</div>
            <div className="text-xs text-slate-500 mt-2">
              Customer inquiry button taps logged
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Verified Provenance
              </span>
              <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-[#14213d]">
                <ShieldCheck className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-bold text-slate-900">
              {allProducts.filter((p) => p.provenance?.verificationStatus === 'VERIFIED').length}
            </div>
            <div className="text-xs text-slate-500 mt-2">
              Items from official business materials
            </div>
          </div>
        </div>

        {/* Action Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Products card */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-lg font-bold text-slate-900">
                Recent Showroom Products
              </h2>
              <Link
                href="/admin/products"
                className="text-xs font-bold text-[#14213d] hover:underline flex items-center gap-1"
              >
                <span>Manage all ({allProducts.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="divide-y divide-slate-100">
              {allProducts.slice(0, 6).map((product) => (
                <div key={product.id} className="py-3 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 overflow-hidden relative shrink-0">
                      <img
                        src={product.images?.[0]?.url || `/api/placeholder?type=default&label=${encodeURIComponent(product.name)}&w=100`}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-slate-800 truncate">
                        {product.name}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {product.categoryName} • SKU: {product.sku}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                        product.status === 'published'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {product.status}
                    </span>

                    <Link
                      href={`/admin/products?edit=${product.id}`}
                      className="text-xs font-semibold text-[#14213d] hover:underline"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation & Shortcuts */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <h2 className="font-serif text-lg font-bold text-slate-900 mb-4">
                Management Modules
              </h2>

              <nav className="space-y-2">
                <Link
                  href="/admin/products"
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-700 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Package className="w-4 h-4 text-[#14213d]" />
                    <span>Product Catalogue Manager</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>

                <Link
                  href="/admin/categories"
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-700 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Layers className="w-4 h-4 text-[#14213d]" />
                    <span>Category &amp; Department Taxonomy</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>

                <Link
                  href="/admin/inquiries"
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-700 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <MessageSquare className="w-4 h-4 text-[#128c4a]" />
                    <span>WhatsApp Inquiry Event Log</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>

                <Link
                  href="/admin/settings"
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-700 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Settings className="w-4 h-4 text-[#14213d]" />
                    <span>WhatsApp &amp; Showroom Settings</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>
              </nav>
            </div>

            {/* Business Contact Quick Reference */}
            <div className="bg-[#14213d] text-white rounded-2xl p-6 shadow-xs space-y-3 text-xs">
              <h3 className="font-serif font-bold text-sm text-white">
                Live Configuration
              </h3>
              <div>
                <span className="text-slate-400 block">WhatsApp Number:</span>
                <strong className="text-emerald-400 font-mono text-sm">+{settings.whatsappNumber}</strong>
              </div>
              <div>
                <span className="text-slate-400 block">Showroom Telephone:</span>
                <strong className="text-white">{settings.telephone}</strong>
              </div>
              <div>
                <span className="text-slate-400 block">Panadura Address:</span>
                <span className="text-slate-300">{settings.address}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
