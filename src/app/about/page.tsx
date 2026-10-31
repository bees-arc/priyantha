import Link from 'next/link';
import { MapPin, Phone, MessageSquare, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { getBusinessSettings } from '@/lib/db';

export const metadata = {
  title: 'About Us | Priyantha Trading Agencies (PVT) LTD Panadura',
  description:
    'Learn about Priyantha Trading Agencies (PVT) LTD, an established trading retailer located on Galle Road, Panadura, Sri Lanka.',
};

export default function AboutPage() {
  const settings = getBusinessSettings();

  return (
    <div className="bg-slate-50 min-h-screen py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#14213d] bg-slate-200/80 px-3 py-1 rounded-full">
            Panadura Trading Establishment
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight mt-3">
            Priyantha Trading Agencies (PVT) LTD
          </h1>
          <p className="text-base sm:text-lg text-slate-600 mt-3 max-w-2xl mx-auto">
            A trusted neighbourhood destination for home appliances, electronics, bicycles, and bedding on the Galle Road in Panadura.
          </p>
        </div>

        {/* Showroom Story Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 mb-8 shadow-xs space-y-6">
          <h2 className="font-serif text-2xl font-bold text-slate-900">
            Our Business & Showroom
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Priyantha Trading Agencies (PVT) LTD operates as an established trading firm and retail showroom in Panadura, Sri Lanka. Located at <strong>No: 388A Galle Road</strong>, we supply households and local buyers with essential appliances, televisions, bicycles, and bedroom furniture.
          </p>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Rather than operating as a distant online drop-shipper, we are a physically verifiable Sri Lankan business with real in-store stock, authentic manufacturer warranties, and direct personalized communication via WhatsApp and direct telephone.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-sm text-slate-900 block">Verified Commercial Brands</strong>
                <span className="text-xs text-slate-500">
                  Products backed by genuine distributor guarantees including LG, Innovex, Mitsu, and Tomahawk.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
              <MapPin className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-sm text-slate-900 block">Panadura Showroom Access</strong>
                <span className="text-xs text-slate-500">
                  Customers can visit our physical floor on Galle Road to inspect items or arrange prompt delivery.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Departments We Specialize In */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 mb-8 shadow-xs space-y-6">
          <h2 className="font-serif text-2xl font-bold text-slate-900">
            What We Specialize In
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-700">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#128c4a] shrink-0" />
              <span>Inverter & Smart Refrigerators (LG, Innovex)</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#128c4a] shrink-0" />
              <span>Mitsu Electric Baking & Benchtop Ovens</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#128c4a] shrink-0" />
              <span>HD LED & Smart Televisions</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#128c4a] shrink-0" />
              <span>Tomahawk Mountain & City Bicycles (24&quot; &amp; 26&quot;)</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#128c4a] shrink-0" />
              <span>Spring &amp; Foam Mattresses in All Standard Sizes</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#128c4a] shrink-0" />
              <span>Gas Cookers &amp; Kitchen Appliances</span>
            </div>
          </div>
        </div>

        {/* Contact Callout */}
        <div className="bg-[#14213d] text-white rounded-3xl p-8 sm:p-10 shadow-lg text-center space-y-4">
          <h2 className="font-serif text-2xl font-bold">
            Connect With Our Team
          </h2>
          <p className="text-sm text-slate-300 max-w-lg mx-auto">
            Have questions about a specific model, current retail discount, or delivery to your area? Send us a message on WhatsApp.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <a
              href={`https://wa.me/${settings.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#128c4a] hover:bg-[#0e703b] text-white font-bold text-sm transition-all"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Inquire on WhatsApp ({settings.displayWhatsappNumber})</span>
            </a>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm border border-white/20 transition-all"
            >
              <span>Showroom Directions</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
