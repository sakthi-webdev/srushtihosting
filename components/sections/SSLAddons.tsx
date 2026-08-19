import React from 'react';
import { FiShield, FiLock, FiCpu, FiServer } from 'react-icons/fi';
import { sectionFlags } from '@/config/sections';

export const SSLAddons: React.FC = () => {
  if (!sectionFlags.sslAddons) return null;

  return (
    <section id="ssl-addons" className="py-24 bg-white border-t border-[#E5E5E5] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-zinc-100 border border-zinc-200 text-[#52525B] text-xs font-semibold uppercase tracking-wider mb-4">
            <FiLock className="w-3.5 h-3.5 text-zinc-700" />
            <span>SSL & Infrastructure Add-ons</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0F0F0F] tracking-tight mb-4">
            Enhanced Security & Power
          </h2>
          <p className="text-base sm:text-lg text-[#52525B]">
            Premium Wildcard SSL certificates, dedicated IPs, and automated malware scanning packages.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl border border-[#E5E5E5] bg-white">
            <FiShield className="w-8 h-8 text-[#C81E1E] mb-4" />
            <h3 className="text-lg font-bold text-[#0F0F0F] mb-2">Wildcard SSL Certificate</h3>
            <p className="text-xs text-[#52525B] mb-4">Secure unlimited subdomains under a single organization certificate.</p>
          </div>
          <div className="p-8 rounded-2xl border border-[#E5E5E5] bg-white">
            <FiCpu className="w-8 h-8 text-[#C81E1E] mb-4" />
            <h3 className="text-lg font-bold text-[#0F0F0F] mb-2">Dedicated IPv4 Address</h3>
            <p className="text-xs text-[#52525B] mb-4">Isolated IP address for optimal email deliverability and custom SSL setups.</p>
          </div>
          <div className="p-8 rounded-2xl border border-[#E5E5E5] bg-white">
            <FiServer className="w-8 h-8 text-[#C81E1E] mb-4" />
            <h3 className="text-lg font-bold text-[#0F0F0F] mb-2">Automated Site Vault</h3>
            <p className="text-xs text-[#52525B] mb-4">Continuous automated backups with 1-click snapshot restore points.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
