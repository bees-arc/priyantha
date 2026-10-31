'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Settings, Save, ArrowLeft, Check, MessageSquare, MapPin } from 'lucide-react';
import { BusinessSettings } from '@/types';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<BusinessSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings');
      const data = await res.json();
      setSettings(data);
    } catch (err) {
      console.error('Error fetching settings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      const updated = await res.json();
      setSettings(updated);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error('Error saving settings:', err);
    }
  };

  if (loading || !settings) {
    return (
      <div className="bg-slate-50 min-h-screen py-12 text-center text-xs text-slate-400">
        Loading settings...
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <Link href="/admin" className="hover:text-[#14213d] flex items-center gap-1">
              <ArrowLeft className="w-3 h-3" />
              <span>Admin Dashboard</span>
            </Link>
            <span>/</span>
            <span className="font-semibold text-slate-700">Settings</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-slate-900">
            Showroom &amp; WhatsApp Settings
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure official business contact coordinates and the live WhatsApp customer connection.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xs space-y-6 text-xs">
          {saved && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-2 font-bold animate-in fade-in">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Settings updated successfully! Changes are live across the store.</span>
            </div>
          )}

          {/* Section: WhatsApp Settings */}
          <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-4">
            <div className="flex items-center gap-2 font-bold text-sm text-[#128c4a]">
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>WhatsApp Product Inquiry Configuration</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">
                  WhatsApp Number (International Digits Only) *
                </label>
                <input
                  type="text"
                  required
                  value={settings.whatsappNumber}
                  onChange={(e) =>
                    setSettings({ ...settings, whatsappNumber: e.target.value.replace(/\D/g, '') })
                  }
                  placeholder="e.g. 94722451812"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white font-mono text-sm"
                />
                <span className="text-[10px] text-slate-500 block mt-1">
                  Target for `wa.me/{settings.whatsappNumber}` without +, spaces or leading zero.
                </span>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">
                  Display WhatsApp Number (For Website Text) *
                </label>
                <input
                  type="text"
                  required
                  value={settings.displayWhatsappNumber}
                  onChange={(e) =>
                    setSettings({ ...settings, displayWhatsappNumber: e.target.value })
                  }
                  placeholder="e.g. 072 245 1812"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-sm"
                />
              </div>
            </div>
          </div>

          {/* Section: General Business Info */}
          <div className="space-y-4 pt-2">
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">
                Official Business Name
              </label>
              <input
                type="text"
                required
                value={settings.businessName}
                onChange={(e) => setSettings({ ...settings, businessName: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">
                  Showroom Mobile Phone
                </label>
                <input
                  type="text"
                  value={settings.telephone}
                  onChange={(e) => setSettings({ ...settings, telephone: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">
                  Showroom Landline (Directory Listed)
                </label>
                <input
                  type="text"
                  value={settings.landline || ''}
                  onChange={(e) => setSettings({ ...settings, landline: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">
                  Official Email
                </label>
                <input
                  type="email"
                  value={settings.email}
                  onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">
                  Operating Hours
                </label>
                <input
                  type="text"
                  value={settings.operatingHours}
                  onChange={(e) => setSettings({ ...settings, operatingHours: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">
                Verified Panadura Showroom Address
              </label>
              <input
                type="text"
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">
                Top Announcement Bar Text
              </label>
              <input
                type="text"
                value={settings.announcementBar?.text || ''}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    announcementBar: { ...settings.announcementBar, text: e.target.value },
                  })
                }
                className="w-full px-3 py-2 rounded-xl border border-slate-200"
              />
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#14213d] text-white font-bold text-xs hover:bg-[#24375a] shadow-xs transition-all active:scale-95"
            >
              <Save className="w-4 h-4" />
              <span>Save Configuration</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
