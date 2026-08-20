'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Script from 'next/script';
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

  // Dynamically theme Upmind DAC shadow DOM to match Srushti Hosting brand colors (#C81E1E)
  useEffect(() => {
    if (!isModalOpen) return;

    const applyBrandStyles = () => {
      const el = document.querySelector('upm-dac');
      if (el && el.shadowRoot) {
        if (!el.shadowRoot.querySelector('#upm-brand-styles')) {
          const style = document.createElement('style');
          style.id = 'upm-brand-styles';
          style.textContent = `
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

    const interval = setInterval(applyBrandStyles, 250);
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

      {/* Main Branded Search Input Form */}
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

      {/* Modal Dialog for Domain Search Results (Hosting.com style) */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-zinc-200 z-10 overflow-hidden my-auto max-h-[90vh] flex flex-col"
            >
              {/* Modal Header */}
              <div className="px-6 py-5 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/90 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#C81E1E]/10 text-[#C81E1E] flex items-center justify-center font-bold">
                    <FiGlobe className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-[#0F0F0F] text-left">
                      Domain Availability Results
                    </h3>
                    <p className="text-xs text-[#52525B] text-left font-medium">
                      Checking availability for <span className="font-bold text-[#0F0F0F]">{activeQuery}</span>
                    </p>
                  </div>
                </div>

                <button
                  onClick={closeModal}
                  className="p-2 rounded-full text-zinc-400 hover:text-[#0F0F0F] hover:bg-zinc-200/80 transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Search Bar for quick re-search */}
              <div className="p-4 sm:p-6 bg-white border-b border-zinc-100 shrink-0">
                <form onSubmit={handleSearch} className="flex gap-3">
                  <input
                    type="text"
                    value={domainInput}
                    onChange={(e) => setDomainInput(e.target.value)}
                    placeholder="Search another domain..."
                    className="flex-grow px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm font-medium text-[#0F0F0F] focus:outline-none focus:ring-2 focus:ring-[#C81E1E]"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#C81E1E] hover:bg-[#b01818] text-white font-bold rounded-xl text-sm transition-all cursor-pointer"
                  >
                    Search
                  </button>
                </form>
              </div>

              {/* Upmind DAC Widget Embed inside Modal */}
              <div className="p-6 overflow-y-auto flex-grow bg-white min-h-[320px]">
                <upm-dac
                  key={activeQuery}
                  order-config-url={siteConfig.upmind.orderConfigUrl}
                  currency-code={siteConfig.upmind.currency}
                ></upm-dac>
              </div>
            </motion.div>
          </div>
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


