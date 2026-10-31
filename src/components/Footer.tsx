import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, MessageSquare, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { BrandWordmark } from './BrandWordmark';

interface FooterProps {
  whatsappNumber?: string;
  displayWhatsappNumber?: string;
  telephone?: string;
  landline?: string;
  email?: string;
  address?: string;
}

export const Footer: React.FC<FooterProps> = ({
  whatsappNumber = '94722451812',
  displayWhatsappNumber = '072 245 1812',
  telephone = '077 797 4777',
  landline = '038 223 2754',
  email = 'priyanthatradingpip@gmail.com',
  address = 'No: 388A Galle Road, Panadura, Sri Lanka',
}) => {
  return (
    <footer className="bg-[#14213d] text-white pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-700/60">
          {/* Brand info */}
          <div className="space-y-4">
            <BrandWordmark variant="dark" />
            <p className="text-sm text-slate-300 leading-relaxed pt-2">
              Panadura&apos;s trusted trading retailer for home appliances, inverter refrigerators,
              baking ovens, high-definition televisions, bicycles, and comfortable bedding.
            </p>
            <div className="flex items-center gap-2 pt-2 text-xs text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Authentic Brands • Direct Inquiries</span>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h3 className="font-serif text-base font-bold text-white tracking-wide mb-4">
              Product Categories
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <Link href="/categories/home-appliances" className="hover:text-white transition-colors">
                  Home Appliances & Inverters
                </Link>
              </li>
              <li>
                <Link href="/categories/electronics" className="hover:text-white transition-colors">
                  Televisions & Electronics
                </Link>
              </li>
              <li>
                <Link href="/categories/bicycles" className="hover:text-white transition-colors">
                  Tomahawk Bicycles
                </Link>
              </li>
              <li>
                <Link href="/categories/bedding" className="hover:text-white transition-colors">
                  Spring & Foam Mattresses
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-white transition-colors flex items-center gap-1 font-medium text-emerald-400">
                  <span>View Full Catalogue</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Business & Navigation */}
          <div>
            <h3 className="font-serif text-base font-bold text-white tracking-wide mb-4">
              Customer Information
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Our Business
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Panadura Showroom Location
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-white transition-colors text-xs text-slate-400">
                  Store Management Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Verified Showroom Contact */}
          <div>
            <h3 className="font-serif text-base font-bold text-white tracking-wide mb-4">
              Showroom Contact
            </h3>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-1" />
                <span>{address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 font-semibold"
                >
                  WhatsApp: {displayWhatsappNumber}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                <a href={`tel:${telephone.replace(/\s+/g, '')}`} className="hover:text-white">
                  {telephone}
                </a>
              </li>
              {landline && (
                <li className="flex items-center gap-2.5 text-xs text-slate-400">
                  <Phone className="w-3.5 h-3.5 opacity-60 shrink-0" />
                  <span>Landline: {landline}</span>
                </li>
              )}
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <a href={`mailto:${email}`} className="hover:text-white break-all text-xs">
                  {email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <p>© 2026 Priyantha Trading Agencies (PVT) LTD. Panadura, Sri Lanka. All Rights Reserved.</p>
          <p className="text-slate-400">
            Official WhatsApp product inquiry portal • Verified Showroom on Galle Road
          </p>
        </div>
      </div>
    </footer>
  );
};
