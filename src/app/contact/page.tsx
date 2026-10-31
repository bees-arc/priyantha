import { MapPin, Phone, MessageSquare, Mail, Clock, ExternalLink } from 'lucide-react';
import { getBusinessSettings } from '@/lib/db';

export const metadata = {
  title: 'Contact Showroom | Priyantha Trading Agencies (PVT) LTD Panadura',
  description:
    'Find showroom address, WhatsApp customer inquiry line, phone numbers, and location details for Priyantha Trading Agencies in Panadura.',
};

export default function ContactPage() {
  const settings = getBusinessSettings();

  return (
    <div className="bg-slate-50 min-h-screen py-12 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#14213d] bg-slate-200/80 px-3 py-1 rounded-full">
            Showroom &amp; Customer Support
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight mt-3">
            Contact Priyantha Trading Agencies
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-3 max-w-xl mx-auto">
            Get in touch directly with our Panadura showroom team for product availability, today&apos;s prices, and delivery inquiries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* WhatsApp Direct Card (Primary channel) */}
          <div className="bg-white rounded-3xl border-2 border-emerald-500/30 p-8 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#128c4a] flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6 fill-current" />
              </div>
              <span className="text-xs font-bold text-[#128c4a] uppercase tracking-wider">
                Fastest Response
              </span>
              <h2 className="font-serif text-2xl font-bold text-slate-900 mt-1 mb-2">
                WhatsApp Customer Desk
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Chat directly with our showroom sales desk. Ask for photos of floor units, verify current stock, or request delivery quotes.
              </p>
              <div className="text-lg font-bold text-[#128c4a] mb-6">
                +94 72 245 1812 ({settings.displayWhatsappNumber})
              </div>
            </div>

            <a
              href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
                'Hello Priyantha Trading Agencies! I have an inquiry regarding products in your Panadura showroom.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-[#128c4a] hover:bg-[#0e703b] text-white font-bold text-sm transition-all shadow-md active:scale-95"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Open WhatsApp Chat</span>
              <ExternalLink className="w-4 h-4 opacity-75" />
            </a>
          </div>

          {/* Showroom Contact Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xs space-y-6">
            <h2 className="font-serif text-2xl font-bold text-slate-900">
              Showroom Location &amp; Hours
            </h2>

            <div className="space-y-4 text-sm text-slate-700">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#14213d] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 font-semibold">Address</strong>
                  <span className="text-slate-600">{settings.address}</span>
                  <span className="block text-xs text-slate-400 mt-0.5">Located along Galle Road (A2) in Panadura town</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#14213d] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 font-semibold">Telephone</strong>
                  <a href={`tel:${settings.telephone.replace(/\s+/g, '')}`} className="text-[#14213d] font-bold hover:underline">
                    {settings.telephone}
                  </a>
                  {settings.landline && (
                    <div className="text-xs text-slate-500 mt-0.5">
                      Landline: {settings.landline}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#14213d] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 font-semibold">Email</strong>
                  <a href={`mailto:${settings.email}`} className="text-slate-600 hover:text-[#14213d]">
                    {settings.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#14213d] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 font-semibold">Operating Hours</strong>
                  <span className="text-slate-600">{settings.operatingHours}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Location Directions Guidance */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-xs">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 mb-4">
            Visiting the Panadura Showroom
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed mb-6">
            Priyantha Trading Agencies (PVT) LTD is situated on the Galle Road in Panadura, easily accessible by public bus, vehicle, or local three-wheelers.
          </p>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <strong className="text-slate-800 block text-sm">Need directions while on the road?</strong>
              <span>Give us a call or send a WhatsApp live location request before heading out.</span>
            </div>
            <a
              href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
                'Hello! Could you please share the Google Maps pin for your Panadura showroom?'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-[#14213d] text-white font-semibold text-xs shrink-0 hover:bg-[#24375a] transition-colors"
            >
              Request Map Pin on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
