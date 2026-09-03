import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiArrowRight } from 'react-icons/fi';
import { siteConfig } from '@/config/site';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0F0F0F] text-[#FFFFFF] pt-16 pb-12 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Minimal Corporate Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-zinc-800 items-start">

          {/* Brand Logo & Intro */}
          <div className="md:col-span-6 space-y-3 text-left">
            <Link href="/" className="inline-block">
              <Image
                src="/logo.png"
                alt="Srushti Hosting"
                width={200}
                height={56}
                style={{ height: '66px', width: 'auto' }}
                className="object-contain brightness-110"
              />
            </Link>
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">
              {siteConfig.entityLine}
            </p>
            <p className="text-sm text-zinc-300 max-w-md leading-relaxed font-normal">
              High-performance Web Hosting, Domain Registration, and Cloud Infrastructure engineered for reliability, security, and enterprise scalability by Srushti Solutions.
            </p>
          </div>

          {/* Legal Policies */}
          <div className="md:col-span-3 space-y-3 text-left">
            <p className="text-sm font-bold uppercase tracking-wider text-white">Legal & Compliance</p>
            <ul className="space-y-3 text-sm text-zinc-300 font-medium">
              <li>
                <Link href={siteConfig.links.terms} className="hover:text-amber-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href={siteConfig.links.privacy} className="hover:text-amber-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href={siteConfig.links.refund} className="hover:text-amber-400 transition-colors">
                  Refund & Cancellation Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Client Portal & Support */}
          <div className="md:col-span-3 space-y-3 text-left">
            <p className="text-sm font-bold uppercase tracking-wider text-white">Client Portal & Help</p>
            <ul className="space-y-3 text-sm text-zinc-300 font-medium">
              <li>
                <a
                  href={siteConfig.upmind.clientAreaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:text-white font-bold transition-colors inline-flex items-center gap-1.5 text-sm sm:text-base"
                >
                  <span>Client Area Login</span>
                  <FiArrowRight className="w-4 h-4" />
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-amber-400 transition-colors">
                  {siteConfig.contact.email}
                </a>
              </li>
              <li>
                <a href={siteConfig.contact.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">
                  WhatsApp Support
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Payment Icons */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-zinc-300">
          <p className="text-zinc-300 font-medium">
            © {new Date().getFullYear()} {siteConfig.name} • {siteConfig.entityLine}. All rights reserved.
          </p>

          {/* Payment Method SVG Icons Clean Bar */}
          <div className="flex items-center gap-4 flex-wrap">
            <Image src="/icons/visa.svg" alt="Visa" width={36} height={22} style={{ height: '24px', width: 'auto' }} className="object-contain" />
            <Image src="/icons/master-card.svg" alt="Mastercard" width={36} height={22} style={{ height: '24px', width: 'auto' }} className="object-contain" />
            <Image src="/icons/american-express.svg" alt="American Express" width={36} height={22} style={{ height: '24px', width: 'auto' }} className="object-contain" />
            <Image src="/icons/rupay.svg" alt="RuPay" width={36} height={22} style={{ height: '24px', width: 'auto' }} className="object-contain" />
            <Image src="/icons/discover.svg" alt="Discover" width={36} height={22} style={{ height: '24px', width: 'auto' }} className="object-contain" />
            <Image src="/icons/upi.svg" alt="UPI" width={36} height={22} style={{ height: '24px', width: 'auto' }} className="object-contain" />
          </div>
        </div>

      </div>
    </footer>
  );
};
