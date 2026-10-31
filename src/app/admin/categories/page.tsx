'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Layers, Plus, Trash2, ArrowLeft, X } from 'lucide-react';
import { Category } from '@/types';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [iconName, setIconName] = useState('ShoppingBag');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories?all=true');
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          description: description.trim(),
          iconName,
        }),
      });
      setName('');
      setDescription('');
      setModalOpen(false);
      fetchCategories();
    } catch (err) {
      console.error('Error saving category:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this category?')) {
      try {
        await fetch(`/api/categories/${id}`, { method: 'DELETE' });
        fetchCategories();
      } catch (err) {
        console.error('Error deleting category:', err);
      }
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <Link href="/admin" className="hover:text-[#14213d] flex items-center gap-1">
                <ArrowLeft className="w-3 h-3" />
                <span>Admin Dashboard</span>
              </Link>
              <span>/</span>
              <span className="font-semibold text-slate-700">Categories</span>
            </div>
            <h1 className="font-serif text-3xl font-bold text-slate-900">
              Department &amp; Category Taxonomy
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Organize showroom departments and public navigation categories.
            </p>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#14213d] text-white text-xs font-bold shadow-xs hover:bg-[#24375a] transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Create Department</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((cat) => (
            <div key={cat.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-slate-400">/{cat.slug}</span>
                  <button
                    onClick={() => handleDelete(cat.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <h3 className="font-serif text-lg font-bold text-slate-900">{cat.name}</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{cat.description}</p>

                {cat.subcategories && cat.subcategories.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap gap-1.5">
                    {cat.subcategories.map((sub) => (
                      <span
                        key={sub.slug}
                        className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md"
                      >
                        {sub.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center text-xs">
                <Link
                  href={`/categories/${cat.slug}`}
                  target="_blank"
                  className="text-[#14213d] font-bold hover:underline"
                >
                  View Public Category
                </Link>
              </div>
            </div>
          ))}
        </div>

        {modalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
              <h2 className="font-serif text-xl font-bold text-slate-900 mb-4">
                Add New Department
              </h2>
              <form onSubmit={handleCreate} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">
                    Department Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Kitchen Small Appliances"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">
                    Icon Theme
                  </label>
                  <select
                    value={iconName}
                    onChange={(e) => setIconName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="Refrigerator">Refrigerator / Large Appliance</option>
                    <option value="Tv">Television / Electronics</option>
                    <option value="Bike">Bicycle</option>
                    <option value="Bed">Bedding &amp; Mattress</option>
                    <option value="ShoppingBag">General Merchandise</option>
                  </select>
                </div>
                <div className="pt-4 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-slate-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#14213d] text-white font-bold"
                  >
                    Create
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
