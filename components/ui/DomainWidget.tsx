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
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Auto-open modal if URL contains ?upm-dac-query=
  useEffect(() => {
    const queryParam = searchParams.get('upm-dac-query');
    if (queryParam) {
      setDomainInput(queryParam);
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  }, [searchParams]);

  // Lock body scrolling when modal is open
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

  // Dynamically theme Upmind DAC shadow DOM elements (brand red buttons, clean inputs)
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
              border-radius: 10px !important;
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
  }, [isModalOpen]);

  // Handle Search Submission (navigate URL so upm-dac.min.js reads query on page load)
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!domainInput.trim()) return;

    const query = domainInput.trim().toLowerCase();
    window.location.href = `${pathname}?upm-dac-query=${encodeURIComponent(query)}`;
  };

  const closeModal = () => {
    setIsModalOpen(false);
    window.location.href = pathname;
  };

  return (
    <>
      <Script
        src="https://widgets.upmind.app/dac/upm-dac.min.js"
        strategy="lazyOnload"
      />

      {/* Homepage / Section Domain Search Input Form */}
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

          {/* Red Search Button */}
          <button
            type="submit"
            className="w-full sm:w-auto px-9 py-4 bg-[#C81E1E] hover:bg-[#b01818] text-white font-extrabold rounded-2xl text-sm sm:text-base flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-95"
          >
            <FiSearch className="h-5 w-5" />
            <span>Search</span>
          </button>
        </div>
      </form>

      {/* Hosting.com Style Domain Search Results Overlay Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9999] h-[100dvh] w-full bg-[#f6f8f7] flex flex-col overflow-y-auto"
          >
            {/* Modal Header Bar */}
            <div className="w-full max-w-5xl mx-auto px-4 sm:px-8 pt-8 pb-4 flex items-center justify-between shrink-0">
              <div className="w-full text-center relative">
                <h1 className="text-2xl sm:text-4xl font-extrabold text-[#0F0F0F] tracking-tight">
                  Domain Name Search
                </h1>
                <button
                  onClick={closeModal}
                  className="absolute right-0 top-1/2 -translate-y-1/2 p-3 rounded-full text-zinc-500 hover:text-[#0F0F0F] hover:bg-zinc-200/80 transition-colors cursor-pointer"
                  aria-label="Close domain search modal"
                >
                  <FiX className="w-7 h-7" />
                </button>
              </div>
            </div>

            {/* Modal Main Content Hosting Upmind DAC Widget */}
            <div className="flex-grow w-full max-w-4xl mx-auto px-4 sm:px-6 py-6 overflow-y-auto">
              <div className="w-full min-h-[450px]">
                <upm-dac
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



