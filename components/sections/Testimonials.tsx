'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';
import { sectionFlags } from '@/config/sections';

export const Testimonials: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  if (!sectionFlags.testimonials) return null;

  const reviewsCol1 = [
    {
      stars: 5,
      quote:
        'Migrated our e-commerce store to Srushti Hosting and our page load time dropped under 1 second. Exceptional speed!',
      name: 'Morris Ferguson',
      role: 'E-commerce Founder',
    },
    {
      stars: 5,
      quote:
        'Domain registration and DNS configuration took less than 2 minutes through their client portal. Incredibly smooth service.',
      name: 'June Dolton',
      role: 'Digital Marketer',
    },
    {
      stars: 5,
      quote:
        'The automated daily backups and 24/7 support gave our agency total peace of mind during traffic spikes.',
      name: 'Nancy Harmon',
      role: 'CTO, Digital Studio',
    },
    {
      stars: 5,
      quote:
        'Pure performance and transparent pricing. Srushti Hosting exceeded our web hosting infrastructure expectations.',
      name: 'David Vance',
      role: 'SaaS Founder',
    },
  ];

  const reviewsCol2 = [
    {
      stars: 5,
      quote:
        'The 99.99% uptime guarantee is 100% real. Our web application has had zero unexpected downtime since switching.',
      name: 'Nancy Harmon',
      role: 'Tech Lead',
    },
    {
      stars: 5,
      quote:
        'Google Workspace setup was seamless. Srushti Hosting’s team assisted us with custom MX record verification in minutes.',
      name: 'Priscilla Ogley',
      role: 'Creative Director',
    },
    {
      stars: 5,
      quote:
        'Affordable, fast, and friendly technical support whenever we need custom server configurations.',
      name: 'Garth Perkins',
      role: 'Business Owner',
    },
    {
      stars: 5,
      quote:
        'The website migration was handled flawlessly with zero downtime for our online store customers.',
      name: 'Elena Rostova',
      role: 'Operations Lead',
    },
  ];

  // Duplicate arrays for seamless infinite looping marquee
  const col1Marquee = [...reviewsCol1, ...reviewsCol1];
  const col2Marquee = [...reviewsCol2, ...reviewsCol2];

  return (
    <section id="testimonials" className="relative py-24 bg-gradient-to-b from-white via-zinc-50/80 to-white border-t border-b border-zinc-200/80 scroll-mt-20 overflow-hidden">
      {/* Ambient Gradient Blurred Glow Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/2 left-10 w-[480px] h-[480px] bg-[#C81E1E]/6 rounded-full blur-[120px]" />
        <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-[#F59E0B]/6 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Title & Description Column (Left on desktop, Top on mobile) */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-1 lg:col-span-5 text-left space-y-6"
          >
            <div className="inline-block">
              <span className="bg-[#C81E1E] text-white text-xs sm:text-sm font-extrabold px-4 py-1.5 rounded-full shadow-xs tracking-wide">
                Reviews
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-[#0F0F0F] tracking-tight leading-[1.12]">
              Our client&apos;s experiences speak volumes
            </h2>

            <p className="text-base text-[#52525B] leading-relaxed font-normal">
              Read how businesses, agencies, and online store owners trust Srushti Hosting to power their websites with fast NVMe hosting infrastructure and 24/7 technical support.
            </p>
          </motion.div>

          {/* Reviews Marquee Column (Right on desktop, Bottom on mobile) */}
          <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              maskImage: 'linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)',
            }}
            className="order-2 lg:order-2 lg:col-span-7 relative h-[520px] overflow-hidden rounded-3xl p-2 group"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 h-full">

              {/* Column 1: Slow Infinite Marquee (Bottom to Top) */}
              <div className="overflow-hidden py-4">
                <motion.div
                  animate={{ y: isHovered ? undefined : ['0%', '-50%'] }}
                  transition={{
                    repeat: Infinity,
                    repeatType: 'loop',
                    duration: 48,
                    ease: 'linear',
                  }}
                  className="space-y-6"
                >
                  {col1Marquee.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-white/95 backdrop-blur-md border border-[#E5E5E5] p-6 rounded-2xl shadow-xs space-y-4 hover:border-zinc-300 hover:shadow-md transition-all cursor-default"
                    >
                      <div className="flex gap-1 text-amber-400">
                        {[...Array(item.stars)].map((_, i) => (
                          <FaStar key={i} className="w-4 h-4 text-amber-400" />
                        ))}
                      </div>
                      <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed font-normal">
                        &quot;{item.quote}&quot;
                      </p>
                      <div>
                        <p className="text-xs font-extrabold text-[#0F0F0F]">{item.name}</p>
                        <span className="text-[11px] text-[#52525B]">{item.role}</span>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Column 2: Slow Infinite Marquee (Top to Bottom) */}
              <div className="overflow-hidden py-4 hidden sm:block">
                <motion.div
                  animate={{ y: isHovered ? undefined : ['-50%', '0%'] }}
                  transition={{
                    repeat: Infinity,
                    repeatType: 'loop',
                    duration: 48,
                    ease: 'linear',
                  }}
                  className="space-y-6"
                >
                  {col2Marquee.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-white/95 backdrop-blur-md border border-[#E5E5E5] p-6 rounded-2xl shadow-xs space-y-4 hover:border-zinc-300 hover:shadow-md transition-all cursor-default"
                    >
                      <div className="flex gap-1 text-amber-400">
                        {[...Array(item.stars)].map((_, i) => (
                          <FaStar key={i} className="w-4 h-4 text-amber-400" />
                        ))}
                      </div>
                      <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed font-normal">
                        &quot;{item.quote}&quot;
                      </p>
                      <div>
                        <p className="text-xs font-extrabold text-[#0F0F0F]">{item.name}</p>
                        <span className="text-[11px] text-[#52525B]">{item.role}</span>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
