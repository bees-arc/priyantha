'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Package,
  Plus,
  Trash2,
  Edit,
  CheckCircle,
  Eye,
  EyeOff,
  Search,
  ArrowLeft,
  X,
  Upload,
  ShieldCheck,
} from 'lucide-react';
import { Product, Category } from '@/types';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');

  // Form modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form fields
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [price, setPrice] = useState<string>('');
  const [priceVisibility, setPriceVisibility] = useState<'visible' | 'ask_for_price'>('ask_for_price');
  const [status, setStatus] = useState<Product['status']>('published');
  const [featured, setFeatured] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [specName, setSpecName] = useState('');
  const [specValue, setSpecValue] = useState('');
  const [specsList, setSpecsList] = useState<{ id: string; name: string; value: string }[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [resProd, resCat] = await Promise.all([
        fetch('/api/products?status=all'),
        fetch('/api/categories?all=true'),
      ]);
      const prods = await resProd.json();
      const cats = await resCat.json();
      setProducts(prods);
      setCategories(cats);
      if (cats.length > 0 && !categoryId) {
        setCategoryId(cats[0].id);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenNew = () => {
    setEditingProduct(null);
    setName('');
    setSku(`PTA-${Math.random().toString(36).substring(2, 6).toUpperCase()}`);
    setDescription('');
    setCategoryId(categories[0]?.id || '');
    setBrand('');
    setModel('');
    setPrice('');
    setPriceVisibility('ask_for_price');
    setStatus('published');
    setFeatured(false);
    setImageUrl('');
    setSpecsList([]);
    setModalOpen(true);
  };

  const handleOpenEdit = (p: Product) => {
    setEditingProduct(p);
    setName(p.name);
    setSku(p.sku);
    setDescription(p.description || '');
    setCategoryId(p.categoryId);
    setBrand(p.brand || '');
    setModel(p.model || '');
    setPrice(p.price ? String(p.price) : '');
    setPriceVisibility(p.priceVisibility);
    setStatus(p.status);
    setFeatured(p.featured);
    setImageUrl(p.images?.[0]?.url || '');
    setSpecsList(p.specifications || []);
    setModalOpen(true);
  };

  const handleAddSpec = () => {
    if (specName.trim() && specValue.trim()) {
      setSpecsList([
        ...specsList,
        { id: `spec-${Date.now()}`, name: specName.trim(), value: specValue.trim() },
      ]);
      setSpecName('');
      setSpecValue('');
    }
  };

  const handleRemoveSpec = (id: string) => {
    setSpecsList(specsList.filter((s) => s.id !== id));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const selectedCategory = categories.find((c) => c.id === categoryId) || categories[0];
    const productPayload = {
      name: name.trim(),
      sku: sku.trim(),
      description: description.trim(),
      categoryId: selectedCategory?.id,
      categorySlug: selectedCategory?.slug,
      categoryName: selectedCategory?.name,
      brand: brand.trim() || undefined,
      model: model.trim() || undefined,
      price: price ? Number(price) : undefined,
      priceVisibility,
      status,
      featured,
      images: imageUrl
        ? [{ id: 'img-1', url: imageUrl.trim(), alt: name.trim(), isPrimary: true }]
        : editingProduct?.images || [],
      specifications: specsList,
    };

    try {
      if (editingProduct) {
        // PUT
        await fetch(`/api/products/${editingProduct.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productPayload),
        });
      } else {
        // POST
        await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productPayload),
        });
      }
      setModalOpen(false);
      fetchData();
    } catch (err) {
      console.error('Error saving product:', err);
    }
  };

  const handleToggleStatus = async (p: Product) => {
    const newStatus = p.status === 'published' ? 'draft' : 'published';
    try {
      await fetch(`/api/products/${p.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      fetchData();
    } catch (err) {
      console.error('Error toggling status:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to remove this product from the inventory?')) {
      try {
        await fetch(`/api/products/${id}`, { method: 'DELETE' });
        fetchData();
      } catch (err) {
        console.error('Error deleting product:', err);
      }
    }
  };

  const filtered = products.filter((p) => {
    if (statusFilter !== 'all' && p.status !== statusFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.brand?.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <Link href="/admin" className="hover:text-[#14213d] flex items-center gap-1">
                <ArrowLeft className="w-3 h-3" />
                <span>Admin Dashboard</span>
              </Link>
              <span>/</span>
              <span className="font-semibold text-slate-700">Products</span>
            </div>
            <h1 className="font-serif text-3xl font-bold text-slate-900">
              Product Catalogue Manager
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Manage live showroom inventory, draft imported items, and set WhatsApp inquiry pricing.
            </p>
          </div>

          <button
            onClick={handleOpenNew}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#14213d] text-white text-xs font-bold shadow-xs hover:bg-[#24375a] transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </button>
        </div>

        {/* Filter / Search Bar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, SKU, brand..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-hidden focus:border-[#14213d]"
            />
            <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs text-slate-400 font-semibold">Filter:</span>
            {(['all', 'published', 'draft'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
                  statusFilter === st
                    ? 'bg-[#14213d] text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          {loading ? (
            <div className="p-12 text-center text-xs text-slate-400">Loading products...</div>
          ) : filtered.length === 0 ? (
            <div className="p-12 text-center text-xs text-slate-500">
              No products found matching filters.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                    <th className="py-3.5 px-4">Item</th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-4">Brand / Model</th>
                    <th className="py-3.5 px-4">Price Setting</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filtered.map((product) => (
                    <tr key={product.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-slate-100 overflow-hidden relative shrink-0">
                            <img
                              src={product.images?.[0]?.url || '/images/products/lg-refrigerator.jpg'}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <Link
                              href={`/products/${product.slug}`}
                              target="_blank"
                              className="font-bold text-slate-800 hover:text-[#14213d] line-clamp-1"
                            >
                              {product.name}
                            </Link>
                            <span className="text-[11px] text-slate-400 font-mono">
                              SKU: {product.sku}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-slate-600 font-medium">
                        {product.categoryName}
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="font-bold text-slate-700">{product.brand || '—'}</span>
                        {product.model && (
                          <span className="text-[10px] text-slate-400 block">{product.model}</span>
                        )}
                      </td>

                      <td className="py-3.5 px-4">
                        {product.priceVisibility === 'visible' && product.price ? (
                          <span className="font-bold text-[#14213d]">
                            Rs. {product.price.toLocaleString('en-LK')}
                          </span>
                        ) : (
                          <span className="text-amber-700 font-semibold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                            Ask for Price
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => handleToggleStatus(product)}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase transition-colors ${
                            product.status === 'published'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                              : 'bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200'
                          }`}
                          title="Click to toggle publish status"
                        >
                          {product.status === 'published' ? (
                            <>
                              <Eye className="w-3 h-3" />
                              <span>Published</span>
                            </>
                          ) : (
                            <>
                              <EyeOff className="w-3 h-3" />
                              <span>Draft</span>
                            </>
                          )}
                        </button>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenEdit(product)}
                            className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-[#14213d]"
                            title="Edit Product"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50"
                            title="Delete Product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Edit / Create Modal */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl my-8 relative">
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="font-serif text-2xl font-bold text-slate-900 mb-1">
                {editingProduct ? 'Edit Product' : 'Add New Showroom Product'}
              </h2>
              <p className="text-xs text-slate-500 mb-6">
                All details update live in the product catalogue and WhatsApp inquiry system.
              </p>

              <form onSubmit={handleSave} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. LG 260L Smart Inverter Double Door Refrigerator"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#14213d]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 uppercase mb-1">
                      SKU Code *
                    </label>
                    <input
                      type="text"
                      required
                      value={sku}
                      onChange={(e) => setSku(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#14213d] font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 uppercase mb-1">
                      Category *
                    </label>
                    <select
                      value={categoryId}
                      onChange={(e) => setCategoryId(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white focus:outline-hidden focus:border-[#14213d]"
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 uppercase mb-1">
                      Brand (e.g. LG, Innovex, Mitsu)
                    </label>
                    <input
                      type="text"
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 uppercase mb-1">
                      Model Number
                    </label>
                    <input
                      type="text"
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 uppercase mb-1">
                      Showroom Price (LKR)
                    </label>
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="Optional price"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 uppercase mb-1">
                      Price Visibility
                    </label>
                    <select
                      value={priceVisibility}
                      onChange={(e) => setPriceVisibility(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                    >
                      <option value="ask_for_price">Ask for Price (Recommended)</option>
                      <option value="visible">Visible Price</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://... photo link"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">
                    Product Description
                  </label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>

                {/* Status & Featured */}
                <div className="flex items-center gap-6 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-700">
                    <input
                      type="checkbox"
                      checked={status === 'published'}
                      onChange={(e) => setStatus(e.target.checked ? 'published' : 'draft')}
                      className="rounded text-[#14213d] focus:ring-[#14213d]"
                    />
                    <span>Publish to public catalogue</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-700">
                    <input
                      type="checkbox"
                      checked={featured}
                      onChange={(e) => setFeatured(e.target.checked)}
                      className="rounded text-[#14213d] focus:ring-[#14213d]"
                    />
                    <span>Show on Homepage</span>
                  </label>
                </div>

                {/* Specifications Builder */}
                <div className="pt-3 border-t border-slate-200">
                  <label className="block font-bold text-slate-700 uppercase mb-2">
                    Key Specifications
                  </label>

                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={specName}
                      onChange={(e) => setSpecName(e.target.value)}
                      placeholder="Spec Name (e.g. Capacity)"
                      className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200"
                    />
                    <input
                      type="text"
                      value={specValue}
                      onChange={(e) => setSpecValue(e.target.value)}
                      placeholder="Value (e.g. 260L)"
                      className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200"
                    />
                    <button
                      type="button"
                      onClick={handleAddSpec}
                      className="px-3 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 font-bold"
                    >
                      Add
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {specsList.map((s) => (
                      <span
                        key={s.id}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 text-slate-700"
                      >
                        <strong>{s.name}:</strong> {s.value}
                        <button
                          type="button"
                          onClick={() => handleRemoveSpec(s.id)}
                          className="hover:text-rose-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 flex justify-end gap-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-xl bg-[#14213d] text-white font-bold hover:bg-[#24375a]"
                  >
                    Save Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
