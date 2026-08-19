'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  FiZap,
  FiShield,
  FiTrendingUp,
  FiHeadphones,
  FiBarChart2,
  FiLock,
} from 'react-icons/fi';
import { sectionFlags } from '@/config/sections';

export const WhyUs: React.FC = () => {
  if (!sectionFlags.whyUs) return null;

  const features = [
    {
      icon: FiZap,
      title: '99.99% Uptime SLA',
      description:
        'High-performance NVMe web hosting infrastructure engineered for maximum reliability and continuous website availability.',
    },
    {
      icon: FiShield,
      title: 'Advanced Security',
      description:
        'Proactive DDoS protection, automated malware scanning, and web application firewall security isolated per account.',
    },
    {
      icon: FiTrendingUp,
      title: 'Seamless Scaling',
      description:
        'Easily upgrade RAM, CPU, and SSD storage resources as your business website traffic expands.',
    },
    {
      icon: FiHeadphones,
      title: '24/7 Expert Support',
      description:
        'Dedicated technical assistance from experienced hosting engineers available around the clock to resolve issues.',
    },
    {
      icon: FiBarChart2,
      title: 'High-Speed Bandwidth',
      description:
        'Generous monthly data transfer for Starter plans, and unmetered high-speed bandwidth for Business & Professional hosting.',
    },
    {
      icon: FiLock,
      title: 'Free SSL Certificate',
      description:
        'Automated Let’s Encrypt HTTPS security certificates included free for every custom domain on our network.',
    },
  ];

  return (
    <section id="why-us" className="relative py-24 bg-white border-t border-[#E5E5E5] scroll-mt-20 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-[#C81E1E]/5 rounded-full blur-[110px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-left max-w-3xl mb-16 space-y-5"
        >
          <div className="inline-block">
            <span className="bg-[#C81E1E] text-white text-xs sm:text-sm font-extrabold px-4 py-1.5 rounded-full shadow-xs tracking-wide">
              Infrastructure Features
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0F0F0F] tracking-tight leading-[1.12]">
            Hosting Tailored to Your Needs
          </h2>
        </motion.div>

        {/* 6 Feature Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="bg-white/95 backdrop-blur-md p-8 rounded-3xl border border-zinc-200/90 shadow-sm hover:shadow-md hover:border-zinc-300 transition-all flex flex-col text-left space-y-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center text-[#C81E1E] shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-extrabold text-[#0F0F0F]">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-sm text-[#52525B] leading-relaxed font-normal">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
