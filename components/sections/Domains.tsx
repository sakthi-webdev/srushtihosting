'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiShield, FiRefreshCw, FiZap } from 'react-icons/fi';
import { sectionFlags } from '@/config/sections';
import { DomainWidget } from '@/components/ui/DomainWidget';

export const Domains: React.FC = () => {
  if (!sectionFlags.domains) return null;

  return (
    <section id="domains" className="relative py-24 bg-gradient-to-b from-white via-amber-50/20 to-white text-[#0F0F0F] border-y border-[#E5E5E5] scroll-mt-20 overflow-hidden">
      {/* Ambient Soft Glow in Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-[#F59E0B]/8 rounded-full blur-[130px]" />
        <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-[#C81E1E]/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 2-Column Hero Style Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          {/* Left Column: Domain Search & Info */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 text-left space-y-6"
          >
            <div className="inline-block">
              <span className="bg-[#F59E0B] text-white text-xs sm:text-sm font-bold px-4 py-1.5 rounded-full shadow-xs tracking-wide">
                Instant Domain Registration
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-[#0F0F0F] tracking-tight leading-[1.12]">
              Find & Register Your Domain Name
            </h2>

            <p className="text-base sm:text-lg text-[#52525B] leading-relaxed font-normal">
              Search available web addresses with zero hidden renewal fees. Includes full DNS control, WHOIS privacy protection, and instant TLD setup.
            </p>

            {/* Glassmorphic Domain Search Box */}
            <div className="pt-2">
              <div className="border border-zinc-200/90 bg-white/95 backdrop-blur-md p-6 sm:p-8 rounded-3xl shadow-lg space-y-4">
                <div className="text-left">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#52525B]">
                    Check Domain Availability
                  </span>
                </div>
                
                <DomainWidget />
                
                {/* Popular TLD Chips */}
                <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-[#52525B]">
                  <span className="font-semibold text-[#0F0F0F]">Popular TLDs:</span>
                  <span className="px-3.5 py-1 rounded-full bg-zinc-100 border border-zinc-200 font-bold text-[#0F0F0F]">
                    .com <span className="text-[#C81E1E]">₹949/yr</span>
                  </span>
                  <span className="px-3.5 py-1 rounded-full bg-zinc-100 border border-zinc-200 font-bold text-[#0F0F0F]">
                    .in <span className="text-[#C81E1E]">₹399/yr</span>
                  </span>
                  <span className="px-3.5 py-1 rounded-full bg-zinc-100 border border-zinc-200 font-bold text-[#0F0F0F]">
                    .co.in <span className="text-[#C81E1E]">₹299/yr</span>
                  </span>
                </div>
              </div>
            </div>

          </motion.div>

          {/* Right Column: Clean Illustration Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 flex items-center justify-center"
          >
            <div className="relative w-full flex justify-center">
              <Image
                src="/hero-banner-image.png"
                alt="Domain Registration Infrastructure"
                width={550}
                height={450}
                className="w-full h-auto object-contain max-h-[420px]"
              />
            </div>
          </motion.div>

        </div>

        {/* 3 Large Feature Cards Matched to Full Section Width */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* Card 1 */}
          <div className="bg-white/95 backdrop-blur-md p-8 sm:p-10 rounded-3xl border border-zinc-200/90 shadow-sm hover:shadow-md transition-all text-left flex items-start gap-6">
            <div className="w-14 h-14 rounded-2xl bg-zinc-100 flex items-center justify-center text-[#C81E1E] shrink-0 border border-zinc-200">
              <FiShield className="w-7 h-7" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-extrabold text-[#0F0F0F]">WHOIS Privacy</h3>
              <p className="text-sm text-[#52525B] leading-relaxed">
                Keep your personal contact details safe from public WHOIS databases and unsolicited spam calls.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white/95 backdrop-blur-md p-8 sm:p-10 rounded-3xl border border-zinc-200/90 shadow-sm hover:shadow-md transition-all text-left flex items-start gap-6">
            <div className="w-14 h-14 rounded-2xl bg-zinc-100 flex items-center justify-center text-[#C81E1E] shrink-0 border border-zinc-200">
              <FiRefreshCw className="w-7 h-7" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-extrabold text-[#0F0F0F]">Seamless Transfer</h3>
              <p className="text-sm text-[#52525B] leading-relaxed">
                Transfer your existing domain names to Srushti Hosting effortlessly with zero downtime or service interruption.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white/95 backdrop-blur-md p-8 sm:p-10 rounded-3xl border border-zinc-200/90 shadow-sm hover:shadow-md transition-all text-left flex items-start gap-6">
            <div className="w-14 h-14 rounded-2xl bg-zinc-100 flex items-center justify-center text-[#C81E1E] shrink-0 border border-zinc-200">
              <FiZap className="w-7 h-7" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-extrabold text-[#0F0F0F]">Instant DNS Setup</h3>
              <p className="text-sm text-[#52525B] leading-relaxed">
                Full administration over A, CNAME, MX, and TXT records with instant global DNS propagation.
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
