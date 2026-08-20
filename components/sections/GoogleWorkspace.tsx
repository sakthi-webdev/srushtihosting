'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiCheck, FiArrowRight } from 'react-icons/fi';
import { Button } from '@/components/ui/Button';
import { sectionFlags } from '@/config/sections';

interface GoogleWorkspaceProps {
  mode?: 'cta' | 'plans';
}

export const GoogleWorkspace: React.FC<GoogleWorkspaceProps> = () => {
  if (!sectionFlags.googleWorkspace) return null;

  return (
    <section id="workspace" className="relative py-24 bg-white scroll-mt-20 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/2 left-10 w-96 h-96 bg-zinc-200/50 rounded-full blur-[110px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 2-Column Hero Style Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Content Column */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 text-left space-y-6"
          >
            <div className="inline-block">
              <span className="bg-[#C81E1E] text-white text-xs sm:text-sm font-extrabold px-4 py-1.5 rounded-full shadow-xs tracking-wide">
                Professional Email & Collaboration
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-[#0F0F0F] tracking-tight leading-[1.12]">
              Google Workspace for Enterprise & Teams
            </h2>

            <p className="text-base sm:text-lg text-[#52525B] leading-relaxed font-normal">
              Empower your business with official domain email (@yourdomain.com), Google Drive storage, and secure video conferencing with zero technical hassle.
            </p>

            {/* Feature Bullets */}
            <ul className="space-y-3 pt-2">
              <li className="flex items-center gap-3 text-sm font-bold text-[#0F0F0F]">
                <div className="w-5 h-5 rounded-full bg-[#C81E1E] text-white flex items-center justify-center shrink-0">
                  <FiCheck className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span>Custom Business Gmail (@yourdomain.com)</span>
              </li>
              <li className="flex items-center gap-3 text-sm font-bold text-[#0F0F0F]">
                <div className="w-5 h-5 rounded-full bg-[#C81E1E] text-white flex items-center justify-center shrink-0">
                  <FiCheck className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span>Secure Google Drive Storage & Docs</span>
              </li>
              <li className="flex items-center gap-3 text-sm font-bold text-[#0F0F0F]">
                <div className="w-5 h-5 rounded-full bg-[#C81E1E] text-white flex items-center justify-center shrink-0">
                  <FiCheck className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span>HD Google Meet Video Meetings & Calendar</span>
              </li>
            </ul>

            {/* CTA Button */}
            <div className="pt-4 flex items-center">
              <Button href="#contact" variant="primary" size="lg" className="gap-2">
                <span>Inquire About Google Workspace</span>
                <FiArrowRight className="w-4 h-4" />
              </Button>
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
                src="/google-workspace.png"
                alt="Google Workspace Enterprise Email"
                width={450}
                height={450}
                style={{ maxWidth: '100%', height: 'auto' }}
                className="object-contain max-h-[400px]"
              />
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
