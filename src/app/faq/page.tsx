import Link from 'next/link';
import { MessageSquare, ArrowRight, HelpCircle } from 'lucide-react';
import { getBusinessSettings } from '@/lib/db';

export const metadata = {
  title: 'FAQ & Store Guidance | Priyantha Trading Agencies (PVT) LTD',
  description:
    'Frequently asked questions regarding product inquiries, WhatsApp orders, warranty, and showroom collection at Priyantha Trading Agencies in Panadura.',
};

export default function FAQPage() {
  const settings = getBusinessSettings();

  const faqs = [
    {
      q: 'How do I inquire about current prices or availability?',
      a: 'Browse our product catalogue and click the "Inquire on WhatsApp" button on any item. This opens a pre-composed inquiry with the exact product code and link directly into our WhatsApp chat (072 245 1812), where our team gives you the current showroom price and stock status.',
    },
    {
      q: 'Why do most products show "Ask for Price" instead of fixed prices?',
      a: 'Prices on imported appliances, televisions, and electronics in Sri Lanka can fluctuate based on distributor promotions, seasonal discounts, and supplier revisions. Asking via WhatsApp ensures you receive the most accurate, up-to-date quote with any active in-store discounts applied.',
    },
    {
      q: 'Where is your physical showroom located?',
      a: 'Our showroom is situated at No: 388A Galle Road, Panadura, Sri Lanka. You are welcome to visit during business hours to inspect products, view bicycle sizes, or arrange direct collection.',
    },
    {
      q: 'Do your appliances come with genuine warranty?',
      a: 'Yes. All branded appliances (including LG, Innovex, Mitsu, and Damro) include their respective official manufacturer/distributor warranties (such as 10-year compressor warranties on inverter refrigerators or 1-year comprehensive coverage on electric ovens).',
    },
    {
      q: 'Can I arrange delivery to my home?',
      a: 'Yes. Delivery options and charges are confirmed directly over WhatsApp depending on your location in Panadura, Kalutara district, Colombo suburbs, or islandwide.',
    },
    {
      q: 'What payment methods are accepted?',
      a: 'We accept in-showroom cash and card payments, as well as direct bank transfers for remote orders arranged via WhatsApp prior to dispatch.',
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#14213d] bg-slate-200/80 px-3 py-1 rounded-full mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Store Help &amp; Policies</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-3 max-w-xl mx-auto">
            Clear, honest answers regarding our products, WhatsApp ordering, and Panadura showroom operations.
          </p>
        </div>

        <div className="space-y-4 mb-12">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs hover:border-[#14213d]/30 transition-all"
            >
              <h3 className="font-serif text-base sm:text-lg font-bold text-slate-900 mb-2">
                {faq.q}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>

        {/* Still have questions */}
        <div className="bg-[#14213d] text-white rounded-3xl p-8 text-center space-y-4">
          <h2 className="font-serif text-2xl font-bold">Have another question?</h2>
          <p className="text-sm text-slate-300 max-w-md mx-auto">
            Our Panadura sales desk is ready to answer any questions about appliances, specifications, or payments.
          </p>
          <div className="pt-2">
            <a
              href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
                'Hello Priyantha Trading Agencies! I have a question not listed in the FAQ.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#128c4a] hover:bg-[#0e703b] text-white font-bold text-sm shadow-md transition-all active:scale-95"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Ask on WhatsApp ({settings.displayWhatsappNumber})</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
