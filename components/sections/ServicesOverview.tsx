'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { sectionFlags } from '@/config/sections';

export const ServicesOverview: React.FC = () => {
  if (!sectionFlags.servicesOverview) return null;

  return (
    <section className="relative py-24 bg-gradient-to-b from-white via-zinc-50/50 to-white border-y border-[#E5E5E5] overflow-hidden">
      {/* Ambient Gradient Blurred Glow Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-10 -left-20 w-[450px] h-[450px] bg-[#C81E1E]/8 rounded-full blur-[120px]" />
        <div className="absolute -bottom-10 -right-20 w-[450px] h-[450px] bg-[#F59E0B]/8 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-5"
        >
          <div className="inline-block">
            <span className="bg-[#C81E1E] text-white text-xs sm:text-sm font-extrabold px-4 py-1.5 rounded-full shadow-xs tracking-wide">
              Hosting Services
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#0F0F0F] tracking-tight leading-[1.12]">
            Comprehensive Hosting Solutions for Your Business
          </h2>
        </motion.div>

        {/* Multi-Row Layout Grid (Pure White Glassmorphic Cards) */}
        <div className="space-y-8">
          
          {/* Row 1: 2 Equal Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Card 1: Web Hosting */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative bg-white/95 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-zinc-200/90 shadow-md hover:shadow-xl transition-all flex flex-col justify-between overflow-hidden group"
            >
              {/* Illustration Image */}
              <div className="relative z-10 w-36 h-36 sm:w-44 sm:h-44 mb-6 flex items-center justify-center">
                <Image
                  src="/web-hosting.png"
                  alt="Web Hosting"
                  width={176}
                  height={176}
                  style={{ width: '100%', height: '100%' }}
                  className="object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Card Content */}
              <div className="relative z-10 text-left">
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#0F0F0F] mb-3">
                  Web Hosting
                </h3>
                <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed font-normal">
                  High-speed web hosting with 99.9% uptime SLA, generous bandwidth allocations, automated daily backups, and cPanel access for your business websites.
                </p>
              </div>
            </motion.div>

            {/* Card 2: Google Workspace */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative bg-white/95 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-zinc-200/90 shadow-md hover:shadow-xl transition-all flex flex-col justify-between overflow-hidden group"
            >
              {/* Illustration Image */}
              <div className="relative z-10 w-36 h-36 sm:w-44 sm:h-44 mb-6 flex items-center justify-center">
                <Image
                  src="/google-workspace.png"
                  alt="Google Workspace"
                  width={176}
                  height={176}
                  style={{ width: '100%', height: '100%' }}
                  className="object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Card Content */}
              <div className="relative z-10 text-left">
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#0F0F0F] mb-3">
                  Google Workspace
                </h3>
                <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed font-normal">
                  Professional business email (@yourdomain.com), Google Drive storage, Docs, Sheets, and secure HD video meetings for team productivity.
                </p>
              </div>
            </motion.div>

          </div>

          {/* Row 2: 1 Full-Width Column (Wide Banner Card) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative bg-white/95 backdrop-blur-md rounded-3xl p-8 sm:p-12 border border-zinc-200/90 shadow-md hover:shadow-xl transition-all overflow-hidden group"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
              {/* Illustration Image Left */}
              <div className="md:col-span-5 flex items-center justify-center">
                <div className="w-48 h-48 sm:w-56 sm:h-56 relative flex items-center justify-center">
                  <Image
                    src="/domain-names.png"
                    alt="Domain Name Registration"
                    width={224}
                    height={224}
                    style={{ width: '100%', height: '100%' }}
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>

              {/* Text Content Right */}
              <div className="md:col-span-7 text-left space-y-4">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F0F0F]">
                  Domain Name Registration & Instant DNS
                </h3>
                <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed font-normal">
                  Search, register, and manage your custom domain names with instant setup across top TLDs including .com, .in, .co.in, .org, and .net.
                </p>
                <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed font-normal">
                  Every domain includes WHOIS privacy protection, full DNS management, auto-renewal safeguards, and 24/7 technical support to keep your brand secure.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Row 3: 2 Equal Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Card 4: SSL Security & Addons */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative bg-white/95 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-zinc-200/90 shadow-md hover:shadow-xl transition-all flex flex-col justify-between overflow-hidden group"
            >
              {/* Illustration Image */}
              <div className="relative z-10 w-36 h-36 sm:w-44 sm:h-44 mb-6 flex items-center justify-center">
                <Image
                  src="/ssl-addon.png"
                  alt="SSL Security & Wildcard Add-ons"
                  width={176}
                  height={176}
                  style={{ width: '100%', height: '100%' }}
                  className="object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Card Content */}
              <div className="relative z-10 text-left">
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#0F0F0F] mb-3">
                  SSL Security & Wildcard Add-ons
                </h3>
                <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed font-normal">
                  Automated HTTPS encryption certificates, dedicated IPv4 addresses, and web application firewall security to protect your site against malicious threats.
                </p>
              </div>
            </motion.div>

            {/* Card 5: Free Website Migration */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="relative bg-white/95 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-zinc-200/90 shadow-md hover:shadow-xl transition-all flex flex-col justify-between overflow-hidden group"
            >
              {/* Illustration Image */}
              <div className="relative z-10 w-36 h-36 sm:w-44 sm:h-44 mb-6 flex items-center justify-center">
                <Image
                  src="/website-migration.png"
                  alt="Free Website Migration"
                  width={176}
                  height={176}
                  style={{ width: '100%', height: '100%' }}
                  className="object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Card Content */}
              <div className="relative z-10 text-left">
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#0F0F0F] mb-3">
                  Free Website Migration
                </h3>
                <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed font-normal">
                  Effortlessly transfer existing websites, databases, and business mailboxes from any host to Srushti Hosting with zero downtime handled by technical experts.
                </p>
              </div>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
};
