'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiHeadphones, FiUsers, FiPieChart } from 'react-icons/fi';
import { sectionFlags } from '@/config/sections';

export const Hero: React.FC = () => {
  const [imageError, setImageError] = useState(false);
  if (!sectionFlags.hero) return null;

  return (
    <section className="relative bg-gradient-to-b from-white via-zinc-50/60 to-white pt-12 pb-20 overflow-hidden">
      {/* Ambient background glow orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-10 right-10 w-[500px] h-[500px] bg-[#C81E1E]/6 rounded-full blur-[130px]" />
        <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-[#F59E0B]/6 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 2-Column Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          {/* Left Content Column */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-7 text-left space-y-6"
          >
            
            {/* Amber Eyebrow Badge */}
            <div className="inline-block">
              <span className="bg-[#C81E1E] text-white text-xs sm:text-sm font-extrabold px-4 py-1.5 rounded-full shadow-xs tracking-wide">
                The Hosting Experts
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0F0F0F] tracking-tight leading-[1.12]">
              Quick and Reliable Web Hosting for your Business Websites
            </h1>

            {/* Subhead Description */}
            <p className="text-base sm:text-lg text-[#52525B] leading-relaxed max-w-2xl font-normal">
              High-performance hosting solutions tailored for websites of all sizes—ranging from NVMe shared web hosting to dedicated enterprise server infrastructure.
            </p>

            {/* Primary Action Button */}
            <div className="pt-2">
              <a
                href="#hosting"
                className="inline-flex items-center justify-center bg-[#0F0F0F] hover:bg-[#27272a] text-white font-bold text-base px-9 py-4 rounded-full shadow-md transition-all cursor-pointer hover:shadow-lg hover:scale-[1.02]"
              >
                Get Started
              </a>
            </div>

          </motion.div>

          {/* Right Column: Hero Banner Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            className="lg:col-span-5 flex items-center justify-center"
          >
            {!imageError ? (
              <div className="relative w-full flex justify-center">
                <Image
                  src="/hosting-infrastructure.png"
                  alt="Srushti Hosting Infrastructure Illustration"
                  width={700}
                  height={600}
                  priority
                  loading="eager"
                  fetchPriority="high"
                  style={{ maxWidth: '100%', height: 'auto' }}
                  className="object-contain max-h-[480px] sm:max-h-[560px] lg:max-h-[600px] w-full"
                  onError={() => setImageError(true)}
                />
              </div>
            ) : (
              <div className="w-full min-h-[360px] sm:min-h-[420px] rounded-3xl border-2 border-dashed border-zinc-200 flex flex-col items-center justify-center p-8 bg-zinc-50 text-center">
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                  Hero Banner Illustration
                </span>
                <p className="text-xs text-zinc-400 mt-2 max-w-xs">
                  Place your illustration at public/hosting-infrastructure.png
                </p>
              </div>
            )}
          </motion.div>

        </div>

        {/* Bottom 3 Feature Highlights (Brand Colors: Red, Dark, Amber) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-zinc-100/80"
        >
          
          {/* Card 1: Red Icon */}
          <div className="flex items-center gap-5 p-4 rounded-2xl bg-white/60 backdrop-blur-md border border-zinc-200/60 hover:bg-white transition-all shadow-xs">
            <div className="w-14 h-14 rounded-full bg-[#C81E1E] flex items-center justify-center text-white shrink-0 shadow-sm">
              <FiHeadphones className="w-7 h-7" />
            </div>
            <div className="text-left">
              <p className="text-lg font-bold text-[#0F0F0F]">24/7 Availability</p>
              <p className="text-xs text-[#52525B] font-medium">Around-the-clock technical assistance</p>
            </div>
          </div>

          {/* Card 2: Dark Icon */}
          <div className="flex items-center gap-5 p-4 rounded-2xl bg-white/60 backdrop-blur-md border border-zinc-200/60 hover:bg-white transition-all shadow-xs">
            <div className="w-14 h-14 rounded-full bg-[#0F0F0F] flex items-center justify-center text-white shrink-0 shadow-sm">
              <FiUsers className="w-7 h-7" />
            </div>
            <div className="text-left">
              <p className="text-lg font-bold text-[#0F0F0F]">Friendly & Efficient</p>
              <p className="text-xs text-[#52525B] font-medium">Always happy to assist your business</p>
            </div>
          </div>

          {/* Card 3: Yellow/Amber Icon */}
          <div className="flex items-center gap-5 p-4 rounded-2xl bg-white/60 backdrop-blur-md border border-zinc-200/60 hover:bg-white transition-all shadow-xs">
            <div className="w-14 h-14 rounded-full bg-[#F59E0B] flex items-center justify-center text-white shrink-0 shadow-sm">
              <FiPieChart className="w-7 h-7" />
            </div>
            <div className="text-left">
              <p className="text-lg font-bold text-[#0F0F0F]">99.9% Uptime SLA</p>
              <p className="text-xs text-[#52525B] font-medium">Top-rated hosting performance</p>
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
};
