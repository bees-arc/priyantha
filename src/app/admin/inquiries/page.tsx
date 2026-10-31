'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { MessageSquare, ArrowLeft, Clock, Smartphone, Monitor, Info } from 'lucide-react';
import { InquiryEvent } from '@/types';

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<InquiryEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const res = await fetch('/api/inquiries');
      const data = await res.json();
      setInquiries(data);
    } catch (err) {
      console.error('Error fetching inquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  // Group by product
  const productFrequency: Record<string, { name: string; count: number; sku: string }> = {};
  inquiries.forEach((item) => {
    if (!productFrequency[item.productId]) {
      productFrequency[item.productId] = {
        name: item.productName,
        sku: item.productSku,
        count: 0,
      };
    }
    productFrequency[item.productId].count += 1;
  });

  const sortedTopProducts = Object.values(productFrequency).sort((a, b) => b.count - a.count);

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <Link href="/admin" className="hover:text-[#14213d] flex items-center gap-1">
              <ArrowLeft className="w-3 h-3" />
              <span>Admin Dashboard</span>
            </Link>
            <span>/</span>
            <span className="font-semibold text-slate-700">WhatsApp Analytics</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-slate-900">
            WhatsApp Inquiry Event Tracker
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Logs of customer interactions initiating WhatsApp inquiries.
          </p>
        </div>

        {/* Analytic Disclaimer Banner */}
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-800 flex items-start gap-3 mb-8 shadow-xs">
          <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p>
            <strong>Measurement Note:</strong> Events recorded here track customer clicks on &ldquo;Inquire on WhatsApp&rdquo; buttons across the website. These represent interest triggers and lead intent, not confirmed WhatsApp messages delivered or final retail transactions.
          </p>
        </div>

        {/* Top Inquired Products summary */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-8 shadow-xs">
          <h2 className="font-serif text-lg font-bold text-slate-900 mb-4">
            Most Inquired Products
          </h2>

          {sortedTopProducts.length === 0 ? (
            <p className="text-xs text-slate-400">No inquiry clicks recorded yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {sortedTopProducts.slice(0, 4).map((p, i) => (
                <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Rank #{i + 1}</span>
                    <h3 className="font-serif text-xs font-bold text-slate-800 line-clamp-2 mt-1">{p.name}</h3>
                    <span className="text-[10px] text-slate-400 font-mono">SKU: {p.sku}</span>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-[#128c4a]">
                    <span>{p.count} inquiry taps</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Event Logs Table */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-serif text-base font-bold text-slate-900">
              Recent Inquiry Log ({inquiries.length})
            </h2>
            <button
              onClick={fetchInquiries}
              className="text-xs text-[#14213d] font-bold hover:underline"
            >
              Refresh
            </button>
          </div>

          {loading ? (
            <div className="p-12 text-center text-xs text-slate-400">Loading events...</div>
          ) : inquiries.length === 0 ? (
            <div className="p-12 text-center text-xs text-slate-500">
              No WhatsApp clicks logged yet. When customers click inquiry buttons, events will appear here in real-time.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold tracking-wider">
                    <th className="py-3 px-4">Timestamp</th>
                    <th className="py-3 px-4">Product Name</th>
                    <th className="py-3 px-4">SKU</th>
                    <th className="py-3 px-4">Variant / Qty</th>
                    <th className="py-3 px-4">Device</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {inquiries.map((inq) => (
                    <tr key={inq.id} className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 text-slate-500 flex items-center gap-1.5 font-mono text-[11px]">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{new Date(inq.createdAt).toLocaleString()}</span>
                      </td>
                      <td className="py-3 px-4 font-bold text-slate-800">
                        {inq.productName}
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-500">
                        {inq.productSku || '—'}
                      </td>
                      <td className="py-3 px-4 text-slate-600">
                        {inq.variant ? `${inq.variant} • ` : ''}Qty: {inq.quantity}
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center gap-1 text-[11px] text-slate-500 capitalize">
                          {inq.deviceType === 'mobile' ? (
                            <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Monitor className="w-3.5 h-3.5 text-slate-400" />
                          )}
                          <span>{inq.deviceType || 'desktop'}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
