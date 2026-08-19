'use client';

import React, { useState } from 'react';
import { FiSearch, FiGlobe } from 'react-icons/fi';
import { siteConfig } from '@/config/site';

export const DomainWidget: React.FC = () => {
  const [domainName, setDomainName] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!domainName.trim()) return;

    const fullDomain = domainName.trim().toLowerCase();
    const targetUrl = `${siteConfig.upmind.clientAreaUrl}?domain=${encodeURIComponent(fullDomain)}`;
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <form onSubmit={handleSearch} className="w-full">
      <div className="relative flex flex-col sm:flex-row items-center gap-3">
        {/* Domain Input Field */}
        <div className="relative flex-grow w-full">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400">
            <FiGlobe className="h-5 w-5 text-zinc-400" />
          </div>
          <input
            type="text"
            value={domainName}
            onChange={(e) => setDomainName(e.target.value)}
            placeholder="Search your ideal domain name (e.g. mybrand.com)..."
            className="w-full pl-12 pr-4 py-4 bg-white border border-zinc-200 rounded-2xl text-[#0F0F0F] placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#C81E1E] focus:border-transparent text-sm sm:text-base transition-all shadow-xs"
            required
          />
        </div>

        {/* Search Action Button with Single Search Icon */}
        <button
          type="submit"
          className="w-full sm:w-auto px-9 py-4 bg-[#C81E1E] hover:bg-[#b01818] text-white font-extrabold rounded-2xl text-sm sm:text-base flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap shadow-md hover:shadow-lg hover:scale-[1.02]"
        >
          <FiSearch className="h-5 w-5" />
          <span>Search</span>
        </button>
      </div>
    </form>
  );
};
