'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';
import { hostingPlansData } from '@/config/plans';
import { sectionFlags } from '@/config/sections';

export const Hosting: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  if (!sectionFlags.hosting) return null;

  return (
    <section id="hosting" className="relative py-24 bg-gradient-to-b from-white via-red-50/15 to-white scroll-mt-20 overflow-hidden">
      {/* Soft Ambient Background Blur Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-[#C81E1E]/6 rounded-full blur-[130px]" />
        <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-[#F59E0B]/6 rounded-full blur-[130px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-10 space-y-5"
        >
          <div className="inline-block">
            <span className="bg-[#F59E0B] text-white text-xs sm:text-sm font-bold px-4 py-1.5 rounded-full shadow-xs tracking-wide">
              Plan & Pricing
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#0F0F0F] tracking-tight leading-[1.12]">
            The Perfect Hosting Partner for Your Business
          </h2>
          <p className="text-base text-[#52525B] max-w-2xl mx-auto">
            Choose the plan that fits your growth. Switch between monthly and annual billing to save up to 20% on web hosting.
          </p>
        </motion.div>

        {/* Monthly / Yearly Billing Toggle Switch */}
        <div className="flex items-center justify-center mb-14">
          <div className="bg-white p-1.5 rounded-full border border-zinc-200 shadow-sm flex items-center gap-1">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                billingCycle === 'monthly'
                  ? 'bg-[#0F0F0F] text-white shadow-sm'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                billingCycle === 'yearly'
                  ? 'bg-[#C81E1E] text-white shadow-sm'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              <span>Annual Billing</span>
              <span className="bg-amber-400 text-slate-950 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {hostingPlansData.map((plan, idx) => {
            const isYearly = billingCycle === 'yearly';
            const price = isYearly ? plan.yearlyPricePerMonth : plan.monthlyPrice;
            const checkoutUrl = isYearly ? plan.yearlyCheckoutUrl : plan.monthlyCheckoutUrl;
            const isRecommended = plan.recommended;

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 bg-white/95 backdrop-blur-md ${
                  isRecommended
                    ? 'border-2 border-[#C81E1E] shadow-2xl ring-4 ring-[#C81E1E]/10'
                    : 'border border-zinc-200/90 shadow-md hover:shadow-xl hover:border-zinc-300'
                }`}
              >
                <div>
                  
                  {/* Top Header Box */}
                  <div
                    className={`p-6 rounded-2xl mb-6 relative overflow-hidden shadow-sm ${
                      isRecommended
                        ? 'bg-[#C81E1E] text-white'
                        : 'bg-[#0F0F0F] text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                        {plan.name}
                      </h3>
                      {isRecommended && (
                        <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-white/30">
                          Recommended
                        </span>
                      )}
                    </div>

                    <p className="text-xs mb-4 min-h-[32px] leading-relaxed text-white/90 font-normal">
                      {plan.description}
                    </p>

                    {/* Sale Badge Tag */}
                    <div className="mb-3">
                      <span
                        className={`text-[11px] font-extrabold px-3 py-1 rounded-md uppercase tracking-wider inline-block ${
                          isRecommended
                            ? 'bg-white text-[#C81E1E]'
                            : 'bg-white/10 text-amber-300 border border-white/15'
                        }`}
                      >
                        {plan.saleTag}
                      </span>
                    </div>

                    {/* Price Display */}
                    <div className="flex items-baseline gap-1 pt-1">
                      <span className="text-3xl sm:text-4xl font-black text-white">
                        {plan.currency}{price}
                      </span>
                      <span className="text-xs font-semibold text-white/80">
                        /mo
                      </span>
                    </div>

                    {/* Annual billing note */}
                    {isYearly && (
                      <p className="text-[11px] mt-1 font-medium text-white/80">
                        Billed {plan.currency}{plan.yearlyTotal.toLocaleString()} annually
                      </p>
                    )}
                  </div>

                  {/* Feature Checklist */}
                  <ul className="space-y-3.5 mb-8 text-left">
                    {plan.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-center justify-between text-xs sm:text-sm">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                              isRecommended
                                ? 'bg-[#C81E1E] text-white'
                                : 'bg-[#0F0F0F] text-white'
                            }`}
                          >
                            <FiCheck className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                          <span
                            className={`font-semibold ${
                              feature.highlight ? 'text-[#C81E1E] font-bold' : 'text-[#0F0F0F]'
                            }`}
                          >
                            {feature.text}
                          </span>
                        </div>

                        {/* Optional Badges (NEW) */}
                        {feature.isNew && (
                          <span className="bg-[#C81E1E] text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider">
                            NEW
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>

                </div>

                {/* Bottom Action Button */}
                <div className="pt-2">
                  <a
                    href={checkoutUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full block py-3.5 px-6 rounded-full font-extrabold text-sm text-center transition-all shadow-md cursor-pointer hover:shadow-lg hover:scale-[1.02] bg-[#C81E1E] hover:bg-[#b01818] text-white"
                  >
                    Buy this Plan
                  </a>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
