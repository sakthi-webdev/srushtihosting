'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Script from 'next/script';
import Image from 'next/image';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { FiSearch, FiGlobe, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '@/config/site';

function DomainWidgetContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [domainInput, setDomainInput] = useState('');
  const [activeQuery, setActiveQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Auto-open modal if URL contains ?upm-dac-query=
  useEffect(() => {
    const queryParam = searchParams.get('upm-dac-query');
    if (queryParam) {
      setDomainInput(queryParam);
      setActiveQuery(queryParam);
      setIsModalOpen(true);
    }
  }, [searchParams]);

  // Lock body scroll when full-screen modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  // Dynamically theme Upmind DAC shadow DOM & hide duplicate Upmind search bar
  useEffect(() => {
    if (!isModalOpen) return;

    const applyBrandStyles = () => {
      const el = document.querySelector('upm-dac');
      if (el && el.shadowRoot) {
        if (!el.shadowRoot.querySelector('#upm-brand-styles')) {
          const style = document.createElement('style');
          style.id = 'upm-brand-styles';
          style.textContent = `
            /* Hide duplicate Upmind search form since our single branded search bar is in header */
            .field.has-addons {
              display: none !important;
            }
            .button.is-primary, button.is-primary, .button.is-info {
              background-color: #C81E1E !important;
              border-color: #C81E1E !important;
              color: #ffffff !important;
              font-weight: 800 !important;
              border-radius: 12px !important;
              transition: all 0.2s ease !important;
            }
            .button.is-primary:hover, button.is-primary:hover, .button.is-info:hover {
              background-color: #b01818 !important;
              border-color: #b01818 !important;
            }
            a {
              color: #C81E1E !important;
            }
            .input:focus, select:focus {
              border-color: #C81E1E !important;
              box-shadow: 0 0 0 0.125em rgba(200, 30, 30, 0.25) !important;
            }
            .is-active, .has-text-primary {
              color: #C81E1E !important;
            }
          `;
          el.shadowRoot.appendChild(style);
        }
      }
    };

    const interval = setInterval(applyBrandStyles, 200);
    return () => clearInterval(interval);
  }, [isModalOpen, activeQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!domainInput.trim()) return;

    const query = domainInput.trim().toLowerCase();
    setActiveQuery(query);
    setIsModalOpen(true);

    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('upm-dac-query', query);
    router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.delete('upm-dac-query');
    router.push(pathname, { scroll: false });
  };

  return (
    <>
      <Script
        src="https://widgets.upmind.app/dac/upm-dac.min.js"
        strategy="lazyOnload"
      />

      {/* Main Branded Search Input Form on Page */}
      <form onSubmit={handleSearch} className="w-full">
        <div className="relative flex flex-col sm:flex-row items-center gap-3">
          {/* Domain Input Field */}
          <div className="relative flex-grow w-full">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400">
              <FiGlobe className="h-5 w-5 text-zinc-400" />
            </div>
            <input
              type="text"
              value={domainInput}
              onChange={(e) => setDomainInput(e.target.value)}
              placeholder="Search your ideal domain name (e.g. mybrand.com)..."
              className="w-full pl-12 pr-4 py-4 bg-white border border-zinc-200 rounded-2xl text-[#0F0F0F] placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#C81E1E] focus:border-transparent text-sm sm:text-base transition-all shadow-xs"
              required
            />
          </div>

          {/* Red Search Action Button */}
          <button
            type="submit"
            className="w-full sm:w-auto px-9 py-4 bg-[#C81E1E] hover:bg-[#b01818] text-white font-extrabold rounded-2xl text-sm sm:text-base flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-95"
          >
            <FiSearch className="h-5 w-5" />
            <span>Search</span>
          </button>
        </div>
      </form>

      {/* Full-Screen Modal Overlay for Domain Search Results */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9999] w-full h-[100dvh] bg-white flex flex-col overflow-hidden text-left"
          >
            {/* Top Bar Header */}
            <div className="w-full bg-white border-b border-zinc-200 px-4 sm:px-8 py-4 flex items-center justify-between gap-4 shrink-0 shadow-xs">
              
              {/* Logo / Brand Name */}
              <div className="flex items-center gap-3 shrink-0">
                <Image
                  src="/logo.png"
                  alt="Srushti Hosting"
                  width={180}
                  height={48}
                  style={{ height: '42px', width: 'auto' }}
                  className="object-contain"
                />
              </div>

              {/* Single Branded Search Bar inside Full-Screen Top Header */}
              <form onSubmit={handleSearch} className="flex-grow max-w-2xl">
                <div className="relative flex items-center">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400">
                    <FiGlobe className="h-5 w-5" />
                  </div>
                  <input
                    type="text"
                    value={domainInput}
                    onChange={(e) => setDomainInput(e.target.value)}
                    placeholder="Search domain (e.g. mybrand.com)..."
                    className="w-full pl-11 pr-24 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm font-semibold text-[#0F0F0F] placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#C81E1E] focus:bg-white transition-all"
                    required
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 px-5 py-2 bg-[#C81E1E] hover:bg-[#b01818] text-white font-extrabold rounded-lg text-xs sm:text-sm transition-all cursor-pointer shadow-xs"
                  >
                    Search
                  </button>
                </div>
              </form>

              {/* Close Button */}
              <button
                onClick={closeModal}
                className="p-2.5 rounded-full text-zinc-500 hover:text-[#0F0F0F] hover:bg-zinc-100 transition-colors cursor-pointer shrink-0"
                aria-label="Close full-screen domain search"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>

            {/* Full-Screen Modal Results Area */}
            <div className="flex-grow w-full max-w-6xl mx-auto p-4 sm:p-8 overflow-y-auto bg-zinc-50/40">
              <div className="mb-6 text-left">
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#C81E1E]">
                  Domain Search Results
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#0F0F0F] mt-1">
                  Availability for <span className="text-[#C81E1E]">{activeQuery}</span>
                </h2>
              </div>

              {/* Upmind DAC Widget Embed Container */}
              <div className="w-full bg-white p-6 sm:p-8 rounded-3xl border border-zinc-200 shadow-sm min-h-[450px]">
                <upm-dac
                  key={activeQuery}
                  order-config-url={siteConfig.upmind.orderConfigUrl}
                  currency-code={siteConfig.upmind.currency}
                ></upm-dac>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export const DomainWidget: React.FC = () => {
  return (
    <Suspense fallback={
      <div className="w-full h-16 bg-white border border-zinc-200 rounded-2xl animate-pulse" />
    }>
      <DomainWidgetContent />
    </Suspense>
  );
};


