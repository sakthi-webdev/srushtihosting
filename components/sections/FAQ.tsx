'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { sectionFlags } from '@/config/sections';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!sectionFlags.faq) return null;

  const leftFaqs = [
    {
      id: 0,
      q: 'What type of web hosting plan do I need?',
      a: 'For personal blogs or small business sites, our Starter plan provides 5 GB NVMe SSD storage and 50 GB monthly bandwidth. For multiple websites or high-traffic stores, our Business or Professional plans offer unmetered bandwidth and boosted RAM/CPU resources.',
    },
    {
      id: 1,
      q: 'What is Shared NVMe web hosting?',
      a: 'Shared NVMe hosting provisions your website files on enterprise NVMe solid-state drives, offering up to 5x faster read/write data speeds compared to traditional SSD hosting.',
    },
    {
      id: 2,
      q: 'Do you offer domains and Google Workspace?',
      a: 'Yes, you can register custom domains (.com, .in, etc.) and provision official Google Workspace business email accounts (@yourdomain.com) directly through Srushti Hosting with automatic DNS setup.',
    },
    {
      id: 3,
      q: 'How does Google Workspace email work?',
      a: 'When you purchase Google Workspace through Srushti Hosting, we automatically configure your domain MX and SPF records so your team gets professional @yourdomain.com email with Gmail, Drive, and Meet.',
    },
  ];

  const rightFaqs = [
    {
      id: 4,
      q: 'How do I migrate my site to Srushti Hosting?',
      a: 'Our technical team offers free website migration for Business and Professional plans. Simply submit a ticket in your Client Portal after sign-up, and we will transfer your site with zero downtime.',
    },
    {
      id: 5,
      q: 'Why should I choose Srushti Hosting?',
      a: 'We prioritize pure performance, 99.99% uptime SLAs, and transparent pricing without hidden renewal price spikes, backed by 24/7 expert technical support.',
    },
    {
      id: 6,
      q: 'How do I manage my hosting account?',
      a: 'All invoicing, domain DNS settings, and server options are accessible 24/7 through your single sign-on client portal.',
    },
    {
      id: 7,
      q: 'Can I register multiple domain extensions?',
      a: 'Yes! You can search, register, and manage any number of domain extensions (.com, .in, .co.in, .org, .net, etc.) with instant DNS management and WHOIS privacy protection.',
    },
  ];

  const toggleAccordion = (id: number) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  const renderCard = (faq: { id: number; q: string; a: string }) => {
    const isOpen = openIndex === faq.id;
    return (
      <div
        key={faq.id}
        className="bg-white rounded-2xl border border-[#E5E5E5] p-5 shadow-xs transition-all hover:border-zinc-300"
      >
        <button
          onClick={() => toggleAccordion(faq.id)}
          className="w-full text-left font-bold text-sm sm:text-base text-[#0F0F0F] flex items-center justify-between gap-4 cursor-pointer"
        >
          <span>{faq.q}</span>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
              isOpen
                ? 'bg-[#FFF1F0] text-[#C81E1E]'
                : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
            }`}
          >
            {isOpen ? <FiMinus className="w-4 h-4" /> : <FiPlus className="w-4 h-4" />}
          </div>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mt-3 pt-3 border-t border-[#F0F0F0] text-xs sm:text-sm text-[#52525B] leading-relaxed font-normal">
                {faq.a}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <section id="faq" className="py-24 bg-white border-t border-[#E5E5E5] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-5"
        >
          <div className="inline-block">
            <span className="bg-[#F59E0B] text-white text-xs sm:text-sm font-bold px-4 py-1.5 rounded-full shadow-xs tracking-wide">
              Got Questions?
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0F0F0F] tracking-tight leading-[1.12]">
            Frequently Asked Questions
          </h2>
        </motion.div>

        {/* 2-Column Accordion Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 max-w-6xl mx-auto items-start">
          <div className="space-y-4">{leftFaqs.map(renderCard)}</div>
          <div className="space-y-4">{rightFaqs.map(renderCard)}</div>
        </div>

      </div>
    </section>
  );
};
